/**
 * Core integration types and interfaces for TestX external service management
 */

export enum ServiceType {
  SLACK = 'slack',
  NOTION = 'notion',
  GITHUB = 'github',
  ANYKROWD = 'anykrowd'
}

export enum ServiceStatus {
  HEALTHY = 'healthy',
  DEGRADED = 'degraded',
  UNHEALTHY = 'unhealthy',
  UNKNOWN = 'unknown',
  OFFLINE = 'offline'
}

export enum IntegrationMode {
  ONLINE = 'online',
  OFFLINE = 'offline',
  MOCK = 'mock',
  FALLBACK = 'fallback'
}

export interface ServiceDependency {
  service: ServiceType;
  required: boolean;
  fallbackAvailable: boolean;
  description: string;
}

export interface ServiceHealthCheck {
  url: string;
  method: 'GET' | 'POST' | 'HEAD';
  timeout: number;
  expectedStatus: number[];
  headers?: Record<string, string>;
  retryAttempts: number;
  retryDelay: number;
}

export interface ServiceConfiguration {
  type: ServiceType;
  name: string;
  description: string;
  dependencies: ServiceDependency[];
  healthCheck: ServiceHealthCheck;
  fallbackStrategy: FallbackStrategy;
  retryPolicy: RetryPolicy;
  enabled: boolean;
  priority: number; // Lower number = higher priority
}

export interface FallbackStrategy {
  enabled: boolean;
  mode: IntegrationMode;
  cacheEnabled: boolean;
  cacheRetentionHours: number;
  offlineCapabilities: string[];
  fallbackDataSource?: string;
}

export interface RetryPolicy {
  maxAttempts: number;
  baseDelay: number;
  maxDelay: number;
  exponentialBackoff: boolean;
  jitterEnabled: boolean;
  retryableErrors: string[];
}

export interface ServiceHealth {
  service: ServiceType;
  status: ServiceStatus;
  lastChecked: Date;
  responseTime: number;
  errorMessage?: string;
  metadata?: Record<string, any>;
}

export interface IntegrationState {
  service: ServiceType;
  mode: IntegrationMode;
  connected: boolean;
  lastConnected?: Date;
  connectionAttempts: number;
  errorCount: number;
  lastError?: string;
}

export interface DependencyValidationResult {
  valid: boolean;
  missingDependencies: ServiceType[];
  circularDependencies: ServiceType[];
  errors: string[];
  warnings: string[];
}

export interface IntegrationSequence {
  sequence: ServiceType[];
  parallelGroups: ServiceType[][];
  validationRules: DependencyValidationRule[];
}

export interface DependencyValidationRule {
  name: string;
  description: string;
  validate: (services: ServiceConfiguration[]) => DependencyValidationResult;
}

export interface ServiceMetrics {
  service: ServiceType;
  uptime: number;
  averageResponseTime: number;
  errorRate: number;
  lastHour: {
    requests: number;
    errors: number;
    averageResponseTime: number;
  };
  lastDay: {
    requests: number;
    errors: number;
    averageResponseTime: number;
  };
}

export interface IntegrationEvent {
  id: string;
  timestamp: Date;
  service: ServiceType;
  type: 'health_check' | 'connection' | 'error' | 'fallback' | 'recovery';
  status: ServiceStatus;
  message: string;
  metadata?: Record<string, any>;
}

export interface IntegrationManagerConfig {
  healthCheckInterval: number;
  sequenceValidationEnabled: boolean;
  fallbackEnabled: boolean;
  mockMode: boolean;
  retryEnabled: boolean;
  metricsEnabled: boolean;
  eventLoggingEnabled: boolean;
}

// Error types for integration system
export class IntegrationError extends Error {
  constructor(
    public service: ServiceType,
    public code: string,
    message: string,
    public retryable: boolean = false,
    public metadata?: Record<string, any>
  ) {
    super(message);
    this.name = 'IntegrationError';
  }
}

export class DependencyError extends Error {
  constructor(
    public missingDependencies: ServiceType[],
    message: string
  ) {
    super(message);
    this.name = 'DependencyError';
  }
}

export class HealthCheckError extends Error {
  constructor(
    public service: ServiceType,
    public responseTime: number,
    message: string
  ) {
    super(message);
    this.name = 'HealthCheckError';
  }
}

// Utility types
export type ServiceConfigMap = Record<ServiceType, ServiceConfiguration>;
export type ServiceHealthMap = Record<ServiceType, ServiceHealth>;
export type ServiceStateMap = Record<ServiceType, IntegrationState>;
export type ServiceMetricsMap = Record<ServiceType, ServiceMetrics>;

// Event handlers
export type HealthCheckHandler = (health: ServiceHealth) => void;
export type IntegrationEventHandler = (event: IntegrationEvent) => void;
export type ServiceStateChangeHandler = (service: ServiceType, oldState: IntegrationState, newState: IntegrationState) => void; 