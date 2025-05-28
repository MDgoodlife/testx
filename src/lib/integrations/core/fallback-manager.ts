/**
 * Fallback strategy coordinator for TestX external service integrations
 * Manages offline mode, cached data, and service-specific fallback strategies
 */

import {
  ServiceType,
  ServiceConfiguration,
  FallbackStrategy,
  RetryPolicy,
  IntegrationError
} from './integration-types';

export interface FallbackData {
  service: ServiceType;
  data: any;
  timestamp: Date;
  expiresAt: Date;
  source: 'cache' | 'local' | 'fallback';
}

export interface FallbackManagerConfig {
  enabled: boolean;
  cacheRetentionHours: number;
  maxCacheSize: number;
  offlineMode: boolean;
  localStorageEnabled: boolean;
}

export class FallbackManager {
  private fallbackCache: Map<string, FallbackData> = new Map();
  private config: FallbackManagerConfig;

  constructor(config: Partial<FallbackManagerConfig> = {}) {
    this.config = {
      enabled: true,
      cacheRetentionHours: 24,
      maxCacheSize: 1000,
      offlineMode: false,
      localStorageEnabled: true,
      ...config
    };
  }

  /**
   * Execute operation with fallback strategy
   */
  public async executeWithFallback<T>(
    service: ServiceConfiguration,
    operation: () => Promise<T>,
    fallbackKey: string
  ): Promise<T> {
    if (!this.config.enabled) {
      return operation();
    }

    try {
      // Try primary operation
      const result = await this.executeWithRetry(service, operation);
      
      // Cache successful result
      this.cacheResult(service.type, fallbackKey, result);
      
      return result;
    } catch (error) {
      // Primary operation failed, try fallback
      return this.handleFallback(service, fallbackKey, error);
    }
  }

  /**
   * Execute operation with retry logic
   */
  private async executeWithRetry<T>(
    service: ServiceConfiguration,
    operation: () => Promise<T>
  ): Promise<T> {
    const retryPolicy = service.retryPolicy;
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= retryPolicy.maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        // Check if error is retryable
        if (!this.isRetryableError(lastError, retryPolicy)) {
          throw lastError;
        }

        // Don't retry on last attempt
        if (attempt === retryPolicy.maxAttempts) {
          throw lastError;
        }

        // Calculate delay with exponential backoff and jitter
        const delay = this.calculateRetryDelay(attempt, retryPolicy);
        await this.delay(delay);
      }
    }

    throw lastError || new Error('Operation failed after retries');
  }

  /**
   * Handle fallback when primary operation fails
   */
  private async handleFallback<T>(
    service: ServiceConfiguration,
    fallbackKey: string,
    error: any
  ): Promise<T> {
    const fallbackStrategy = service.fallbackStrategy;

    if (!fallbackStrategy.enabled) {
      throw new IntegrationError(
        service.type,
        'FALLBACK_DISABLED',
        `Service ${service.type} failed and fallback is disabled`,
        false,
        { originalError: error }
      );
    }

    // Try cached data first
    const cachedData = this.getCachedData(service.type, fallbackKey);
    if (cachedData) {
      console.warn(`Using cached data for ${service.type}:${fallbackKey}`);
      return cachedData.data;
    }

    // Try fallback data source
    if (fallbackStrategy.fallbackDataSource) {
      try {
        const fallbackData = await this.loadFallbackData(
          service.type,
          fallbackStrategy.fallbackDataSource,
          fallbackKey
        );
        return fallbackData;
      } catch (fallbackError) {
        console.error(`Fallback data source failed for ${service.type}:`, fallbackError);
      }
    }

    // If offline mode is enabled, return offline capabilities
    if (this.config.offlineMode && fallbackStrategy.offlineCapabilities.length > 0) {
      return this.getOfflineCapability(service.type, fallbackKey, fallbackStrategy);
    }

    // All fallback strategies failed
    throw new IntegrationError(
      service.type,
      'FALLBACK_EXHAUSTED',
      `All fallback strategies exhausted for ${service.type}`,
      false,
      { 
        originalError: error,
        fallbackStrategy,
        offlineMode: this.config.offlineMode
      }
    );
  }

  /**
   * Cache successful operation result
   */
  private cacheResult(service: ServiceType, key: string, data: any): void {
    if (!this.config.enabled) return;

    const cacheKey = `${service}:${key}`;
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + this.config.cacheRetentionHours);

    const fallbackData: FallbackData = {
      service,
      data,
      timestamp: new Date(),
      expiresAt,
      source: 'cache'
    };

    this.fallbackCache.set(cacheKey, fallbackData);
    this.cleanupExpiredCache();
  }

  /**
   * Get cached data for a service operation
   */
  private getCachedData(service: ServiceType, key: string): FallbackData | null {
    const cacheKey = `${service}:${key}`;
    const cached = this.fallbackCache.get(cacheKey);

    if (!cached) return null;

    // Check if cache is expired
    if (cached.expiresAt < new Date()) {
      this.fallbackCache.delete(cacheKey);
      return null;
    }

    return cached;
  }

  /**
   * Load data from fallback data source
   */
  private async loadFallbackData(
    service: ServiceType,
    fallbackDataSource: string,
    key: string
  ): Promise<any> {
    // This would be implemented based on the specific fallback data source
    // For now, we'll simulate loading from a local file or database
    
    if (fallbackDataSource.startsWith('file://')) {
      // Load from local file
      const filePath = fallbackDataSource.replace('file://', '');
      // Implementation would read from file system
      throw new Error(`File fallback not implemented: ${filePath}`);
    } else if (fallbackDataSource.startsWith('local://')) {
      // Load from local storage
      return this.loadFromLocalStorage(service, key);
    } else {
      throw new Error(`Unknown fallback data source: ${fallbackDataSource}`);
    }
  }

  /**
   * Load data from local storage
   */
  private loadFromLocalStorage(_service: ServiceType, _key: string): any {
    if (!this.config.localStorageEnabled) {
      throw new Error('Local storage is disabled');
    }

    // In a browser environment, this would use localStorage
    // In Node.js, this would use a local file or database
    // Simulate local storage (in real implementation, this would be actual storage)
    return null;
  }

  /**
   * Get offline capability for a service
   */
  private getOfflineCapability(
    service: ServiceType,
    key: string,
    fallbackStrategy: FallbackStrategy
  ): any {
    // Return mock data or limited functionality based on offline capabilities
    const capabilities = fallbackStrategy.offlineCapabilities;
    
    if (capabilities.includes('mock_data')) {
      return this.generateMockData(service, key);
    } else if (capabilities.includes('limited_functionality')) {
      return this.getLimitedFunctionality(service, key);
    } else {
      throw new Error(`No suitable offline capability for ${service}:${key}`);
    }
  }

  /**
   * Generate mock data for offline mode
   */
  private generateMockData(service: ServiceType, key: string): any {
    // Generate service-specific mock data
    switch (service) {
      case ServiceType.SLACK:
        return { message: 'Mock Slack response', channel: 'test', timestamp: new Date() };
      case ServiceType.NOTION:
        return { id: 'mock-id', title: 'Mock Notion page', content: 'Mock content' };
      case ServiceType.GITHUB:
        return { sha: 'mock-sha', message: 'Mock commit', author: 'test-user' };
      case ServiceType.ANYKROWD:
        return { status: 'mock', data: 'Mock anyKrowd response' };
      default:
        return { mock: true, service, key, timestamp: new Date() };
    }
  }

  /**
   * Get limited functionality for offline mode
   */
  private getLimitedFunctionality(service: ServiceType, key: string): any {
    // Return limited functionality object
    return {
      offline: true,
      service,
      key,
      message: `Limited functionality available for ${service}`,
      timestamp: new Date()
    };
  }

  /**
   * Check if error is retryable based on retry policy
   */
  private isRetryableError(error: Error, retryPolicy: RetryPolicy): boolean {
    const errorMessage = error.message.toLowerCase();
    
    // Check against retryable error patterns
    for (const retryableError of retryPolicy.retryableErrors) {
      if (errorMessage.includes(retryableError.toLowerCase())) {
        return true;
      }
    }

    // Default retryable errors
    const defaultRetryableErrors = [
      'timeout',
      'network',
      'connection',
      'econnreset',
      'enotfound',
      'rate limit',
      '429',
      '500',
      '502',
      '503',
      '504'
    ];

    return defaultRetryableErrors.some(pattern => 
      errorMessage.includes(pattern)
    );
  }

  /**
   * Calculate retry delay with exponential backoff and jitter
   */
  private calculateRetryDelay(attempt: number, retryPolicy: RetryPolicy): number {
    let delay = retryPolicy.baseDelay;

    if (retryPolicy.exponentialBackoff) {
      delay = retryPolicy.baseDelay * Math.pow(2, attempt - 1);
    }

    // Apply max delay limit
    delay = Math.min(delay, retryPolicy.maxDelay);

    // Add jitter if enabled
    if (retryPolicy.jitterEnabled) {
      const jitter = Math.random() * 0.1 * delay; // 10% jitter
      delay += jitter;
    }

    return Math.floor(delay);
  }

  /**
   * Delay utility
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Clean up expired cache entries
   */
  private cleanupExpiredCache(): void {
    const now = new Date();
    const toDelete: string[] = [];

    for (const [key, data] of this.fallbackCache) {
      if (data.expiresAt < now) {
        toDelete.push(key);
      }
    }

    for (const key of toDelete) {
      this.fallbackCache.delete(key);
    }

    // Also enforce max cache size
    if (this.fallbackCache.size > this.config.maxCacheSize) {
      const entries = Array.from(this.fallbackCache.entries());
      entries.sort((a, b) => a[1].timestamp.getTime() - b[1].timestamp.getTime());
      
      const toRemove = entries.slice(0, entries.length - this.config.maxCacheSize);
      for (const [key] of toRemove) {
        this.fallbackCache.delete(key);
      }
    }
  }

  /**
   * Clear all cached data
   */
  public clearCache(): void {
    this.fallbackCache.clear();
  }

  /**
   * Clear cache for specific service
   */
  public clearServiceCache(service: ServiceType): void {
    const toDelete: string[] = [];
    
    for (const [key, data] of this.fallbackCache) {
      if (data.service === service) {
        toDelete.push(key);
      }
    }

    for (const key of toDelete) {
      this.fallbackCache.delete(key);
    }
  }

  /**
   * Get cache statistics
   */
  public getCacheStats(): {
    totalEntries: number;
    entriesByService: Record<ServiceType, number>;
    oldestEntry?: Date;
    newestEntry?: Date;
  } {
    const stats: {
      totalEntries: number;
      entriesByService: Record<ServiceType, number>;
      oldestEntry?: Date;
      newestEntry?: Date;
    } = {
      totalEntries: this.fallbackCache.size,
      entriesByService: {} as Record<ServiceType, number>
    };

    // Initialize service counters
    for (const serviceType of Object.values(ServiceType)) {
      stats.entriesByService[serviceType] = 0;
    }

    // Calculate statistics
    for (const [, data] of this.fallbackCache) {
      stats.entriesByService[data.service]++;
      
      if (!stats.oldestEntry || data.timestamp < stats.oldestEntry) {
        stats.oldestEntry = data.timestamp;
      }
      
      if (!stats.newestEntry || data.timestamp > stats.newestEntry) {
        stats.newestEntry = data.timestamp;
      }
    }

    return stats;
  }

  /**
   * Enable offline mode
   */
  public enableOfflineMode(): void {
    this.config.offlineMode = true;
  }

  /**
   * Disable offline mode
   */
  public disableOfflineMode(): void {
    this.config.offlineMode = false;
  }

  /**
   * Check if offline mode is enabled
   */
  public isOfflineModeEnabled(): boolean {
    return this.config.offlineMode;
  }

  /**
   * Get configuration
   */
  public getConfig(): FallbackManagerConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  public updateConfig(newConfig: Partial<FallbackManagerConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
} 