import { BaseCommand } from '../core/base-command';
import { CLILogger } from '../utils/logger';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

export class RunCommand extends BaseCommand {
  constructor(logger: CLILogger) {
    super(logger);
  }

  configure(): void {
    this.command
      .name('run')
      .description('Execute test scenarios')
      .argument('<module>', 'Module to test (clientx, staffx, adminx)')
      .argument('[scenario]', 'Specific test file or scenario pattern (optional)')
      .option('-h, --headed', 'Run tests in headed mode (shows browser)')
      .option('-d, --debug', 'Run tests in debug mode')
      .option('-b, --browser <browser>', 'Specify browser (chromium, firefox, webkit)')
      .option('-p, --project <project>', 'Run specific project configuration')
      .option('--ui', 'Run tests in UI mode')
      .option('--trace', 'Enable trace collection')
      .option('--list', 'List available test files for the module')
      .action(async (module: string, scenario?: string, options?: any) => {
        await this.execute(module, scenario, options);
      });
  }

  async execute(module: string, scenario?: string, options: any = {}): Promise<void> {
    try {
      this.logger.header(`Running ${module.toUpperCase()} Tests`);

      // Validate module
      if (!this.validateModule(module)) {
        throw new Error(`Invalid module: ${module}. Valid modules: clientx, staffx, adminx`);
      }

      // Handle list option
      if (options.list) {
        await this.listAvailableTests(module);
        return;
      }

      // Find and validate test files
      const testPath = await this.findTestPath(module, scenario);
      
      // Build Playwright command
      const playwrightArgs = this.buildPlaywrightArgs(testPath, options);

      // Show user-friendly information
      this.showTestInfo(module, scenario, testPath, options);

      // Execute tests
      await this.runPlaywrightTests(playwrightArgs);

    } catch (error) {
      this.handleError(error as Error, 'TEST_EXECUTION', 'run', [module, scenario || '']);
      process.exit(1);
    }
  }

  private async findTestPath(module: string, scenario?: string): Promise<string> {
    const testDir = path.join('src', 'tests', module);
    
    // Check if test directory exists
    if (!fs.existsSync(testDir)) {
      throw new Error(`No tests found for module: ${module}. Run 'testx create ${module}' to create tests.`);
    }

    if (!scenario) {
      // Run all tests in the module
      return testDir;
    }

    // At this point, scenario is guaranteed to be defined
    const scenarioLower = scenario.toLowerCase();

    // Try exact match first
    const exactMatch = path.join(testDir, `${scenario}.spec.ts`);
    if (fs.existsSync(exactMatch)) {
      return exactMatch;
    }

    // Try pattern matching for dynamic test names
    const testFiles = fs.readdirSync(testDir).filter(file => file.endsWith('.spec.ts'));
    
    // Look for files that contain the scenario name
    const matchingFiles = testFiles.filter(file => 
      file.toLowerCase().includes(scenarioLower)
    );

    if (matchingFiles.length === 0) {
      // Show available tests to help user
      this.logger.error(`No test files found matching: ${scenario}`);
      this.logger.info('');
      this.logger.info('Available test files:');
      testFiles.forEach(file => {
        this.logger.info(`  • ${chalk.cyan(file.replace('.spec.ts', ''))}`);
      });
      this.logger.info('');
      this.logger.info(`Run ${chalk.cyan(`testx run ${module} --list`)} to see all available tests`);
      throw new Error(`Test not found: ${scenario}`);
    }

    if (matchingFiles.length === 1) {
      const matchedFile = matchingFiles[0];
      if (matchedFile) {
        return path.join(testDir, matchedFile);
      }
    }

    // Multiple matches - let user choose
    this.logger.info('Multiple matching test files found:');
    matchingFiles.forEach((file, index) => {
      this.logger.info(`  ${index + 1}. ${chalk.cyan(file.replace('.spec.ts', ''))}`);
    });
    throw new Error(`Multiple tests match "${scenario}". Please be more specific.`);
  }

  private async listAvailableTests(module: string): Promise<void> {
    const testDir = path.join('src', 'tests', module);
    
    if (!fs.existsSync(testDir)) {
      this.logger.info(`No tests found for ${module.toUpperCase()}.`);
      this.logger.info(`Run ${chalk.cyan(`testx create ${module}`)} to create your first test.`);
      return;
    }

    const testFiles = fs.readdirSync(testDir).filter(file => file.endsWith('.spec.ts'));
    
    if (testFiles.length === 0) {
      this.logger.info(`No test files found in ${module.toUpperCase()}.`);
      this.logger.info(`Run ${chalk.cyan(`testx create ${module}`)} to create your first test.`);
      return;
    }

    this.logger.info(`Available tests for ${chalk.cyan(module.toUpperCase())}:`);
    this.logger.info('');
    
    testFiles.forEach(file => {
      const testName = file.replace('.spec.ts', '');
      const filePath = path.join(testDir, file);
      const stats = fs.statSync(filePath);
      const created = stats.birthtime.toLocaleDateString();
      
      this.logger.info(`  📄 ${chalk.cyan(testName)}`);
      this.logger.info(`     Created: ${created}`);
      this.logger.info(`     Run: ${chalk.gray(`testx run ${module} ${testName}`)}`);
      this.logger.info('');
    });
  }

  private showTestInfo(module: string, scenario: string | undefined, testPath: string, options: any): void {
    this.logger.info('');
    this.logger.info(chalk.bold('🎯 Test Execution Details:'));
    this.logger.info(`   Module: ${chalk.cyan(module.toUpperCase())}`);
    this.logger.info(`   Target: ${chalk.cyan(scenario || 'All tests')}`);
    this.logger.info(`   Path: ${chalk.gray(testPath)}`);
    
    if (options.headed) {
      this.logger.info(`   Mode: ${chalk.green('Headed (browser visible)')}`);
    } else {
      this.logger.info(`   Mode: ${chalk.yellow('Headless (background)')}`);
    }
    
    if (options.browser) {
      this.logger.info(`   Browser: ${chalk.cyan(options.browser)}`);
    }
    
    this.logger.info('');
    this.logger.info(chalk.bold('🚀 Starting Playwright...'));
    
    if (!options.headed) {
      this.logger.info(chalk.gray('💡 Tip: Add --headed to see the browser in action'));
    }
    
    this.logger.info('');
  }

  private buildPlaywrightArgs(testPath: string, options: any): string[] {
    const args: string[] = [testPath];

    // Add browser option
    if (options.browser) {
      args.push('--project', options.browser);
    }

    // Add project option
    if (options.project) {
      args.push('--project', options.project);
    }

    // Add headed mode
    if (options.headed) {
      args.push('--headed');
    }

    // Add debug mode
    if (options.debug) {
      args.push('--debug');
    }

    // Add UI mode
    if (options.ui) {
      args.push('--ui');
    }

    // Add trace collection
    if (options.trace) {
      args.push('--trace', 'on');
    }

    return args;
  }

  private async runPlaywrightTests(args: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const child = spawn('npx', ['playwright', 'test', ...args], {
        stdio: 'inherit',
        shell: true
      });

      child.on('close', (code) => {
        if (code === 0) {
          this.logger.info('');
          this.logger.success('✅ Tests completed successfully!');
          this.logger.info('');
          this.logger.info('📊 View detailed results:');
          this.logger.info(`   ${chalk.cyan('testx status')}                    Quick test summary`);
          this.logger.info(`   ${chalk.cyan('npx playwright show-report')}     Open HTML report`);
          this.logger.info(`   ${chalk.cyan('npx playwright show-trace')}      View test traces`);
          resolve();
        } else {
          this.logger.info('');
          this.logger.error('❌ Tests failed or were interrupted');
          this.logger.info('');
          this.logger.info('🔍 Troubleshooting:');
          this.logger.info(`   ${chalk.cyan('testx status --global')}          Check system health`);
          this.logger.info(`   ${chalk.cyan('npx playwright show-report')}     View failure details`);
          this.logger.info(`   ${chalk.cyan('testx run --headed')}             Run with visible browser`);
          reject(new Error(`Tests failed with exit code ${code}`));
        }
      });

      child.on('error', (error) => {
        this.logger.error('Failed to start Playwright tests');
        reject(error);
      });
    });
  }
} 