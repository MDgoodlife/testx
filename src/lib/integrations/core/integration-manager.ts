/**
 * Main integration orchestrator for TestX external service integrations
 * Coordinates dependency validation, health monitoring, and fallback strategies
 */

import {
  ServiceType,
  ServiceConfiguration,
  ServiceHealthMap,
  ServiceMetricsMap,
  ServiceStateMap,
  IntegrationState,
  IntegrationMode,
  ServiceStatus,
  IntegrationManagerConfig,
  IntegrationEvent,
  IntegrationSequence,
  IntegrationError,
  IntegrationEventHandler,
  ServiceStateChangeHandler
} from './integration-types';

import { DependencyValidator } from './dependency-validator';
import { ServiceHealthMonitor, HealthMonitorConfig } from './service-health-monitor';
import { FallbackManager, FallbackManagerConfig } from './fallback-manager';

export class IntegrationManager {
  private services: Map<ServiceType, ServiceConfiguration> = new Map();
  private serviceStates: Map<ServiceType, IntegrationState> = new Map();
  private dependencyValidator: DependencyValidator;
  private healthMonitor: ServiceHealthMonitor;
  private fallbackManager: FallbackManager;
  private config: IntegrationManagerConfig;
  private eventHandlers: IntegrationEventHandler[] = [];
  private stateChangeHandlers: ServiceStateChangeHandler[] = [];
  private isInitialized = false;

  constructor(config: Partial<IntegrationManagerConfig> = {}) {
    this.config = {
      healthCheckInterval: 300000, // 5 minutes
      sequenceValidationEnabled: true,
      fallbackEnabled: true,
      mockMode: false,
      retryEnabled: true,
      metricsEnabled: true,
      eventLoggingEnabled: true,
      ...config
    };

    this.dependencyValidator = new DependencyValidator();
    this.healthMonitor = new ServiceHealthMonitor({
      checkInterval: this.config.healthCheckInterval,
      metricsRetentionHours: 24
    } as HealthMonitorConfig);
    this.fallbackManager = new FallbackManager({
      enabled: this.config.fallbackEnabled,
      offlineMode: this.config.mockMode
    } as FallbackManagerConfig);

    this.setupEventHandlers();
  }

  /**
   * Initialize the integration manager with service configurations
   */
  public async initialize(services: ServiceConfiguration[]): Promise<void> {
    if (this.isInitialized) {
      throw new Error('Integration manager is already initialized');
    }

    try {
      // Validate service configurations
      if (this.config.sequenceValidationEnabled) {
        const validationResult = this.dependencyValidator.validateServices(services);
        if (!validationResult.valid) {
          throw new Error(`Service validation failed: ${validationResult.errors.join(', ')}`);
        }

        // Log warnings
        if (validationResult.warnings.length > 0) {
          console.warn('Service validation warnings:', validationResult.warnings);
        }
      }

      // Register services
      for (const service of services) {
        this.registerService(service);
      }

      // Generate integration sequence
      const sequence = this.dependencyValidator.generateIntegrationSequence(services);
      
      // Initialize services in dependency order
      await this.initializeServicesInSequence(sequence);

      this.isInitialized = true;
      this.emitEvent({
        id: this.generateEventId(),
        timestamp: new Date(),
        service: ServiceType.SLACK, // Use first service as representative
        type: 'connection',
        status: ServiceStatus.HEALTHY,
        message: 'Integration manager initialized successfully',
        metadata: { 
          servicesCount: services.length,
          sequence: sequence.sequence
        }
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.emitEvent({
        id: this.generateEventId(),
        timestamp: new Date(),
        service: ServiceType.SLACK,
        type: 'error',
        status: ServiceStatus.UNHEALTHY,
        message: `Integration manager initialization failed: ${errorMessage}`,
        metadata: { error: errorMessage }
      });
      throw error;
    }
  }

  /**
   * Register a service configuration
   */
  private registerService(service: ServiceConfiguration): void {
    this.services.set(service.type, service);
    
    // Initialize service state
    const state: IntegrationState = {
      service: service.type,
      mode: this.config.mockMode ? IntegrationMode.MOCK : IntegrationMode.ONLINE,
      connected: false,
      connectionAttempts: 0,
      errorCount: 0
    };
    
    this.serviceStates.set(service.type, state);
  }

  /**
   * Initialize services in dependency order
   */
  private async initializeServicesInSequence(sequence: IntegrationSequence): Promise<void> {
    for (const serviceType of sequence.sequence) {
      const service = this.services.get(serviceType);
      if (!service) continue;

      try {
        await this.initializeService(service);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Failed to initialize service ${serviceType}:`, errorMessage);
        
        // Update service state
        this.updateServiceState(serviceType, {
          connected: false,
          errorCount: this.getServiceState(serviceType)?.errorCount || 0 + 1,
          lastError: errorMessage
        });

        // Continue with other services if fallback is enabled
        if (!this.config.fallbackEnabled) {
          throw error;
        }
      }
    }
  }

  /**
   * Initialize a single service
   */
  private async initializeService(service: ServiceConfiguration): Promise<void> {
    const currentState = this.getServiceState(service.type);
    if (!currentState) return;

    this.updateServiceState(service.type, {
      connectionAttempts: currentState.connectionAttempts + 1
    });

    try {
      // Start health monitoring
      if (service.enabled) {
        this.healthMonitor.startMonitoring(service);
      }

      // Perform initial health check
      const isHealthy = await this.healthMonitor.isServiceHealthy(service);
      
      this.updateServiceState(service.type, {
        connected: isHealthy,
        ...(isHealthy && { lastConnected: new Date() }),
        mode: isHealthy ? IntegrationMode.ONLINE : IntegrationMode.FALLBACK
      });

      this.emitEvent({
        id: this.generateEventId(),
        timestamp: new Date(),
        service: service.type,
        type: 'connection',
        status: isHealthy ? ServiceStatus.HEALTHY : ServiceStatus.DEGRADED,
        message: `Service ${service.type} initialized: ${isHealthy ? 'healthy' : 'degraded'}`,
        metadata: { healthy: isHealthy }
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      this.updateServiceState(service.type, {
        connected: false,
        errorCount: currentState.errorCount + 1,
        lastError: errorMessage,
        mode: IntegrationMode.FALLBACK
      });

      throw new IntegrationError(
        service.type,
        'INITIALIZATION_FAILED',
        `Service initialization failed: ${errorMessage}`,
        true,
        { originalError: error }
      );
    }
  }

  /**
   * Execute operation with integrated fallback and retry logic
   */
  public async executeOperation<T>(
    serviceType: ServiceType,
    operation: () => Promise<T>,
    operationKey: string
  ): Promise<T> {
    const service = this.services.get(serviceType);
    if (!service) {
      throw new Error(`Service ${serviceType} is not registered`);
    }

    const state = this.getServiceState(serviceType);
    if (!state) {
      throw new Error(`Service ${serviceType} state not found`);
    }

    // Check if service is in mock mode
    if (state.mode === IntegrationMode.MOCK || this.config.mockMode) {
      return this.fallbackManager.executeWithFallback(service, operation, operationKey);
    }

    // Check service health before operation
    const isHealthy = await this.healthMonitor.isServiceHealthy(service);
    if (!isHealthy && !this.config.fallbackEnabled) {
      throw new IntegrationError(
        serviceType,
        'SERVICE_UNHEALTHY',
        `Service ${serviceType} is unhealthy and fallback is disabled`,
        false
      );
    }

    try {
      // Execute with fallback support
      return await this.fallbackManager.executeWithFallback(service, operation, operationKey);
    } catch (error) {
      // Update service state on error
      this.updateServiceState(serviceType, {
        errorCount: state.errorCount + 1,
        lastError: error instanceof Error ? error.message : String(error)
      });

      throw error;
    }
  }

  /**
   * Get service health status
   */
  public getServiceHealth(serviceType: ServiceType): ServiceStatus {
    const health = this.healthMonitor.getHealth(serviceType);
    return health?.status || ServiceStatus.UNKNOWN;
  }

  /**
   * Get all service health statuses
   */
  public getAllServiceHealth(): ServiceHealthMap {
    return this.healthMonitor.getAllHealth();
  }

  /**
   * Get service metrics
   */
  public getServiceMetrics(serviceType: ServiceType) {
    return this.healthMonitor.getMetrics(serviceType);
  }

  /**
   * Get all service metrics
   */
  public getAllServiceMetrics(): ServiceMetricsMap {
    return this.healthMonitor.getAllMetrics();
  }

  /**
   * Get service state
   */
  public getServiceState(serviceType: ServiceType): IntegrationState | null {
    return this.serviceStates.get(serviceType) || null;
  }

  /**
   * Get all service states
   */
  public getAllServiceStates(): ServiceStateMap {
    const result = {} as ServiceStateMap;
    for (const [serviceType, state] of this.serviceStates) {
      result[serviceType] = state;
    }
    return result;
  }

  /**
   * Update service state and notify handlers
   */
  private updateServiceState(serviceType: ServiceType, updates: Partial<IntegrationState>): void {
    const currentState = this.serviceStates.get(serviceType);
    if (!currentState) return;

    const newState = { ...currentState, ...updates };
    this.serviceStates.set(serviceType, newState);

    // Notify state change handlers
    for (const handler of this.stateChangeHandlers) {
      try {
        handler(serviceType, currentState, newState);
      } catch (error) {
        console.error('State change handler error:', error);
      }
    }
  }

  /**
   * Force health check for a service
   */
  public async forceHealthCheck(serviceType: ServiceType): Promise<void> {
    const service = this.services.get(serviceType);
    if (!service) {
      throw new Error(`Service ${serviceType} is not registered`);
    }

    await this.healthMonitor.forceHealthCheck(service);
  }

  /**
   * Force health check for all services
   */
  public async forceAllHealthChecks(): Promise<void> {
    const promises = Array.from(this.services.keys()).map(serviceType =>
      this.forceHealthCheck(serviceType).catch(error =>
        console.error(`Health check failed for ${serviceType}:`, error)
      )
    );

    await Promise.all(promises);
  }

  /**
   * Enable offline mode
   */
  public enableOfflineMode(): void {
    this.config.mockMode = true;
    this.fallbackManager.enableOfflineMode();
    
    // Update all service states to mock mode
    for (const serviceType of this.services.keys()) {
      this.updateServiceState(serviceType, {
        mode: IntegrationMode.MOCK
      });
    }

    this.emitEvent({
      id: this.generateEventId(),
      timestamp: new Date(),
      service: ServiceType.SLACK,
      type: 'fallback',
      status: ServiceStatus.DEGRADED,
      message: 'Offline mode enabled for all services',
      metadata: { offlineMode: true }
    });
  }

  /**
   * Disable offline mode
   */
  public disableOfflineMode(): void {
    this.config.mockMode = false;
    this.fallbackManager.disableOfflineMode();
    
    // Update all service states back to online mode
    for (const serviceType of this.services.keys()) {
      this.updateServiceState(serviceType, {
        mode: IntegrationMode.ONLINE
      });
    }

    this.emitEvent({
      id: this.generateEventId(),
      timestamp: new Date(),
      service: ServiceType.SLACK,
      type: 'recovery',
      status: ServiceStatus.HEALTHY,
      message: 'Offline mode disabled, returning to online mode',
      metadata: { offlineMode: false }
    });
  }

  /**
   * Shutdown the integration manager
   */
  public async shutdown(): Promise<void> {
    // Stop health monitoring
    this.healthMonitor.stopAllMonitoring();
    
    // Clear caches
    this.fallbackManager.clearCache();
    
    // Clear state
    this.services.clear();
    this.serviceStates.clear();
    this.isInitialized = false;

    this.emitEvent({
      id: this.generateEventId(),
      timestamp: new Date(),
      service: ServiceType.SLACK,
      type: 'connection',
      status: ServiceStatus.OFFLINE,
      message: 'Integration manager shutdown completed',
      metadata: { shutdown: true }
    });
  }

  /**
   * Add event handler
   */
  public addEventHandler(handler: IntegrationEventHandler): void {
    this.eventHandlers.push(handler);
  }

  /**
   * Add state change handler
   */
  public addStateChangeHandler(handler: ServiceStateChangeHandler): void {
    this.stateChangeHandlers.push(handler);
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
   * Remove state change handler
   */
  public removeStateChangeHandler(handler: ServiceStateChangeHandler): void {
    const index = this.stateChangeHandlers.indexOf(handler);
    if (index !== -1) {
      this.stateChangeHandlers.splice(index, 1);
    }
  }

  /**
   * Setup internal event handlers
   */
  private setupEventHandlers(): void {
    // Health monitor events
    this.healthMonitor.addEventHandler((event) => {
      this.emitEvent(event);
    });

    // Health status change handler
    this.healthMonitor.addHealthHandler((health) => {
      const state = this.getServiceState(health.service);
      if (state) {
        const wasConnected = state.connected;
        const isConnected = health.status === ServiceStatus.HEALTHY;
        
        if (wasConnected !== isConnected) {
          this.updateServiceState(health.service, {
            connected: isConnected,
            ...(isConnected && { lastConnected: new Date() }),
            mode: isConnected ? IntegrationMode.ONLINE : IntegrationMode.FALLBACK
          });
        }
      }
    });
  }

  /**
   * Emit integration event
   */
  private emitEvent(event: IntegrationEvent): void {
    if (!this.config.eventLoggingEnabled) return;

    for (const handler of this.eventHandlers) {
      try {
        handler(event);
      } catch (error) {
        console.error('Event handler error:', error);
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
   * Get configuration
   */
  public getConfig(): IntegrationManagerConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  public updateConfig(newConfig: Partial<IntegrationManagerConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Update sub-component configurations
    this.healthMonitor.updateConfig({
      checkInterval: this.config.healthCheckInterval
    });
    
    this.fallbackManager.updateConfig({
      enabled: this.config.fallbackEnabled,
      offlineMode: this.config.mockMode
    });
  }

  /**
   * Check if manager is initialized
   */
  public isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Get integration statistics
   */
  public getIntegrationStats() {
    const stats = {
      totalServices: this.services.size,
      connectedServices: 0,
      healthyServices: 0,
      degradedServices: 0,
      unhealthyServices: 0,
      offlineServices: 0,
      fallbackCacheStats: this.fallbackManager.getCacheStats()
    };

    const healthMap = this.getAllServiceHealth();
    for (const health of Object.values(healthMap)) {
      switch (health.status) {
        case ServiceStatus.HEALTHY:
          stats.healthyServices++;
          stats.connectedServices++;
          break;
        case ServiceStatus.DEGRADED:
          stats.degradedServices++;
          stats.connectedServices++;
          break;
        case ServiceStatus.UNHEALTHY:
          stats.unhealthyServices++;
          break;
        case ServiceStatus.OFFLINE:
          stats.offlineServices++;
          break;
      }
    }

    return stats;
  }
} 