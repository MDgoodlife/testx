/**
 * TestX Global Setup
 * Initializes OAuth configuration and validates environment before running tests
 */

import { FullConfig } from '@playwright/test';
import { OAuthConfigManager } from '../utils/oauth-config';
import { OAuthServiceMonitor } from '../utils/oauth-service-monitor';

async function globalSetup(_config: FullConfig) {
  console.log('🚀 TestX Global Setup - Initializing OAuth Integration...');
  
  try {
    // Initialize OAuth configuration
    const configManager = OAuthConfigManager.getInstance();
    const serviceMonitor = OAuthServiceMonitor.getInstance();
    
    console.log('📋 Validating OAuth configuration...');
    const oauthConfig = configManager.getConfig();
    
    // Log configuration status (without sensitive data)
    console.log(`✅ OAuth timeout: ${oauthConfig.timeout}ms`);
    console.log(`✅ OAuth retry attempts: ${oauthConfig.retryAttempts}`);
    console.log(`✅ Fallback enabled: ${oauthConfig.fallback.enabled}`);
    console.log(`✅ Mock mode: ${oauthConfig.mockMode}`);
    
    // Check available providers
    const availableProviders = configManager.getAvailableProviders();
    console.log(`✅ Available OAuth providers: ${availableProviders.join(', ') || 'none'}`);
    
    if (availableProviders.length === 0 && !oauthConfig.fallback.enabled) {
      console.warn('⚠️  No OAuth providers available and fallback is disabled');
    }
    
    // Check OAuth service availability (non-blocking)
    console.log('🔍 Checking OAuth service availability...');
    try {
      const bestMethod = await serviceMonitor.getBestAuthMethod();
      console.log(`✅ Best authentication method: ${bestMethod.method} (${bestMethod.reason})`);
    } catch (error) {
      console.warn('⚠️  OAuth service check failed:', error instanceof Error ? error.message : 'Unknown error');
    }
    
    // Ensure auth directory exists
    const fs = require('fs-extra');
    await fs.ensureDir('playwright/.auth');
    console.log('✅ Authentication state directory ready');
    
    console.log('🎯 TestX Global Setup completed successfully');
    
  } catch (error) {
    console.error('❌ TestX Global Setup failed:', error);
    throw error;
  }
}

export default globalSetup; 