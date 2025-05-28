/**
 * TestX Global Teardown
 * Cleans up OAuth resources and logs summary information
 */

import { FullConfig } from '@playwright/test';
import { OAuthServiceMonitor } from '../utils/oauth-service-monitor';

async function globalTeardown(_config: FullConfig) {
  console.log('🧹 TestX Global Teardown - Cleaning up OAuth Integration...');
  
  try {
    // Clear OAuth service monitor cache
    const serviceMonitor = OAuthServiceMonitor.getInstance();
    serviceMonitor.clearCache();
    console.log('✅ OAuth service monitor cache cleared');
    
    // Log summary information
    console.log('📊 TestX OAuth Integration Summary:');
    console.log('   - OAuth service cache cleared');
    console.log('   - Authentication states preserved for debugging');
    
    console.log('🎯 TestX Global Teardown completed successfully');
    
  } catch (error) {
    console.error('❌ TestX Global Teardown failed:', error);
    // Don't throw error in teardown to avoid masking test failures
  }
}

export default globalTeardown; 