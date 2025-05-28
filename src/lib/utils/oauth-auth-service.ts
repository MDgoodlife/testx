/**
 * TestX OAuth Authentication Service
 * Handles OAuth authentication flows with comprehensive fallback strategies
 */

import { Page } from '@playwright/test';
import { 
  AuthenticationResult, 
  AuthenticationOptions, 
  AuthenticationError,
  MockOAuthResponse 
} from './oauth-types';
import { OAuthConfigManager } from './oauth-config';
import { OAuthServiceMonitor } from './oauth-service-monitor';

export class OAuthAuthenticationService {
  private static instance: OAuthAuthenticationService;
  private configManager: OAuthConfigManager;
  private serviceMonitor: OAuthServiceMonitor;

  private constructor() {
    this.configManager = OAuthConfigManager.getInstance();
    this.serviceMonitor = OAuthServiceMonitor.getInstance();
  }

  public static getInstance(): OAuthAuthenticationService {
    if (!OAuthAuthenticationService.instance) {
      OAuthAuthenticationService.instance = new OAuthAuthenticationService();
    }
    return OAuthAuthenticationService.instance;
  }

  /**
   * Authenticate using the best available method
   */
  public async authenticate(
    page: Page, 
    options: Partial<AuthenticationOptions> = {}
  ): Promise<AuthenticationResult> {
    const startTime = Date.now();
    const authOptions: AuthenticationOptions = {
      strategy: 'oauth-first',
      timeout: this.configManager.getTimeout(),
      retryAttempts: this.configManager.getRetryAttempts(),
      fallbackEnabled: this.configManager.isFallbackEnabled(),
      mockMode: this.configManager.isMockMode(),
      headless: true,
      traceEnabled: false,
      ...options,
    };

    let retryCount = 0;
    let lastError: AuthenticationError | undefined;

    while (retryCount <= authOptions.retryAttempts) {
      try {
        const bestMethod = await this.serviceMonitor.getBestAuthMethod();
        
        switch (bestMethod.method) {
          case 'mock':
            return this.createMockAuthResult(startTime);
          
          case 'oauth':
            if (bestMethod.provider) {
              const result = await this.authenticateWithOAuth(
                page, 
                bestMethod.provider, 
                authOptions
              );
              if (result.success) {
                return result;
              }
              lastError = result.error;
            }
            break;
          
          case 'fallback':
            return await this.authenticateWithFallback(page, authOptions, startTime);
        }

        retryCount++;
        if (retryCount <= authOptions.retryAttempts) {
          await this.delay(1000 * retryCount); // Exponential backoff
        }
      } catch (error) {
        lastError = this.createAuthError(
          'AUTHENTICATION_FAILED',
          error instanceof Error ? error.message : 'Unknown error',
          'unknown'
        );
        retryCount++;
      }
    }

    // All attempts failed, return failure result
    return {
      success: false,
      provider: 'email',
      error: lastError || this.createAuthError(
        'MAX_RETRIES_EXCEEDED',
        'All authentication attempts failed',
        'unknown'
      ),
      fallbackUsed: true,
      retryCount,
      duration: Date.now() - startTime,
    };
  }

  /**
   * Authenticate with OAuth provider
   */
  private async authenticateWithOAuth(
    page: Page,
    provider: 'google' | 'facebook',
    options: AuthenticationOptions
  ): Promise<AuthenticationResult> {
    const startTime = Date.now();
    
    try {
      const credentials = this.configManager.getTestCredentials(provider);
      
      if (!credentials.email || !credentials.password) {
        throw new Error(`Missing credentials for ${provider} OAuth`);
      }

      // Navigate to anyKrowd login page
      await page.goto('/login', { timeout: options.timeout });
      
      // Click on OAuth provider button
      const oauthButton = page.locator(`[data-testid="${provider}-oauth-button"]`);
      await oauthButton.click();

      // Handle OAuth flow based on provider
      if (provider === 'google') {
        return await this.handleGoogleOAuth(page, credentials, options, startTime);
      } else {
        return await this.handleFacebookOAuth(page, credentials, options, startTime);
      }
    } catch (error) {
      return {
        success: false,
        provider,
        error: this.createAuthError(
          'OAUTH_FAILED',
          error instanceof Error ? error.message : 'OAuth authentication failed',
          provider
        ),
        fallbackUsed: false,
        retryCount: 0,
        duration: Date.now() - startTime,
      };
    }
  }

  /**
   * Handle Google OAuth flow
   */
  private async handleGoogleOAuth(
    page: Page,
    credentials: { email: string; password: string },
    options: AuthenticationOptions,
    startTime: number
  ): Promise<AuthenticationResult> {
    try {
      // Wait for Google login page
      await page.waitForURL('**/accounts.google.com/**', { timeout: options.timeout });
      
      // Fill email
      await page.fill('input[type="email"]', credentials.email);
      await page.click('#identifierNext');
      
      // Fill password
      await page.waitForSelector('input[type="password"]', { timeout: options.timeout });
      await page.fill('input[type="password"]', credentials.password);
      await page.click('#passwordNext');
      
      // Wait for redirect back to anyKrowd
      await page.waitForURL('**/anykrowd.dev/**', { timeout: options.timeout });
      
      // Verify successful authentication
      const isAuthenticated = await this.verifyAuthentication(page);
      
      if (isAuthenticated) {
        return {
          success: true,
          provider: 'google',
          email: credentials.email,
          fallbackUsed: false,
          retryCount: 0,
          duration: Date.now() - startTime,
        };
      } else {
        throw new Error('Authentication verification failed');
      }
    } catch (error) {
      throw new Error(`Google OAuth failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Handle Facebook OAuth flow
   */
  private async handleFacebookOAuth(
    page: Page,
    credentials: { email: string; password: string },
    options: AuthenticationOptions,
    startTime: number
  ): Promise<AuthenticationResult> {
    try {
      // Wait for Facebook login page
      await page.waitForURL('**/facebook.com/**', { timeout: options.timeout });
      
      // Fill email
      await page.fill('#email', credentials.email);
      await page.fill('#pass', credentials.password);
      await page.click('#loginbutton');
      
      // Handle potential permission dialog
      try {
        await page.waitForSelector('[data-testid="permissions_dialog"]', { timeout: 5000 });
        await page.click('[data-testid="permissions_dialog"] button[name="__CONFIRM__"]');
      } catch {
        // Permission dialog might not appear
      }
      
      // Wait for redirect back to anyKrowd
      await page.waitForURL('**/anykrowd.dev/**', { timeout: options.timeout });
      
      // Verify successful authentication
      const isAuthenticated = await this.verifyAuthentication(page);
      
      if (isAuthenticated) {
        return {
          success: true,
          provider: 'facebook',
          email: credentials.email,
          fallbackUsed: false,
          retryCount: 0,
          duration: Date.now() - startTime,
        };
      } else {
        throw new Error('Authentication verification failed');
      }
    } catch (error) {
      throw new Error(`Facebook OAuth failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Authenticate with fallback email method
   */
  private async authenticateWithFallback(
    page: Page,
    options: AuthenticationOptions,
    startTime: number
  ): Promise<AuthenticationResult> {
    try {
      const credentials = this.configManager.getFallbackCredentials();
      
      if (!credentials.email || !credentials.password) {
        throw new Error('Missing fallback credentials');
      }

      // Navigate to anyKrowd login page
      await page.goto('/login', { timeout: options.timeout });
      
      // Fill email and password
      await page.fill('input[type="email"]', credentials.email);
      await page.fill('input[type="password"]', credentials.password);
      await page.click('button[type="submit"]');
      
      // Wait for successful login
      await page.waitForURL('**/dashboard**', { timeout: options.timeout });
      
      // Verify successful authentication
      const isAuthenticated = await this.verifyAuthentication(page);
      
      if (isAuthenticated) {
        return {
          success: true,
          provider: 'email',
          email: credentials.email,
          fallbackUsed: true,
          retryCount: 0,
          duration: Date.now() - startTime,
        };
      } else {
        throw new Error('Fallback authentication verification failed');
      }
    } catch (error) {
      return {
        success: false,
        provider: 'email',
        error: this.createAuthError(
          'FALLBACK_FAILED',
          error instanceof Error ? error.message : 'Fallback authentication failed',
          'email'
        ),
        fallbackUsed: true,
        retryCount: 0,
        duration: Date.now() - startTime,
      };
    }
  }

  /**
   * Verify authentication was successful
   */
  private async verifyAuthentication(page: Page): Promise<boolean> {
    try {
      // Check for authenticated user indicators
      const authIndicators = [
        '[data-testid="user-menu"]',
        '[data-testid="user-avatar"]',
        '.user-profile',
        '.dashboard-header',
      ];

      for (const selector of authIndicators) {
        try {
          await page.waitForSelector(selector, { timeout: 5000 });
          return true;
        } catch {
          // Continue to next indicator
        }
      }

      // Check URL patterns that indicate successful authentication
      const currentUrl = page.url();
      const authenticatedPatterns = [
        '/dashboard',
        '/profile',
        '/wallet',
        '/events',
      ];

      return authenticatedPatterns.some(pattern => currentUrl.includes(pattern));
    } catch {
      return false;
    }
  }

  /**
   * Create mock authentication result for testing
   */
  private createMockAuthResult(startTime: number): AuthenticationResult {
    const mockResponse: MockOAuthResponse = {
      success: true,
      userId: 'mock-user-123',
      email: 'mock-user@testx.dev',
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      expiresIn: 3600,
    };

    return {
      success: true,
      provider: 'mock',
      userId: mockResponse.userId,
      email: mockResponse.email,
      accessToken: mockResponse.accessToken,
      refreshToken: mockResponse.refreshToken,
      expiresAt: new Date(Date.now() + mockResponse.expiresIn * 1000),
      fallbackUsed: false,
      retryCount: 0,
      duration: Date.now() - startTime,
    };
  }

  /**
   * Create authentication error
   */
  private createAuthError(
    code: string,
    message: string,
    provider: string
  ): AuthenticationError {
    return {
      code,
      message,
      provider,
      timestamp: new Date(),
      retryable: code !== 'INVALID_CREDENTIALS',
      fallbackAvailable: this.configManager.isFallbackEnabled(),
    };
  }

  /**
   * Delay utility for retry logic
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
} 