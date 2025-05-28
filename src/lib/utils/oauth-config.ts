/**
 * TestX OAuth Configuration Manager
 * Handles OAuth provider configuration with comprehensive fallback strategies
 */

import * as dotenv from 'dotenv';
import { OAuthConfig, OAuthProvider, CredentialRotationConfig } from './oauth-types';

// Load environment variables
dotenv.config();

export class OAuthConfigManager {
  private static instance: OAuthConfigManager;
  private config: OAuthConfig;

  private constructor() {
    this.config = this.loadConfiguration();
  }

  public static getInstance(): OAuthConfigManager {
    if (!OAuthConfigManager.instance) {
      OAuthConfigManager.instance = new OAuthConfigManager();
    }
    return OAuthConfigManager.instance;
  }

  private loadConfiguration(): OAuthConfig {
    // Validate required environment variables
    this.validateEnvironmentVariables();

    const googleProvider: OAuthProvider = {
      name: 'google',
      displayName: 'Google',
      clientId: process.env['GOOGLE_CLIENT_ID'] || '',
      scopes: ['openid', 'email', 'profile'],
      authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenUrl: 'https://oauth2.googleapis.com/token',
      userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
    };

    if (process.env['GOOGLE_CLIENT_SECRET']) {
      googleProvider.clientSecret = process.env['GOOGLE_CLIENT_SECRET'];
    }

    const facebookProvider: OAuthProvider = {
      name: 'facebook',
      displayName: 'Facebook',
      clientId: process.env['FACEBOOK_APP_ID'] || '',
      scopes: ['email', 'public_profile'],
      authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
      tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',
      userInfoUrl: 'https://graph.facebook.com/me?fields=id,name,email',
    };

    if (process.env['FACEBOOK_APP_SECRET']) {
      facebookProvider.clientSecret = process.env['FACEBOOK_APP_SECRET'];
    }

    return {
      providers: {
        google: googleProvider,
        facebook: facebookProvider,
      },
      fallback: {
        enabled: process.env['OAUTH_FALLBACK_ENABLED'] === 'true',
        email: process.env['FALLBACK_TEST_EMAIL'] || '',
        password: process.env['FALLBACK_TEST_PASSWORD'] || '',
      },
      timeout: parseInt(process.env['OAUTH_TIMEOUT_MS'] || '30000'),
      retryAttempts: parseInt(process.env['OAUTH_RETRY_ATTEMPTS'] || '3'),
      mockMode: process.env['OAUTH_MOCK_MODE'] === 'true',
    };
  }

  private validateEnvironmentVariables(): void {
    const requiredVars = [
      'ANYKROWD_BASE_URL',
      'ANYKROWD_TENANT',
    ];

    const missingVars = requiredVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(', ')}\n` +
        'Please copy .env.example to .env and fill in the required values.'
      );
    }

    // Warn about missing OAuth credentials (not required for fallback testing)
    const oauthVars = [
      'GOOGLE_TEST_EMAIL',
      'GOOGLE_TEST_PASSWORD',
      'FACEBOOK_TEST_EMAIL',
      'FACEBOOK_TEST_PASSWORD',
    ];

    const missingOAuthVars = oauthVars.filter(varName => !process.env[varName]);

    if (missingOAuthVars.length > 0) {
      console.warn(
        `Warning: Missing OAuth credentials: ${missingOAuthVars.join(', ')}\n` +
        'OAuth testing will be limited. Fallback authentication will be used.'
      );
    }

    // In test environment or mock mode, allow running without credentials
    const isTestEnv = process.env['NODE_ENV'] === 'test' || process.env['CI'] === 'true';
    const isMockMode = process.env['OAUTH_MOCK_MODE'] === 'true';
    
    if (isTestEnv || isMockMode) {
      console.log('Running in test/mock mode - OAuth credential validation relaxed');
      return;
    }

    // Ensure fallback credentials are available if OAuth is incomplete (only in non-test environments)
    if ((!process.env['GOOGLE_TEST_EMAIL'] || !process.env['FACEBOOK_TEST_EMAIL']) &&
        (!process.env['FALLBACK_TEST_EMAIL'] || !process.env['FALLBACK_TEST_PASSWORD'])) {
      throw new Error(
        'Either OAuth credentials or fallback email credentials must be provided.\n' +
        'Please configure FALLBACK_TEST_EMAIL and FALLBACK_TEST_PASSWORD in your .env file.'
      );
    }
  }

  public getConfig(): OAuthConfig {
    return { ...this.config };
  }

  public getProvider(name: 'google' | 'facebook'): OAuthProvider {
    return { ...this.config.providers[name] };
  }

  public isFallbackEnabled(): boolean {
    return this.config.fallback.enabled;
  }

  public isMockMode(): boolean {
    return this.config.mockMode;
  }

  public getTimeout(): number {
    return this.config.timeout;
  }

  public getRetryAttempts(): number {
    return this.config.retryAttempts;
  }

  public getFallbackCredentials(): { email: string; password: string } {
    return {
      email: this.config.fallback.email,
      password: this.config.fallback.password,
    };
  }

  public getTestCredentials(provider: 'google' | 'facebook'): { email: string; password: string } {
    switch (provider) {
      case 'google':
        return {
          email: process.env['GOOGLE_TEST_EMAIL'] || '',
          password: process.env['GOOGLE_TEST_PASSWORD'] || '',
        };
      case 'facebook':
        return {
          email: process.env['FACEBOOK_TEST_EMAIL'] || '',
          password: process.env['FACEBOOK_TEST_PASSWORD'] || '',
        };
      default:
        throw new Error(`Unknown OAuth provider: ${provider}`);
    }
  }

  public getCredentialRotationConfig(): CredentialRotationConfig {
    return {
      enabled: process.env['CREDENTIAL_ROTATION_ENABLED'] === 'true',
      rotationDays: parseInt(process.env['CREDENTIAL_ROTATION_DAYS'] || '30'),
      warningDays: parseInt(process.env['CREDENTIAL_ROTATION_WARNING_DAYS'] || '7'),
      autoRotate: process.env['CREDENTIAL_AUTO_ROTATE'] === 'true',
      notificationChannels: (process.env['CREDENTIAL_ROTATION_NOTIFICATIONS'] || 'slack').split(','),
    };
  }

  public validateProviderCredentials(provider: 'google' | 'facebook'): boolean {
    const credentials = this.getTestCredentials(provider);
    return !!(credentials.email && credentials.password);
  }

  public getAvailableProviders(): ('google' | 'facebook')[] {
    const providers: ('google' | 'facebook')[] = [];
    
    if (this.validateProviderCredentials('google')) {
      providers.push('google');
    }
    
    if (this.validateProviderCredentials('facebook')) {
      providers.push('facebook');
    }
    
    return providers;
  }

  public refreshConfiguration(): void {
    this.config = this.loadConfiguration();
  }
} 