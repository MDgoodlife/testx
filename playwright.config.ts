import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * TestX MVP Playwright Configuration
 * Following Playwright best practices with BMAD Method enhancements
 */
export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  workers: process.env['CI'] ? 1 : 3,
  
  // AI-Friendly Error Reporting
  reporter: [
    ['html', { outputFolder: 'reports/html' }],
    ['json', { outputFile: 'reports/json/results.json' }],
    ['line'], // CLI output for AI debugging
    ['junit', { outputFile: 'reports/junit/results.xml' }],
  ],
  
  use: {
    // Base URL from environment or default to krowd-dev
    baseURL: process.env['ANYKROWD_BASE_URL'] || 'https://krowd-dev.anykrowd.dev',
    
    // Enhanced debugging and error capture
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // Timeouts
    actionTimeout: 30000,
    navigationTimeout: 30000,
    
    // Browser settings
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    
    // Additional context options
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9',
    },
  },

  projects: [
    // Setup project for authentication
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      teardown: 'cleanup',
    },

    // Cleanup project
    {
      name: 'cleanup',
      testMatch: /.*\.cleanup\.ts/,
    },

    // ClientX testing with authenticated states
    {
      name: 'clientx-chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/clientx-user.json',
      },
      dependencies: ['setup'],
      testDir: './src/tests/clientx',
    },

    {
      name: 'clientx-firefox',
      use: { 
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/clientx-user.json',
      },
      dependencies: ['setup'],
      testDir: './src/tests/clientx',
    },

    {
      name: 'clientx-webkit',
      use: { 
        ...devices['Desktop Safari'],
        storageState: 'playwright/.auth/clientx-user.json',
      },
      dependencies: ['setup'],
      testDir: './src/tests/clientx',
    },

    // Mobile testing
    {
      name: 'clientx-mobile-chrome',
      use: { 
        ...devices['Pixel 5'],
        storageState: 'playwright/.auth/clientx-user.json',
      },
      dependencies: ['setup'],
      testDir: './src/tests/clientx',
    },

    {
      name: 'clientx-mobile-safari',
      use: { 
        ...devices['iPhone 13'],
        storageState: 'playwright/.auth/clientx-user.json',
      },
      dependencies: ['setup'],
      testDir: './src/tests/clientx',
    },

    // Admin testing (future)
    {
      name: 'clientx-admin',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/clientx-admin.json',
      },
      dependencies: ['setup'],
      testDir: './src/tests/clientx',
    },

    // Guest/unauthenticated testing
    {
      name: 'clientx-guest',
      use: { 
        ...devices['Desktop Chrome'],
        // No storageState for guest testing
      },
      testDir: './src/tests/clientx',
    },

    // Future: StaffX and AdminX projects will be added here
  ],

  // Global setup and teardown
  globalSetup: require.resolve('./src/lib/playwright/global-setup.ts'),
  globalTeardown: require.resolve('./src/lib/playwright/global-teardown.ts'),

  // Output directories
  outputDir: 'reports/test-results',
  
  // Expect configuration
  expect: {
    // Global timeout for expect assertions
    timeout: 10000,
    toHaveScreenshot: {
      // Screenshot comparison settings
      threshold: 0.2,
    },
  },

  // Web server configuration (if needed for local development)
  // webServer: {
  //   command: 'npm run start:dev',
  //   port: 3000,
  //   reuseExistingServer: !process.env.CI,
  // },
}); 