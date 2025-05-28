/**
 * Service health monitoring system for TestX external service integrations
 * Provides health checking, caching, and performance metrics
 */

import {
  ServiceType,
  ServiceConfiguration,
  ServiceHealth,
  ServiceStatus,
  ServiceHealthMap,
  ServiceMetrics,
  ServiceMetricsMap,
  IntegrationEvent,
  HealthCheckError,
  HealthCheckHandler,
  IntegrationEventHandler
} from './integration-types';

export interface HealthMonitorConfig {
  checkInterval: number;
  cacheTimeout: number;
  requestTimeout: number;
  retryAttempts: number;
  retryDelay: number;
  metricsRetentionHours: number;
}

export class ServiceHealthMonitor {
  private healthCache: Map<ServiceType, ServiceHealth> = new Map();
  private metricsCache: Map<ServiceType, ServiceMetrics> = new Map();
  private checkIntervals: Map<ServiceType, NodeJS.Timeout> = new Map();
  private eventHandlers: IntegrationEventHandler[] = [];
  private healthHandlers: HealthCheckHandler[] = [];
  private config: HealthMonitorConfig;

  constructor(config: Partial<HealthMonitorConfig> = {}) {
    this.config = {
      checkInterval: 300000, // 5 minutes
      cacheTimeout: 60000, // 1 minute
      requestTimeout: 30000, // 30 seconds
      retryAttempts: 3,
      retryDelay: 1000, // 1 second
      metricsRetentionHours: 24,
      ...config
    };
  }

  /**
   * Start monitoring a service
   */
  public startMonitoring(service: ServiceConfiguration): void {
    // Stop existing monitoring if any
    this.stopMonitoring(service.type);

    // Initialize metrics
    this.initializeMetrics(service.type);

    // Start periodic health checks
    const interval = setInterval(async () => {
      try {
        await this.checkServiceHealth(service);
      } catch (error) {
        console.error(`Health check failed for ${service.type}:`, error);
      }
    }, this.config.checkInterval);

    this.checkIntervals.set(service.type, interval);

    // Perform initial health check
    this.checkServiceHealth(service).catch(error => {
      console.error(`Initial health check failed for ${service.type}:`, error);
    });
  }

  /**
   * Stop monitoring a service
   */
  public stopMonitoring(serviceType: ServiceType): void {
    const interval = this.checkIntervals.get(serviceType);
    if (interval) {
      clearInterval(interval);
      this.checkIntervals.delete(serviceType);
    }
  }

  /**
   * Stop all monitoring
   */
  public stopAllMonitoring(): void {
    for (const [serviceType] of this.checkIntervals) {
      this.stopMonitoring(serviceType);
    }
  }

  /**
   * Get cached health status for a service
   */
  public getHealth(serviceType: ServiceType): ServiceHealth | null {
    const cached = this.healthCache.get(serviceType);
    if (!cached) return null;

    // Check if cache is still valid
    const cacheAge = Date.now() - cached.lastChecked.getTime();
    if (cacheAge > this.config.cacheTimeout) {
      return null;
    }

    return cached;
  }

  /**
   * Get health status for all monitored services
   */
  public getAllHealth(): ServiceHealthMap {
    const result = {} as ServiceHealthMap;
    for (const [serviceType, health] of this.healthCache) {
      const cacheAge = Date.now() - health.lastChecked.getTime();
      if (cacheAge <= this.config.cacheTimeout) {
        result[serviceType] = health;
      }
    }
    return result;
  }

  /**
   * Get metrics for a service
   */
  public getMetrics(serviceType: ServiceType): ServiceMetrics | null {
    return this.metricsCache.get(serviceType) || null;
  }

  /**
   * Get metrics for all monitored services
   */
  public getAllMetrics(): ServiceMetricsMap {
    const result = {} as ServiceMetricsMap;
    for (const [serviceType, metrics] of this.metricsCache) {
      result[serviceType] = metrics;
    }
    return result;
  }

  /**
   * Force a health check for a service
   */
  public async forceHealthCheck(service: ServiceConfiguration): Promise<ServiceHealth> {
    return this.checkServiceHealth(service, true);
  }

  /**
   * Check if a service is healthy (with cache)
   */
  public async isServiceHealthy(service: ServiceConfiguration): Promise<boolean> {
    const cached = this.getHealth(service.type);
    if (cached) {
      return cached.status === ServiceStatus.HEALTHY;
    }

    try {
      const health = await this.checkServiceHealth(service);
      return health.status === ServiceStatus.HEALTHY;
    } catch {
      return false;
    }
  }

  /**
   * Perform health check for a service
   */
  private async checkServiceHealth(service: ServiceConfiguration, force = false): Promise<ServiceHealth> {
    const startTime = Date.now();
    let health: ServiceHealth;

    try {
      // Check cache first unless forced
      if (!force) {
        const cached = this.getHealth(service.type);
        if (cached) {
          return cached;
        }
      }

      // Perform health check with retry logic
      const response = await this.performHealthCheckWithRetry(service);
      const responseTime = Date.now() - startTime;

      health = {
        service: service.type,
        status: this.determineHealthStatus(response.status, responseTime),
        lastChecked: new Date(),
        responseTime,
        metadata: {
          statusCode: response.status,
          url: service.healthCheck.url
        }
      };

      // Update metrics
      this.updateMetrics(service.type, responseTime, false);

    } catch (error) {
      const responseTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : String(error);

      health = {
        service: service.type,
        status: ServiceStatus.UNHEALTHY,
        lastChecked: new Date(),
        responseTime,
        errorMessage,
        metadata: {
          error: errorMessage,
          url: service.healthCheck.url
        }
      };

      // Update metrics with error
      this.updateMetrics(service.type, responseTime, true);

      // Emit error event
      this.emitEvent({
        id: this.generateEventId(),
        timestamp: new Date(),
        service: service.type,
        type: 'error',
        status: ServiceStatus.UNHEALTHY,
        message: `Health check failed: ${errorMessage}`,
        metadata: { error: errorMessage, responseTime }
      });
    }

    // Cache the result
    this.healthCache.set(service.type, health);

    // Emit health check event
    this.emitEvent({
      id: this.generateEventId(),
      timestamp: new Date(),
      service: service.type,
      type: 'health_check',
      status: health.status,
      message: `Health check completed: ${health.status}`,
      metadata: { responseTime: health.responseTime }
    });

    // Notify health handlers
    this.notifyHealthHandlers(health);

    return health;
  }

  /**
   * Perform health check with retry logic
   */
  private async performHealthCheckWithRetry(service: ServiceConfiguration): Promise<Response> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.requestTimeout);

        const response = await fetch(service.healthCheck.url, {
          method: service.healthCheck.method,
          ...(service.healthCheck.headers && { headers: service.healthCheck.headers }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (service.healthCheck.expectedStatus.includes(response.status)) {
          return response;
        } else {
          throw new HealthCheckError(
            service.type,
            0,
            `Unexpected status code: ${response.status}`
          );
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempt < this.config.retryAttempts) {
          await this.delay(this.config.retryDelay * attempt);
        }
      }
    }

    throw new HealthCheckError(
      service.type,
      0,
      `Health check failed after ${this.config.retryAttempts} attempts: ${lastError?.message}`
    );
  }

  /**
   * Determine health status based on response and timing
   */
  private determineHealthStatus(statusCode: number, responseTime: number): ServiceStatus {
    if (statusCode >= 200 && statusCode < 300) {
      // Consider degraded if response time is too high
      if (responseTime > 10000) { // 10 seconds
        return ServiceStatus.DEGRADED;
      }
      return ServiceStatus.HEALTHY;
    } else if (statusCode >= 500) {
      return ServiceStatus.UNHEALTHY;
    } else {
      return ServiceStatus.DEGRADED;
    }
  }

  /**
   * Initialize metrics for a service
   */
  private initializeMetrics(serviceType: ServiceType): void {
    const metrics: ServiceMetrics = {
      service: serviceType,
      uptime: 0,
      averageResponseTime: 0,
      errorRate: 0,
      lastHour: {
        requests: 0,
        errors: 0,
        averageResponseTime: 0
      },
      lastDay: {
        requests: 0,
        errors: 0,
        averageResponseTime: 0
      }
    };

    this.metricsCache.set(serviceType, metrics);
  }

  /**
   * Update metrics for a service
   */
  private updateMetrics(serviceType: ServiceType, responseTime: number, isError: boolean): void {
    const metrics = this.metricsCache.get(serviceType);
    if (!metrics) return;

    // Update overall metrics
    metrics.lastHour.requests++;
    metrics.lastDay.requests++;

    if (isError) {
      metrics.lastHour.errors++;
      metrics.lastDay.errors++;
    }

    // Update response times
    const totalRequests = metrics.lastHour.requests;
    metrics.lastHour.averageResponseTime = 
      (metrics.lastHour.averageResponseTime * (totalRequests - 1) + responseTime) / totalRequests;

    const totalDayRequests = metrics.lastDay.requests;
    metrics.lastDay.averageResponseTime = 
      (metrics.lastDay.averageResponseTime * (totalDayRequests - 1) + responseTime) / totalDayRequests;

    // Update error rates
    metrics.errorRate = metrics.lastDay.errors / metrics.lastDay.requests;

    // Update overall average
    metrics.averageResponseTime = metrics.lastDay.averageResponseTime;

    this.metricsCache.set(serviceType, metrics);
  }

  /**
   * Add event handler
   */
  public addEventHandler(handler: IntegrationEventHandler): void {
    this.eventHandlers.push(handler);
  }

  /**
   * Add health check handler
   */
  public addHealthHandler(handler: HealthCheckHandler): void {
    this.healthHandlers.push(handler);
  }

  /**
   * Remove event handler
   */
  public removeEventHandler(handler: IntegrationEventHandler): void {
    const index = this.eventHandlers.indexOf(handler);
    if (index !== -1) {
      this.eventHandlers.splice(index, 1);
    }
  }

  /**
   * Remove health check handler
   */
  public removeHealthHandler(handler: HealthCheckHandler): void {
    const index = this.healthHandlers.indexOf(handler);
    if (index !== -1) {
      this.healthHandlers.splice(index, 1);
    }
  }

  /**
   * Emit integration event
   */
  private emitEvent(event: IntegrationEvent): void {
    for (const handler of this.eventHandlers) {
      try {
        handler(event);
      } catch (error) {
        console.error('Event handler error:', error);
      }
    }
  }

  /**
   * Notify health handlers
   */
  private notifyHealthHandlers(health: ServiceHealth): void {
    for (const handler of this.healthHandlers) {
      try {
        handler(health);
      } catch (error) {
        console.error('Health handler error:', error);
      }
    }
  }

  /**
   * Generate unique event ID
   */
  private generateEventId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Delay utility
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Clear old metrics data
   */
  public clearOldMetrics(): void {
    // Reset hourly metrics
    for (const [serviceType, metrics] of this.metricsCache) {
      metrics.lastHour = {
        requests: 0,
        errors: 0,
        averageResponseTime: 0
      };
      this.metricsCache.set(serviceType, metrics);
    }
  }

  /**
   * Get configuration
   */
  public getConfig(): HealthMonitorConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  public updateConfig(newConfig: Partial<HealthMonitorConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
} 