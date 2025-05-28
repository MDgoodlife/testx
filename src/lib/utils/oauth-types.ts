/**
 * TestX OAuth Integration Types
 * Comprehensive OAuth integration with fallback strategies
 * Following BMAD Method and Playwright best practices
 */

export interface OAuthProvider {
  name: 'google' | 'facebook';
  displayName: string;
  clientId: string;
  clientSecret?: string;
  scopes: string[];
  authUrl: string;
  tokenUrl: string;
  userInfoUrl: string;
}

export interface OAuthCredentials {
  email: string;
  password: string;
  provider: 'google' | 'facebook' | 'email';
  clientId?: string;
  clientSecret?: string;
}

export interface OAuthConfig {
  providers: {
    google: OAuthProvider;
    facebook: OAuthProvider;
  };
  fallback: {
    enabled: boolean;
    email: string;
    password: string;
  };
  timeout: number;
  retryAttempts: number;
  mockMode: boolean;
}

export interface AuthenticationResult {
  success: boolean;
  provider: 'google' | 'facebook' | 'email' | 'mock';
  userId?: string;
  email?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
  error?: AuthenticationError;
  fallbackUsed: boolean;
  retryCount: number;
  duration: number;
}

export interface AuthenticationError {
  code: string;
  message: string;
  provider: string;
  timestamp: Date;
  retryable: boolean;
  fallbackAvailable: boolean;
  context?: Record<string, any>;
}

export interface OAuthServiceStatus {
  provider: 'google' | 'facebook';
  available: boolean;
  lastChecked: Date;
  responseTime?: number;
  error?: string;
  rateLimited: boolean;
  nextRetryAt?: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  provider: 'google' | 'facebook' | 'email' | 'mock';
  userId: string;
  email: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt: Date;
  createdAt: Date;
  lastRefreshed?: Date;
}

export interface MockOAuthResponse {
  success: boolean;
  userId: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface CredentialRotationConfig {
  enabled: boolean;
  rotationDays: number;
  warningDays: number;
  autoRotate: boolean;
  notificationChannels: string[];
}

export interface OAuthTestAccount {
  provider: 'google' | 'facebook';
  email: string;
  password: string;
  isActive: boolean;
  lastUsed?: Date;
  createdAt: Date;
  rotationDue?: Date;
  notes?: string;
}

export type AuthenticationStrategy = 'oauth-first' | 'email-first' | 'oauth-only' | 'email-only';

export interface AuthenticationOptions {
  strategy: AuthenticationStrategy;
  timeout: number;
  retryAttempts: number;
  fallbackEnabled: boolean;
  mockMode: boolean;
  headless: boolean;
  traceEnabled: boolean;
} 