/**
 * TestX ClientX Authentication Setup
 * Creates authenticated browser states for ClientX testing
 * Following BMAD Method and Playwright best practices
 */

import { test as setup, expect } from '@playwright/test';
import { OAuthAuthenticationService } from '../../../lib/utils/oauth-auth-service';

const authFile = 'playwright/.auth/clientx-user.json';

setup('authenticate as ClientX user', async ({ page }) => {
  const authService = OAuthAuthenticationService.getInstance();
  
  console.log('🔐 Starting ClientX authentication setup...');
  
  try {
    // Attempt authentication with OAuth fallback
    const result = await authService.authenticate(page, {
      strategy: 'oauth-first',
      fallbackEnabled: true,
      traceEnabled: true,
    });

    if (!result.success) {
      throw new Error(`Authentication failed: ${result.error?.message || 'Unknown error'}`);
    }

    console.log(`✅ Authentication successful using ${result.provider} (fallback: ${result.fallbackUsed})`);
    console.log(`📧 Authenticated as: ${result.email}`);
    console.log(`⏱️  Authentication took: ${result.duration}ms`);

    // Verify we're on an authenticated page
    await expect(page).toHaveURL(/.*\/(dashboard|profile|wallet|events).*/);
    
    // Save authentication state
    await page.context().storageState({ path: authFile });
    
    console.log(`💾 Authentication state saved to: ${authFile}`);
    
  } catch (error) {
    console.error('❌ Authentication setup failed:', error);
    throw error;
  }
});

setup('authenticate as ClientX admin', async ({ page }) => {
  const authService = OAuthAuthenticationService.getInstance();
  
  console.log('🔐 Starting ClientX admin authentication setup...');
  
  try {
    // For admin authentication, we'll use fallback method with admin credentials
    // This can be enhanced later to support OAuth admin accounts
    const result = await authService.authenticate(page, {
      strategy: 'email-first',
      fallbackEnabled: true,
      traceEnabled: true,
    });

    if (!result.success) {
      throw new Error(`Admin authentication failed: ${result.error?.message || 'Unknown error'}`);
    }

    console.log(`✅ Admin authentication successful using ${result.provider}`);
    console.log(`📧 Authenticated as admin: ${result.email}`);
    console.log(`⏱️  Authentication took: ${result.duration}ms`);

    // Verify we're on an authenticated page with admin access
    await expect(page).toHaveURL(/.*\/(dashboard|admin|profile).*/);
    
    // Save admin authentication state
    await page.context().storageState({ path: 'playwright/.auth/clientx-admin.json' });
    
    console.log('💾 Admin authentication state saved to: playwright/.auth/clientx-admin.json');
    
  } catch (error) {
    console.error('❌ Admin authentication setup failed:', error);
    throw error;
  }
}); 