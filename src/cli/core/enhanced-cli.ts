import chalk from 'chalk';
import { CLILogger } from '../utils/logger';
import { InteractivePrompter, TestConfig, ModuleType, ScenarioType, RecordingMethod } from './interactive-prompter';
import fs from 'fs';
import path from 'path';

export interface EnhancedCLIConfig {
  interactive: boolean;
  recordingEnabled: boolean;
  analysisEnabled: boolean;
  guidanceLevel: 'minimal' | 'standard' | 'verbose';
}

export class EnhancedCLI {
  private logger: CLILogger;
  private prompter: InteractivePrompter;

  constructor(logger: CLILogger, _config: Partial<EnhancedCLIConfig> = {}) {
    this.logger = logger;
    this.prompter = new InteractivePrompter(logger);
    
    // Config will be used in Phase 2 and 3 for recording and analysis features
    // For now, we just validate the interface but don't store it
  }

  async createTest(partialConfig?: Partial<TestConfig>): Promise<void> {
    try {
      // Step 1: Gather complete test configuration through interactive prompts
      const config = await this.prompter.gatherTestConfig(partialConfig);
      
      // Step 2: Show configuration summary
      await this.showConfigurationSummary(config);
      
      // Step 3: Handle different creation methods
      switch (config.recordingMethod) {
        case 'demonstrate':
          await this.handleDemonstrationMethod(config);
          break;
        case 'template':
          await this.handleTemplateMethod(config);
          break;
        case 'manual':
          await this.handleManualMethod(config);
          break;
        default:
          throw new Error(`Unknown recording method: ${config.recordingMethod}`);
      }

    } catch (error) {
      this.logger.error('Failed to create test:');
      this.logger.error((error as Error).message);
      throw error;
    }
  }

  private async showConfigurationSummary(config: TestConfig): Promise<void> {
    this.logger.info('');
    this.logger.info(chalk.bold.green('✅ Test Configuration:'));
    this.logger.info(`   Module: ${chalk.cyan(config.module?.toUpperCase())}`);
    this.logger.info(`   Scenario: ${chalk.cyan(this.getScenarioTitle(config.module!, config.scenarioType!))}`);
    this.logger.info(`   URL: ${chalk.cyan(config.url)}`);
    this.logger.info(`   Method: ${chalk.cyan(this.getMethodTitle(config.recordingMethod!))}`);
    this.logger.info('');
  }

  private async handleDemonstrationMethod(config: TestConfig): Promise<void> {
    this.logger.info(chalk.bold.blue('🎬 Recording Setup'));
    this.logger.info('');
    
    // Show recording instructions
    this.showRecordingInstructions();
    
    // For Phase 1, we'll fall back to template creation with a message
    this.logger.info(chalk.yellow('📝 Note: Video recording will be available in Phase 2.'));
    this.logger.info(chalk.yellow('   For now, I\'ll create a template-based test for you.'));
    this.logger.info('');
    
    // Create template-based test
    await this.createTemplateTest(config);
  }

  private async handleTemplateMethod(config: TestConfig): Promise<void> {
    this.logger.info(chalk.bold.blue('📋 Template Creation'));
    this.logger.info('');
    
    await this.createTemplateTest(config);
  }

  private async handleManualMethod(config: TestConfig): Promise<void> {
    this.logger.info(chalk.bold.blue('✏️  Manual Creation'));
    this.logger.info('');
    
    this.logger.info('I\'ll create a basic test structure for you to customize:');
    this.logger.info('');
    
    await this.createTemplateTest(config);
    
    this.logger.info('');
    this.logger.info(chalk.yellow('💡 Next steps:'));
    this.logger.info('   1. Open the generated test file');
    this.logger.info('   2. Customize the test steps for your specific scenario');
    this.logger.info('   3. Add assertions and error handling');
    this.logger.info('   4. Run the test to validate it works');
  }

  private async createTemplateTest(config: TestConfig): Promise<void> {
    // Generate a descriptive test name based on the configuration
    const testName = this.generateTestName(config);
    
    this.logger.info(`Creating test: ${chalk.cyan(testName)}`);
    
    // Create test directly without circular dependency
    await this.createScenario(config.module!, testName, config);
    
    this.logger.info('');
    this.logger.success('🎉 Test created successfully!');
    this.logger.info('');
    
    // Show next steps
    this.showNextSteps(config, testName);
  }

  private async createScenario(module: string, name: string, config: TestConfig): Promise<void> {
    const scenarioName = name.toLowerCase();
    const testDir = path.join('src', 'tests', module);
    const testFile = path.join(testDir, `${scenarioName}.spec.ts`);

    // Ensure directory exists
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }

    // Generate test content
    const testContent = this.generateTestTemplate(module, scenarioName, config);

    fs.writeFileSync(testFile, testContent);
    this.logger.info(`Created: ${testFile}`);
  }

  private generateTestTemplate(module: string, scenarioName: string, config: TestConfig): string {
    const className = this.toPascalCase(scenarioName);
    const moduleUpper = module.toUpperCase();
    const url = config.url || 'https://example.com';

    return `import { test, expect } from '@playwright/test';

test.describe('${moduleUpper} - ${className}', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the target URL
    await page.goto('${url}');
  });

  test('should load ${scenarioName} page', async ({ page }) => {
    await expect(page).toHaveTitle(/.*${className}.*/);
  });

  test('should perform basic ${scenarioName} actions', async ({ page }) => {
    // TODO: Implement test steps for ${config.scenarioType} scenario
    // This test was generated from interactive CLI
    
    // Example assertions:
    // await expect(page.locator('h1')).toBeVisible();
    // await page.click('[data-testid="action-button"]');
    // await expect(page.locator('.success-message')).toBeVisible();
  });

  test('should handle ${scenarioName} errors gracefully', async ({ page }) => {
    // TODO: Implement error handling tests
    // Test error scenarios and recovery
  });
});
`;
  }

  private showRecordingInstructions(): void {
    this.logger.info(chalk.bold('📋 Recording Instructions:'));
    this.logger.info('   1. I\'ll open the browser to your target URL');
    this.logger.info('   2. Demonstrate the complete flow step by step');
    this.logger.info('   3. Include any error scenarios you want to test');
    this.logger.info('   4. Speak aloud what you\'re doing (optional but helpful)');
    this.logger.info('');
    this.logger.info(chalk.bold('⚠️  Important Notes:'));
    this.logger.info('   • Keep actions clear and deliberate');
    this.logger.info('   • Wait for pages to fully load before proceeding');
    this.logger.info('   • Don\'t rush - accuracy is more important than speed');
    this.logger.info('   • I\'ll capture everything including error handling');
    this.logger.info('');
  }

  private showNextSteps(config: TestConfig, testName: string): void {
    const testPath = `src/tests/${config.module}/${testName}.spec.ts`;
    
    this.logger.info(chalk.bold('🎯 What\'s next?'));
    this.logger.info(`   📄 Test file: ${chalk.cyan(testPath)}`);
    this.logger.info('');
    this.logger.info('Available actions:');
    this.logger.info(`   ${chalk.green('testx run ' + config.module + ' ' + testName)}     Run this test`);
    this.logger.info(`   ${chalk.blue('testx create')}                    Create another test`);
    this.logger.info(`   ${chalk.yellow('testx status --global')}           Check system health`);
    this.logger.info('');
    
    if (config.recordingMethod === 'demonstrate') {
      this.logger.info(chalk.blue('🔮 Coming in Phase 2:'));
      this.logger.info('   • Screen recording with countdown');
      this.logger.info('   • AI-powered action detection');
      this.logger.info('   • Automatic test generation from demonstrations');
    }
  }

  private generateTestName(config: TestConfig): string {
    const scenario = config.scenarioType || 'custom';
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    
    return `${scenario}-flow-${timestamp}`;
  }

  private getScenarioTitle(_module: ModuleType, scenarioType: ScenarioType): string {
    const scenarioTitles: Record<ScenarioType, string> = {
      auth: 'Authentication Flow',
      wallet: 'Wallet Operations',
      dashboard: 'Dashboard Navigation',
      custom: 'Custom Workflow',
      pos: 'POS Operations',
      scanning: 'Ticket Scanning',
      users: 'User Management',
      analytics: 'Analytics & Reporting',
      config: 'System Configuration'
    };
    
    return scenarioTitles[scenarioType] || scenarioType;
  }

  private getMethodTitle(method: RecordingMethod): string {
    const methodTitles: Record<RecordingMethod, string> = {
      demonstrate: 'Record Demonstration',
      template: 'Use Template',
      manual: 'Manual Creation'
    };
    
    return methodTitles[method] || method;
  }

  private toPascalCase(str: string): string {
    return str
      .split(/[-_\s]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }
} 