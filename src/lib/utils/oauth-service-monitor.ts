/**
 * TestX OAuth Service Status Monitor
 * Monitors OAuth provider availability and implements fallback detection
 */

import axios, { AxiosError } from 'axios';
import { OAuthServiceStatus, OAuthProvider } from './oauth-types';
import { OAuthConfigManager } from './oauth-config';

export class OAuthServiceMonitor {
  private static instance: OAuthServiceMonitor;
  private statusCache: Map<string, OAuthServiceStatus> = new Map();
  private configManager: OAuthConfigManager;

  private constructor() {
    this.configManager = OAuthConfigManager.getInstance();
  }

  public static getInstance(): OAuthServiceMonitor {
    if (!OAuthServiceMonitor.instance) {
      OAuthServiceMonitor.instance = new OAuthServiceMonitor();
    }
    return OAuthServiceMonitor.instance;
  }

  /**
   * Check if an OAuth provider is available
   */
  public async checkProviderStatus(provider: 'google' | 'facebook'): Promise<OAuthServiceStatus> {
    const cacheKey = `${provider}_status`;
    const cached = this.statusCache.get(cacheKey);
    
    // Return cached status if less than 5 minutes old
    if (cached && (Date.now() - cached.lastChecked.getTime()) < 300000) {
      return cached;
    }

    const providerConfig = this.configManager.getProvider(provider);
    const status = await this.performHealthCheck(providerConfig);
    
    this.statusCache.set(cacheKey, status);
    return status;
  }

  /**
   * Check all configured OAuth providers
   */
  public async checkAllProviders(): Promise<Record<string, OAuthServiceStatus>> {
    const results: Record<string, OAuthServiceStatus> = {};
    const availableProviders = this.configManager.getAvailableProviders();

    for (const provider of availableProviders) {
      try {
        results[provider] = await this.checkProviderStatus(provider);
      } catch (error) {
        results[provider] = {
          provider,
          available: false,
          lastChecked: new Date(),
          error: error instanceof Error ? error.message : 'Unknown error',
          rateLimited: false,
        };
      }
    }

    return results;
  }

  /**
   * Determine if fallback authentication should be used
   */
  public async shouldUseFallback(): Promise<{
    useFallback: boolean;
    reason: string;
    availableProviders: string[];
  }> {
    if (!this.configManager.isFallbackEnabled()) {
      return {
        useFallback: false,
        reason: 'Fallback authentication is disabled',
        availableProviders: [],
      };
    }

    const providerStatuses = await this.checkAllProviders();
    const availableProviders = Object.entries(providerStatuses)
      .filter(([, status]) => status.available)
      .map(([provider]) => provider);

    if (availableProviders.length === 0) {
      return {
        useFallback: true,
        reason: 'No OAuth providers are available',
        availableProviders: [],
      };
    }

    // Check if any providers are rate limited
    const rateLimitedProviders = Object.entries(providerStatuses)
      .filter(([, status]) => status.rateLimited)
      .map(([provider]) => provider);

    if (rateLimitedProviders.length > 0) {
      return {
        useFallback: true,
        reason: `OAuth providers are rate limited: ${rateLimitedProviders.join(', ')}`,
        availableProviders,
      };
    }

    return {
      useFallback: false,
      reason: 'OAuth providers are available',
      availableProviders,
    };
  }

  /**
   * Get the best available authentication method
   */
  public async getBestAuthMethod(): Promise<{
    method: 'oauth' | 'fallback' | 'mock';
    provider?: 'google' | 'facebook';
    reason: string;
  }> {
    if (this.configManager.isMockMode()) {
      return {
        method: 'mock',
        reason: 'Mock mode is enabled',
      };
    }

    const fallbackCheck = await this.shouldUseFallback();
    
    if (fallbackCheck.useFallback) {
      return {
        method: 'fallback',
        reason: fallbackCheck.reason,
      };
    }

    // Prefer Google OAuth if available, then Facebook
    const providerStatuses = await this.checkAllProviders();
    
    if (providerStatuses['google']?.available) {
      return {
        method: 'oauth',
        provider: 'google',
        reason: 'Google OAuth is available',
      };
    }

    if (providerStatuses['facebook']?.available) {
      return {
        method: 'oauth',
        provider: 'facebook',
        reason: 'Facebook OAuth is available',
      };
    }

    return {
      method: 'fallback',
      reason: 'No OAuth providers available, using fallback',
    };
  }

  /**
   * Perform health check on OAuth provider
   */
  private async performHealthCheck(provider: OAuthProvider): Promise<OAuthServiceStatus> {
    const startTime = Date.now();
    
    try {
      // For OAuth providers, we check if the auth endpoint is reachable
      // We don't make actual OAuth requests to avoid consuming rate limits
      await axios.head(provider.authUrl, {
        timeout: 10000,
        validateStatus: (status) => status < 500, // Accept redirects and client errors
      });

      const responseTime = Date.now() - startTime;
      
      return {
        provider: provider.name,
        available: true,
        lastChecked: new Date(),
        responseTime,
        rateLimited: false,
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      const axiosError = error as AxiosError;
      
      // Check for rate limiting
      const isRateLimited = axiosError.response?.status === 429 ||
                           axiosError.response?.status === 503 ||
                           !!(axiosError.response?.headers && 
                            ('retry-after' in axiosError.response.headers));

      let nextRetryAt: Date | undefined;
      if (isRateLimited && axiosError.response?.headers['retry-after']) {
        const retryAfter = parseInt(axiosError.response.headers['retry-after'] as string);
        nextRetryAt = new Date(Date.now() + (retryAfter * 1000));
      }

      const result: OAuthServiceStatus = {
        provider: provider.name,
        available: false,
        lastChecked: new Date(),
        responseTime,
        error: axiosError.message,
        rateLimited: isRateLimited,
      };

      if (nextRetryAt) {
        result.nextRetryAt = nextRetryAt;
      }

      return result;
    }
  }

  /**
   * Clear status cache
   */
  public clearCache(): void {
    this.statusCache.clear();
  }

  /**
   * Get cached status without performing new checks
   */
  public getCachedStatus(provider: 'google' | 'facebook'): OAuthServiceStatus | undefined {
    return this.statusCache.get(`${provider}_status`);
  }

  /**
   * Force refresh of provider status
   */
  public async refreshProviderStatus(provider: 'google' | 'facebook'): Promise<OAuthServiceStatus> {
    this.statusCache.delete(`${provider}_status`);
    return this.checkProviderStatus(provider);
  }
} 