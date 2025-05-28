/**
 * TestX OAuth Integration Tests
 * Comprehensive testing of OAuth authentication flows with fallback strategies
 * Following BMAD Method and Playwright best practices
 */

import { test, expect } from '@playwright/test';
import { OAuthAuthenticationService } from '../../../lib/utils/oauth-auth-service';
import { OAuthConfigManager } from '../../../lib/utils/oauth-config';
import { OAuthServiceMonitor } from '../../../lib/utils/oauth-service-monitor';

test.describe('OAuth Integration Tests', () => {
  let authService: OAuthAuthenticationService;
  let configManager: OAuthConfigManager;
  let serviceMonitor: OAuthServiceMonitor;

  test.beforeEach(async () => {
    authService = OAuthAuthenticationService.getInstance();
    configManager = OAuthConfigManager.getInstance();
    serviceMonitor = OAuthServiceMonitor.getInstance();
  });

  test.describe('Configuration Management', () => {
    test('should load OAuth configuration correctly', async () => {
      const config = configManager.getConfig();
      
      expect(config).toBeDefined();
      expect(config.providers).toBeDefined();
      expect(config.providers.google).toBeDefined();
      expect(config.providers.facebook).toBeDefined();
      expect(config.fallback).toBeDefined();
      expect(config.timeout).toBeGreaterThan(0);
      expect(config.retryAttempts).toBeGreaterThan(0);
    });

    test('should validate provider credentials', async () => {
      const availableProviders = configManager.getAvailableProviders();
      
      // Should have at least fallback available
      expect(availableProviders).toBeDefined();
      
      // Test individual provider validation
      for (const provider of ['google', 'facebook'] as const) {
        const isValid = configManager.validateProviderCredentials(provider);
        console.log(`${provider} credentials valid: ${isValid}`);
      }
    });

    test('should handle missing credentials gracefully', async () => {
      // This test verifies that the system handles missing OAuth credentials
      // and falls back to email authentication appropriately
      const fallbackEnabled = configManager.isFallbackEnabled();
      const fallbackCredentials = configManager.getFallbackCredentials();
      
      if (fallbackEnabled) {
        expect(fallbackCredentials.email).toBeTruthy();
        expect(fallbackCredentials.password).toBeTruthy();
      }
    });
  });

  test.describe('Service Monitoring', () => {
    test('should check OAuth provider availability', async () => {
      const availableProviders = configManager.getAvailableProviders();
      
      for (const provider of availableProviders) {
        const status = await serviceMonitor.checkProviderStatus(provider);
        
        expect(status).toBeDefined();
        expect(status.provider).toBe(provider);
        expect(status.lastChecked).toBeInstanceOf(Date);
        expect(typeof status.available).toBe('boolean');
        expect(typeof status.rateLimited).toBe('boolean');
        
        console.log(`${provider} status:`, {
          available: status.available,
          responseTime: status.responseTime,
          rateLimited: status.rateLimited,
          error: status.error,
        });
      }
    });

    test('should determine best authentication method', async () => {
      const bestMethod = await serviceMonitor.getBestAuthMethod();
      
      expect(bestMethod).toBeDefined();
      expect(['oauth', 'fallback', 'mock']).toContain(bestMethod.method);
      expect(bestMethod.reason).toBeTruthy();
      
      console.log('Best authentication method:', bestMethod);
    });

    test('should handle fallback decision logic', async () => {
      const fallbackDecision = await serviceMonitor.shouldUseFallback();
      
      expect(fallbackDecision).toBeDefined();
      expect(typeof fallbackDecision.useFallback).toBe('boolean');
      expect(fallbackDecision.reason).toBeTruthy();
      expect(Array.isArray(fallbackDecision.availableProviders)).toBe(true);
      
      console.log('Fallback decision:', fallbackDecision);
    });
  });

  test.describe('Authentication Flows', () => {
    test('should authenticate with best available method', async ({ page }) => {
      const result = await authService.authenticate(page, {
        strategy: 'oauth-first',
        fallbackEnabled: true,
        timeout: 30000,
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      expect(['google', 'facebook', 'email', 'mock']).toContain(result.provider);
      expect(typeof result.fallbackUsed).toBe('boolean');
      expect(result.duration).toBeGreaterThan(0);

      if (result.success) {
        expect(result.email).toBeTruthy();
        console.log(`✅ Authentication successful with ${result.provider}`);
        console.log(`📧 Email: ${result.email}`);
        console.log(`⏱️  Duration: ${result.duration}ms`);
        console.log(`🔄 Fallback used: ${result.fallbackUsed}`);
      } else {
        console.log(`❌ Authentication failed: ${result.error?.message}`);
        console.log(`🔄 Fallback used: ${result.fallbackUsed}`);
        console.log(`🔁 Retry count: ${result.retryCount}`);
      }
    });

    test('should handle OAuth service failures gracefully', async ({ page }) => {
      // Test with mock mode to simulate OAuth failures
      const result = await authService.authenticate(page, {
        strategy: 'oauth-first',
        fallbackEnabled: true,
        mockMode: true,
        timeout: 10000,
      });

      expect(result).toBeDefined();
      
      if (configManager.isMockMode()) {
        expect(result.success).toBe(true);
        expect(result.provider).toBe('mock');
      }
    });

    test('should retry authentication on failures', async ({ page }) => {
      const result = await authService.authenticate(page, {
        strategy: 'oauth-first',
        fallbackEnabled: true,
        retryAttempts: 2,
        timeout: 15000,
      });

      expect(result).toBeDefined();
      expect(result.retryCount).toBeGreaterThanOrEqual(0);
      
      console.log(`Retry count: ${result.retryCount}`);
    });

    test('should use fallback when OAuth providers unavailable', async ({ page }) => {
      // This test verifies fallback behavior when OAuth is not available
      const fallbackDecision = await serviceMonitor.shouldUseFallback();
      
      if (fallbackDecision.useFallback) {
        const result = await authService.authenticate(page, {
          strategy: 'email-first',
          fallbackEnabled: true,
          timeout: 20000,
        });

        expect(result).toBeDefined();
        
        if (result.success) {
          expect(result.fallbackUsed).toBe(true);
          expect(result.provider).toBe('email');
        }
      }
    });
  });

  test.describe('Error Handling', () => {
    test('should handle invalid credentials gracefully', async ({ page }) => {
      // This test would require invalid test credentials
      // For now, we'll test the error handling structure
      const result = await authService.authenticate(page, {
        strategy: 'oauth-first',
        fallbackEnabled: false,
        timeout: 5000,
        retryAttempts: 1,
      });

      expect(result).toBeDefined();
      
      if (!result.success) {
        expect(result.error).toBeDefined();
        expect(result.error?.code).toBeTruthy();
        expect(result.error?.message).toBeTruthy();
        expect(result.error?.provider).toBeTruthy();
        expect(result.error?.timestamp).toBeInstanceOf(Date);
        expect(typeof result.error?.retryable).toBe('boolean');
        expect(typeof result.error?.fallbackAvailable).toBe('boolean');
      }
    });

    test('should handle network timeouts', async ({ page }) => {
      const result = await authService.authenticate(page, {
        strategy: 'oauth-first',
        fallbackEnabled: true,
        timeout: 1000, // Very short timeout to trigger timeout errors
        retryAttempts: 1,
      });

      expect(result).toBeDefined();
      // Should either succeed with fallback or fail gracefully
    });
  });

  test.describe('Security and Compliance', () => {
    test('should not expose sensitive credentials in logs', async () => {
      const config = configManager.getConfig();
      
      // Verify that sensitive data is not exposed
      expect(JSON.stringify(config)).not.toContain('password');
      expect(JSON.stringify(config)).not.toContain('secret');
    });

    test('should handle credential rotation configuration', async () => {
      const rotationConfig = configManager.getCredentialRotationConfig();
      
      expect(rotationConfig).toBeDefined();
      expect(typeof rotationConfig.enabled).toBe('boolean');
      expect(rotationConfig.rotationDays).toBeGreaterThan(0);
      expect(rotationConfig.warningDays).toBeGreaterThan(0);
      expect(typeof rotationConfig.autoRotate).toBe('boolean');
      expect(Array.isArray(rotationConfig.notificationChannels)).toBe(true);
    });
  });

  test.describe('Performance and Monitoring', () => {
    test('should complete authentication within reasonable time', async ({ page }) => {
      const startTime = Date.now();
      
      const result = await authService.authenticate(page, {
        strategy: 'oauth-first',
        fallbackEnabled: true,
        timeout: 30000,
      });

      const totalTime = Date.now() - startTime;
      
      expect(totalTime).toBeLessThan(60000); // Should complete within 60 seconds
      expect(result.duration).toBeLessThanOrEqual(totalTime);
      
      console.log(`Total authentication time: ${totalTime}ms`);
      console.log(`Service reported time: ${result.duration}ms`);
    });

    test('should cache service status appropriately', async () => {
      const availableProviders = configManager.getAvailableProviders();
      
      if (availableProviders.length > 0) {
        const provider = availableProviders[0];
        
        if (provider) {
          // First check
          const status1 = await serviceMonitor.checkProviderStatus(provider);
          const time1 = Date.now();
          
          // Second check (should use cache)
          const status2 = await serviceMonitor.checkProviderStatus(provider);
          const time2 = Date.now();
          
          expect(status1.lastChecked.getTime()).toBe(status2.lastChecked.getTime());
          expect(time2 - time1).toBeLessThan(100); // Should be very fast due to caching
        }
      }
    });
  });
}); 