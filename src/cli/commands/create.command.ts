import { BaseCommand } from '../core/base-command';
import { CLILogger } from '../utils/logger';
import { EnhancedCLI } from '../core/enhanced-cli';
import { TestConfig } from '../core/interactive-prompter';
import fs from 'fs';
import path from 'path';

export class CreateCommand extends BaseCommand {
  private enhancedCLI: EnhancedCLI;

  constructor(logger: CLILogger) {
    super(logger);
    this.enhancedCLI = new EnhancedCLI(logger);
  }

  configure(): void {
    this.command
      .name('create')
      .description('Create new test scenarios and templates')
      .argument('[type]', 'Type to create (scenario, page, config) OR module (clientx, staffx, adminx) for interactive mode')
      .argument('[module]', 'Module (clientx, staffx, adminx) OR scenario type for enhanced CLI')
      .argument('[name]', 'Name of the item to create - optional in interactive mode')
      .option('-t, --template <template>', 'Template to use')
      .option('-f, --force', 'Overwrite existing files')
      .option('--url <url>', 'Target URL for testing')
      .option('--interactive', 'Force interactive mode (default when no arguments provided)')
      .option('--traditional', 'Force traditional CLI mode')
      .action(async (type?: string, module?: string, name?: string, options?: any) => {
        await this.executeEnhanced(type, module, name, options);
      });
  }

  async executeEnhanced(type?: string, module?: string, name?: string, options: any = {}): Promise<void> {
    try {
      // Determine if we should use interactive mode
      const useInteractive = this.shouldUseInteractiveMode(type, module, name, options);

      if (useInteractive) {
        // Use enhanced interactive CLI
        await this.executeInteractive(type, module, name, options);
      } else {
        // Use traditional CLI mode
        await this.executeTraditional(type!, module!, name, options);
      }

    } catch (error) {
      this.handleError(error as Error, 'COMMAND_EXECUTION', 'create', [type || '', module || '', name || '']);
      process.exit(1);
    }
  }

  private shouldUseInteractiveMode(type?: string, module?: string, _name?: string, options: any = {}): boolean {
    // Force traditional mode if explicitly requested
    if (options.traditional) {
      return false;
    }
    
    // Force interactive mode if explicitly requested
    if (options.interactive) {
      return true;
    }
    
    // Check if this looks like the new enhanced CLI pattern: testx create [module] [scenario]
    const validModules = ['clientx', 'staffx', 'adminx'];
    const validScenarios = ['auth', 'wallet', 'dashboard', 'custom', 'pos', 'scanning', 'users', 'analytics', 'config'];
    
    if (type && validModules.includes(type.toLowerCase()) && (!module || validScenarios.includes(module.toLowerCase()))) {
      // This is the enhanced CLI pattern: testx create clientx auth
      return true;
    }
    
    // Use interactive mode if no type or module specified
    if (!type || !module) {
      return true;
    }
    
    // Use interactive mode if type is not one of the traditional types
    const traditionalTypes = ['scenario', 'page', 'config'];
    if (!traditionalTypes.includes(type.toLowerCase())) {
      return true;
    }
    
    // Default to traditional mode if all required args are provided
    return false;
  }

  private async executeInteractive(type?: string, module?: string, _name?: string, options: any = {}): Promise<void> {
    // Build partial config from provided arguments
    const partialConfig: Partial<TestConfig> = {};
    
    // Handle enhanced CLI pattern: testx create [module] [scenario]
    const validModules = ['clientx', 'staffx', 'adminx'];
    const validScenarios = ['auth', 'wallet', 'dashboard', 'custom', 'pos', 'scanning', 'users', 'analytics', 'config'];
    
    if (type && validModules.includes(type.toLowerCase())) {
      // type is actually the module in enhanced CLI pattern
      partialConfig.module = type.toLowerCase() as 'clientx' | 'staffx' | 'adminx';
      
      if (module && validScenarios.includes(module.toLowerCase())) {
        // module is actually the scenario in enhanced CLI pattern
        partialConfig.scenarioType = module.toLowerCase() as any;
      }
    } else if (module && validModules.includes(module.toLowerCase())) {
      // Traditional pattern where module is in the right place
      partialConfig.module = module as 'clientx' | 'staffx' | 'adminx';
    }
    
    if (options.url) {
      partialConfig.url = options.url;
    }
    
    if (options.template) {
      partialConfig.template = options.template;
    }

    // Use enhanced CLI for interactive test creation
    await this.enhancedCLI.createTest(partialConfig);
  }

  private async executeTraditional(type: string, module: string, name?: string, options: any = {}): Promise<void> {
    this.logger.header(`Creating ${type} for ${module.toUpperCase()}`);

    // Validate module
    if (!this.validateModule(module)) {
      throw new Error(`Invalid module: ${module}. Valid modules: clientx, staffx, adminx`);
    }

    // Validate type
    const validTypes = ['scenario', 'page', 'config'];
    if (!validTypes.includes(type.toLowerCase())) {
      throw new Error(`Invalid type: ${type}. Valid types: ${validTypes.join(', ')}`);
    }

    switch (type.toLowerCase()) {
      case 'scenario':
        await this.createScenario(module, name, options);
        break;
      case 'page':
        await this.createPageObject(module, name, options);
        break;
      case 'config':
        await this.createConfig(module, name, options);
        break;
    }

    this.logger.success(`${type} created successfully!`);
  }

  // Keep existing methods for traditional CLI support
  async execute(type: string, module: string, name?: string, options: any = {}): Promise<void> {
    return this.executeTraditional(type, module, name, options);
  }

  private async createScenario(module: string, name?: string, options: any = {}): Promise<void> {
    if (!name) {
      throw new Error('Scenario name is required');
    }

    const scenarioName = name.toLowerCase();
    const testDir = path.join('src', 'tests', module);
    const testFile = path.join(testDir, `${scenarioName}.spec.ts`);

    // Check if file exists
    if (fs.existsSync(testFile) && !options.force) {
      throw new Error(`Test file already exists: ${testFile}. Use --force to overwrite.`);
    }

    // Ensure directory exists
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }

    // Generate test content
    const testContent = this.generateTestTemplate(module, scenarioName);

    await this.withSpinner(
      `Creating test scenario: ${scenarioName}`,
      async () => {
        fs.writeFileSync(testFile, testContent);
      }
    );

    this.logger.info(`Created: ${testFile}`);
  }

  private async createPageObject(module: string, name?: string, options: any = {}): Promise<void> {
    if (!name) {
      throw new Error('Page object name is required');
    }

    const pageName = name.toLowerCase();
    const pageDir = path.join('src', 'lib', 'pages', module);
    const pageFile = path.join(pageDir, `${pageName}.page.ts`);

    // Check if file exists
    if (fs.existsSync(pageFile) && !options.force) {
      throw new Error(`Page object already exists: ${pageFile}. Use --force to overwrite.`);
    }

    // Ensure directory exists
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }

    // Generate page object content
    const pageContent = this.generatePageObjectTemplate(pageName);

    await this.withSpinner(
      `Creating page object: ${pageName}`,
      async () => {
        fs.writeFileSync(pageFile, pageContent);
      }
    );

    this.logger.info(`Created: ${pageFile}`);
  }

  private async createConfig(module: string, name?: string, options: any = {}): Promise<void> {
    const configName = name || 'scenarios';
    const configDir = path.join('config', 'scenarios');
    const configFile = path.join(configDir, `${module}-${configName}.json`);

    // Check if file exists
    if (fs.existsSync(configFile) && !options.force) {
      throw new Error(`Config file already exists: ${configFile}. Use --force to overwrite.`);
    }

    // Ensure directory exists
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    // Generate config content
    const configContent = this.generateConfigTemplate(module, configName);

    await this.withSpinner(
      `Creating config: ${configName}`,
      async () => {
        fs.writeFileSync(configFile, configContent);
      }
    );

    this.logger.info(`Created: ${configFile}`);
  }

  private generateTestTemplate(module: string, scenarioName: string): string {
    const className = this.toPascalCase(scenarioName);
    const variableName = this.toCamelCase(scenarioName);
    const moduleUpper = module.toUpperCase();

    return `import { test, expect } from '@playwright/test';
import { ${className}Page } from '../../lib/pages/${module}/${scenarioName}.page';

test.describe('${moduleUpper} - ${className}', () => {
  let ${variableName}Page: ${className}Page;

  test.beforeEach(async ({ page }) => {
    ${variableName}Page = new ${className}Page(page);
    await ${variableName}Page.goto();
  });

  test('should load ${scenarioName} page', async () => {
    await expect(${variableName}Page.page).toHaveTitle(/.*${className}.*/);
  });

  test('should perform basic ${scenarioName} actions', async () => {
    // TODO: Implement test steps
    await ${variableName}Page.performBasicActions();
  });

  test('should handle ${scenarioName} errors gracefully', async () => {
    // TODO: Implement error handling tests
    await ${variableName}Page.triggerError();
    await expect(${variableName}Page.errorMessage).toBeVisible();
  });
});
`;
  }

  private generatePageObjectTemplate(pageName: string): string {
    const className = this.toPascalCase(pageName);

    return `import { Page, Locator } from '@playwright/test';

export class ${className}Page {
  readonly page: Page;
  readonly heading: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h1');
    this.errorMessage = page.locator('[data-testid="error-message"]');
  }

  async goto(): Promise<void> {
    // TODO: Update with actual URL
    await this.page.goto('/path/to/${pageName}');
  }

  async performBasicActions(): Promise<void> {
    // TODO: Implement basic page actions
    await this.heading.waitFor();
  }

  async triggerError(): Promise<void> {
    // TODO: Implement error triggering logic
    throw new Error('Error triggering not implemented');
  }

  async waitForLoad(): Promise<void> {
    await this.heading.waitFor();
  }

  async isLoaded(): Promise<boolean> {
    return await this.heading.isVisible();
  }
}
`;
  }

  private generateConfigTemplate(module: string, configName: string): string {
    const config = {
      module: module,
      name: configName,
      scenarios: [
        {
          name: 'basic-flow',
          description: `Basic ${module} user flow`,
          steps: [
            'Navigate to page',
            'Perform action',
            'Verify result'
          ],
          tags: ['smoke', 'basic'],
          priority: 'high'
        }
      ],
      environment: {
        baseUrl: process.env['ANYKROWD_BASE_URL'] || 'https://krowd-dev.anykrowd.dev',
        timeout: 30000,
        retries: 2
      },
      metadata: {
        created: new Date().toISOString(),
        version: '1.0.0'
      }
    };

    return JSON.stringify(config, null, 2);
  }

  private toPascalCase(str: string): string {
    return str
      .split(/[-_\s]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }

  private toCamelCase(str: string): string {
    const pascalCase = this.toPascalCase(str);
    return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);
  }
} 