import { BaseCommand } from '../core/base-command';
import { CLILogger } from '../utils/logger';
import { spawn } from 'child_process';
import path from 'path';

export class RunCommand extends BaseCommand {
  constructor(logger: CLILogger) {
    super(logger);
  }

  configure(): void {
    this.command
      .name('run')
      .description('Execute test scenarios')
      .argument('<module>', 'Module to test (clientx, staffx, adminx)')
      .argument('[scenario]', 'Specific scenario to run (optional)')
      .option('-h, --headed', 'Run tests in headed mode')
      .option('-d, --debug', 'Run tests in debug mode')
      .option('-b, --browser <browser>', 'Specify browser (chromium, firefox, webkit)')
      .option('-p, --project <project>', 'Run specific project configuration')
      .option('--ui', 'Run tests in UI mode')
      .option('--trace', 'Enable trace collection')
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

      // Validate scenario if provided
      if (scenario && !this.validateScenario(scenario, module)) {
        throw new Error(`Invalid scenario: ${scenario} for module: ${module}`);
      }

      // Build test path
      const testPath = this.buildTestPath(module, scenario);
      
      // Build Playwright command
      const playwrightArgs = this.buildPlaywrightArgs(testPath, options);

      this.logger.info(`Test path: ${testPath}`);
      this.logger.info(`Command: npx playwright test ${playwrightArgs.join(' ')}`);

      // Execute tests
      await this.withSpinner(
        `Executing ${module} ${scenario || 'all'} tests`,
        () => this.runPlaywrightTests(playwrightArgs)
      );

    } catch (error) {
      this.handleError(error as Error, 'TEST_EXECUTION', 'run', [module, scenario || '']);
      process.exit(1);
    }
  }

  private buildTestPath(module: string, scenario?: string): string {
    const basePath = `src/tests/${module}`;
    
    if (scenario) {
      return path.join(basePath, `${scenario}.spec.ts`);
    }
    
    return basePath;
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
          resolve();
        } else {
          reject(new Error(`Tests failed with exit code ${code}`));
        }
      });

      child.on('error', (error) => {
        reject(error);
      });
    });
  }
} 