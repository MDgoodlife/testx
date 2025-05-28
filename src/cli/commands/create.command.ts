import { BaseCommand } from '../core/base-command';
import { CLILogger } from '../utils/logger';
import fs from 'fs';
import path from 'path';

export class CreateCommand extends BaseCommand {
  constructor(logger: CLILogger) {
    super(logger);
  }

  configure(): void {
    this.command
      .name('create')
      .description('Create new test scenarios and templates')
      .argument('<type>', 'Type to create (scenario, page, config)')
      .argument('<module>', 'Module (clientx, staffx, adminx)')
      .argument('[name]', 'Name of the item to create')
      .option('-t, --template <template>', 'Template to use')
      .option('-f, --force', 'Overwrite existing files')
      .action(async (type: string, module: string, name?: string, options?: any) => {
        await this.execute(type, module, name, options);
      });
  }

  async execute(type: string, module: string, name?: string, options: any = {}): Promise<void> {
    try {
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

    } catch (error) {
      this.handleError(error as Error, 'COMMAND_EXECUTION', 'create', [type, module, name || '']);
      process.exit(1);
    }
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