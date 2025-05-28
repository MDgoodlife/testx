import inquirer from 'inquirer';
import chalk from 'chalk';
import { CLILogger } from '../utils/logger';

export type ModuleType = 'clientx' | 'staffx' | 'adminx';
export type ScenarioType = 'auth' | 'wallet' | 'dashboard' | 'custom' | 'pos' | 'scanning' | 'users' | 'analytics' | 'config';
export type RecordingMethod = 'demonstrate' | 'template' | 'manual';

export interface TestConfig {
  module?: ModuleType;
  scenario?: string;
  scenarioType?: ScenarioType;
  url?: string;
  recordingMethod?: RecordingMethod;
  template?: string;
}

export interface ModuleInfo {
  name: string;
  title: string;
  description: string;
  scenarios: ScenarioInfo[];
}

export interface ScenarioInfo {
  type: ScenarioType;
  title: string;
  description: string;
  examples: string[];
}

export class InteractivePrompter {
  private logger: CLILogger;
  private moduleDefinitions: Record<ModuleType, ModuleInfo>;

  constructor(logger: CLILogger) {
    this.logger = logger;
    this.moduleDefinitions = this.initializeModuleDefinitions();
  }

  async gatherTestConfig(partial?: Partial<TestConfig>): Promise<TestConfig> {
    const config: TestConfig = { ...partial };

    this.logger.info('');
    this.logger.info(chalk.bold.blue('🎯 TestX Test Creator'));
    this.logger.info("Let's create a new test together!");
    this.logger.info('');

    if (!config.module) {
      config.module = await this.promptModule();
    }

    if (!config.scenarioType) {
      config.scenarioType = await this.promptScenarioType(config.module);
    }

    if (!config.url) {
      config.url = await this.promptURL(config.module);
    }

    if (!config.recordingMethod) {
      config.recordingMethod = await this.promptRecordingMethod();
    }

    return config;
  }

  private async promptModule(): Promise<ModuleType> {
    const choices = [
      {
        name: `${chalk.cyan('ClientX')} - Client-facing application`,
        value: 'clientx' as const,
        short: 'ClientX'
      },
      {
        name: `${chalk.yellow('StaffX')} - Staff operations interface`,
        value: 'staffx' as const, 
        short: 'StaffX'
      },
      {
        name: `${chalk.magenta('AdminX')} - Administrative dashboard`,
        value: 'adminx' as const,
        short: 'AdminX'
      }
    ];

    const { module }: { module: ModuleType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'module',
        message: 'Which module would you like to test?',
        choices,
        pageSize: 10
      }
    ]);

    // Show module description
    const moduleInfo = this.moduleDefinitions[module];
    if (moduleInfo) {
      this.logger.info('');
      this.logger.info(chalk.gray(`📍 ${moduleInfo.description}`));
      this.logger.info('');
    }

    return module;
  }

  private async promptScenarioType(module: ModuleType): Promise<ScenarioType> {
    const moduleInfo = this.moduleDefinitions[module];
    if (!moduleInfo) {
      throw new Error(`Unknown module: ${module}`);
    }

    type ScenarioChoice = ScenarioType | 'help';

    const choices: Array<{ name: string; value: ScenarioChoice; short: string }> = moduleInfo.scenarios.map(scenario => ({
      name: `${chalk.bold(scenario.title)}\n   ${chalk.gray(scenario.description)}`,
      value: scenario.type,
      short: scenario.title
    }));

    // Add help option
    choices.push({
      name: `${chalk.blue('ℹ️  See examples')} - View example scenarios for this module`,
      value: 'help',
      short: 'Help'
    });

    const { scenarioType }: { scenarioType: ScenarioChoice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'scenarioType',
        message: 'What type of test scenario?',
        choices,
        pageSize: 10
      }
    ]);

    if (scenarioType === 'help') {
      await this.showExamples(module);
      return this.promptScenarioType(module);
    }

    return scenarioType;
  }

  private async promptURL(module: ModuleType): Promise<string> {
    const defaultUrls: Record<ModuleType, string> = {
      clientx: 'https://krowd-dev.anykrowd.dev/#/auth/signuphome',
      staffx: 'https://krowd-dev.anykrowd.dev/staff',
      adminx: 'https://krowd-dev.anykrowd.dev/admin'
    };

    const { url } = await inquirer.prompt([
      {
        type: 'input',
        name: 'url',
        message: 'Target URL for testing:',
        default: defaultUrls[module],
        validate: (input: string) => {
          if (!input.trim()) {
            return 'URL is required';
          }
          try {
            new URL(input);
            return true;
          } catch {
            return 'Please enter a valid URL';
          }
        }
      }
    ]);

    // Validate and show environment info
    if (url.includes('anykrowd.dev')) {
      const environment = url.includes('krowd-dev') ? 'development' : 'production';
      const tenant = url.match(/https:\/\/([^.]+)/)?.[1] || 'unknown';
      
      this.logger.info('');
      this.logger.success('✅ Valid anyKrowd URL detected');
      this.logger.info(`📍 Environment: ${chalk.cyan(environment)}`);
      this.logger.info(`🏢 Tenant: ${chalk.cyan(tenant)}`);
      this.logger.info('');
    }

    return url;
  }

  private async promptRecordingMethod(): Promise<RecordingMethod> {
    const choices = [
      {
        name: `${chalk.green('📹 Record Demonstration')} ${chalk.yellow('(Recommended)')}\n   ${chalk.gray('I\'ll record your screen while you demonstrate the flow\n   Then generate a Playwright test from your actions')}`,
        value: 'demonstrate' as const,
        short: 'Record Demo'
      },
      {
        name: `${chalk.blue('📋 Use Template')}\n   ${chalk.gray('Start with a pre-built template for this scenario')}`,
        value: 'template' as const,
        short: 'Template'
      },
      {
        name: `${chalk.white('✏️  Manual Creation')}\n   ${chalk.gray('Create test script manually with guided assistance')}`,
        value: 'manual' as const,
        short: 'Manual'
      }
    ];

    const { recordingMethod } = await inquirer.prompt([
      {
        type: 'list',
        name: 'recordingMethod',
        message: 'How would you like to create this test?',
        choices,
        pageSize: 10
      }
    ]);

    return recordingMethod;
  }

  private async showExamples(module: ModuleType): Promise<void> {
    const moduleInfo = this.moduleDefinitions[module];
    if (!moduleInfo) {
      this.logger.error(`Unknown module: ${module}`);
      return;
    }
    
    this.logger.info('');
    this.logger.info(chalk.bold(`📚 ${moduleInfo.title} Examples:`));
    this.logger.info('');

    moduleInfo.scenarios.forEach(scenario => {
      this.logger.info(chalk.bold.cyan(`${scenario.title}:`));
      scenario.examples.forEach(example => {
        this.logger.info(`  • ${example}`);
      });
      this.logger.info('');
    });

    await inquirer.prompt([
      {
        type: 'input',
        name: 'continue',
        message: 'Press Enter to continue...',
        default: ''
      }
    ]);
  }

  private initializeModuleDefinitions(): Record<ModuleType, ModuleInfo> {
    return {
      clientx: {
        name: 'clientx',
        title: 'ClientX',
        description: 'Authentication, wallet operations, user dashboard',
        scenarios: [
          {
            type: 'auth',
            title: 'Authentication Flow',
            description: 'Login, registration, OAuth (Google/Facebook), logout',
            examples: [
              'User registration with email verification',
              'Login with email and password',
              'OAuth login with Google/Facebook',
              'Password reset flow',
              'Account lockout scenarios'
            ]
          },
          {
            type: 'wallet',
            title: 'Wallet Operations',
            description: 'Top-up, payments, balance checks, transaction history',
            examples: [
              'Add funds to wallet via credit card',
              'Make payment for event tickets',
              'View transaction history',
              'Check wallet balance',
              'Handle insufficient funds scenarios'
            ]
          },
          {
            type: 'dashboard',
            title: 'Dashboard Navigation',
            description: 'Menu navigation, profile management, settings',
            examples: [
              'Navigate through main menu items',
              'Update user profile information',
              'Change account settings',
              'View event history',
              'Manage notification preferences'
            ]
          },
          {
            type: 'custom',
            title: 'Custom Workflow',
            description: 'Record your own demonstration for complex flows',
            examples: [
              'Multi-step event booking process',
              'Complex user onboarding flow',
              'Integration with external services',
              'Error recovery scenarios',
              'Performance-critical user journeys'
            ]
          }
        ]
      },
      staffx: {
        name: 'staffx',
        title: 'StaffX',
        description: 'POS systems, ticket scanning, staff tools',
        scenarios: [
          {
            type: 'pos',
            title: 'POS Operations',
            description: 'Payment processing, refunds, transaction management',
            examples: [
              'Process credit card payment',
              'Handle cash transactions',
              'Process refunds and returns',
              'Split payments across multiple methods',
              'Handle payment failures'
            ]
          },
          {
            type: 'scanning',
            title: 'Ticket Scanning',
            description: 'QR code scanning, ticket validation, entry management',
            examples: [
              'Scan valid event tickets',
              'Handle invalid or expired tickets',
              'Bulk ticket validation',
              'Manual ticket entry',
              'Offline scanning scenarios'
            ]
          },
          {
            type: 'dashboard',
            title: 'Staff Dashboard',
            description: 'Reporting, analytics, staff management',
            examples: [
              'View daily sales reports',
              'Monitor real-time event metrics',
              'Manage staff schedules',
              'Access customer support tools',
              'Generate end-of-day reports'
            ]
          }
        ]
      },
      adminx: {
        name: 'adminx',
        title: 'AdminX',
        description: 'User management, analytics, system configuration',
        scenarios: [
          {
            type: 'users',
            title: 'User Management',
            description: 'Create, edit, disable users, role management',
            examples: [
              'Create new user accounts',
              'Assign roles and permissions',
              'Disable or suspend accounts',
              'Bulk user operations',
              'User activity monitoring'
            ]
          },
          {
            type: 'analytics',
            title: 'Analytics & Reporting',
            description: 'System metrics, performance monitoring, custom reports',
            examples: [
              'View system performance metrics',
              'Generate custom reports',
              'Monitor user engagement',
              'Track financial metrics',
              'Export data for analysis'
            ]
          },
          {
            type: 'config',
            title: 'System Configuration',
            description: 'Settings, integrations, feature flags',
            examples: [
              'Configure payment gateways',
              'Manage feature flags',
              'Set up integrations',
              'Configure security settings',
              'Manage system notifications'
            ]
          }
        ]
      }
    };
  }
} 