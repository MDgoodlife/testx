import { BaseCommand } from '../core/base-command';
import { CLILogger } from '../utils/logger';
import chalk from 'chalk';

export class HelpCommand extends BaseCommand {
  constructor(logger: CLILogger) {
    super(logger);
  }

  configure(): void {
    this.command
      .name('help')
      .description('Show help information and examples')
      .argument('[command]', 'Specific command to get help for')
      .option('--modules', 'Show detailed module information')
      .option('--examples', 'Show usage examples')
      .action(async (command?: string, options?: any) => {
        await this.execute(command, options);
      });
  }

  async execute(command?: string, options: any = {}): Promise<void> {
    try {
      if (options.modules) {
        await this.showModuleHelp();
      } else if (options.examples) {
        await this.showExamples();
      } else if (command) {
        await this.showCommandHelp(command);
      } else {
        await this.showGeneralHelp();
      }
    } catch (error) {
      this.handleError(error as Error, 'COMMAND_EXECUTION', 'help', [command || '']);
      process.exit(1);
    }
  }

  private async showGeneralHelp(): Promise<void> {
    this.logger.info('');
    this.logger.info(chalk.bold.blue('🧪 TestX MVP - Professional Browser Testing Framework'));
    this.logger.info(chalk.gray('─'.repeat(60)));
    this.logger.info('');
    
    this.logger.info(chalk.bold('📋 Available Commands:'));
    this.logger.info('');
    
    const commands = [
      {
        name: 'create',
        description: 'Create new test scenarios (interactive by default)',
        examples: [
          'testx create                    # Interactive test creation',
          'testx create clientx auth       # Quick auth test creation',
          'testx create scenario clientx login-flow  # Traditional mode'
        ]
      },
      {
        name: 'run',
        description: 'Execute test scenarios',
        examples: [
          'testx run clientx auth          # Run ClientX auth tests',
          'testx run clientx               # Run all ClientX tests',
          'testx run --headed              # Run with visible browser'
        ]
      },
      {
        name: 'status',
        description: 'Check system health and configuration',
        examples: [
          'testx status                    # Quick status check',
          'testx status --global           # Comprehensive system check',
          'testx status --integrations     # Check external services'
        ]
      },
      {
        name: 'setup',
        description: 'Configure integrations and services',
        examples: [
          'testx setup slack               # Setup Slack integration',
          'testx setup notion              # Setup Notion integration',
          'testx setup --all               # Setup all integrations'
        ]
      }
    ];

    commands.forEach(cmd => {
      this.logger.info(chalk.cyan(`${cmd.name.padEnd(12)} ${cmd.description}`));
      cmd.examples.forEach(example => {
        this.logger.info(chalk.gray(`              ${example}`));
      });
      this.logger.info('');
    });

    this.logger.info(chalk.bold('🔍 Get More Help:'));
    this.logger.info(`  ${chalk.cyan('testx help modules')}        Learn about ClientX, StaffX, AdminX`);
    this.logger.info(`  ${chalk.cyan('testx help examples')}       See usage examples and patterns`);
    this.logger.info(`  ${chalk.cyan('testx help create')}         Detailed help for test creation`);
    this.logger.info('');
    
    this.logger.info(chalk.bold('🚀 Quick Start:'));
    this.logger.info(`  ${chalk.green('testx create')}              Start interactive test creation`);
    this.logger.info(`  ${chalk.green('testx status --global')}     Check if everything is working`);
    this.logger.info('');
  }

  private async showModuleHelp(): Promise<void> {
    this.logger.info('');
    this.logger.info(chalk.bold.blue('📚 TestX Modules Guide'));
    this.logger.info(chalk.gray('─'.repeat(40)));
    this.logger.info('');

    const modules = [
      {
        name: 'ClientX',
        color: 'cyan',
        description: 'Client-facing application testing',
        scenarios: [
          'Authentication flows (login, registration, OAuth)',
          'Wallet operations (top-up, payments, balance)',
          'Dashboard navigation (profile, settings, menus)',
          'Custom workflows (complex user journeys)'
        ],
        examples: [
          'testx create clientx auth',
          'testx run clientx wallet',
          'testx create clientx dashboard --url https://app.example.com'
        ]
      },
      {
        name: 'StaffX',
        color: 'yellow',
        description: 'Staff operations interface testing',
        scenarios: [
          'POS operations (payments, refunds, transactions)',
          'Ticket scanning (QR codes, validation, entry)',
          'Staff dashboard (reporting, analytics, management)',
          'Offline scenarios (network issues, sync)'
        ],
        examples: [
          'testx create staffx pos',
          'testx run staffx scanning',
          'testx create staffx dashboard --template reporting'
        ]
      },
      {
        name: 'AdminX',
        color: 'magenta',
        description: 'Administrative dashboard testing',
        scenarios: [
          'User management (create, edit, roles, permissions)',
          'Analytics & reporting (metrics, custom reports)',
          'System configuration (settings, integrations)',
          'Security features (access control, audit logs)'
        ],
        examples: [
          'testx create adminx users',
          'testx run adminx analytics',
          'testx create adminx config --template security'
        ]
      }
    ];

    modules.forEach(module => {
      const colorFunction = (chalk as any)[module.color];
      this.logger.info(colorFunction ? colorFunction.bold(module.name) : chalk.bold(module.name));
      this.logger.info(chalk.gray(module.description));
      this.logger.info('');
      
      this.logger.info(chalk.bold('  Test Scenarios:'));
      module.scenarios.forEach(scenario => {
        this.logger.info(`    • ${scenario}`);
      });
      this.logger.info('');
      
      this.logger.info(chalk.bold('  Example Commands:'));
      module.examples.forEach(example => {
        this.logger.info(chalk.gray(`    ${example}`));
      });
      this.logger.info('');
    });

    this.logger.info(chalk.bold('💡 Pro Tips:'));
    this.logger.info('  • Use interactive mode for guided test creation');
    this.logger.info('  • Combine modules in test suites for end-to-end scenarios');
    this.logger.info('  • Use --url option to test different environments');
    this.logger.info('');
  }

  private async showExamples(): Promise<void> {
    this.logger.info('');
    this.logger.info(chalk.bold.blue('📖 TestX Usage Examples'));
    this.logger.info(chalk.gray('─'.repeat(40)));
    this.logger.info('');

    const examples = [
      {
        title: 'Interactive Test Creation',
        description: 'Step-by-step guided test creation',
        commands: [
          'testx create',
          '# Follow the interactive prompts to:',
          '# 1. Select module (ClientX, StaffX, AdminX)',
          '# 2. Choose scenario type',
          '# 3. Provide target URL',
          '# 4. Select creation method'
        ]
      },
      {
        title: 'Quick Test Creation',
        description: 'Fast test creation with known parameters',
        commands: [
          'testx create clientx auth',
          'testx create staffx pos --url https://pos.example.com',
          'testx create adminx users --template bulk-operations'
        ]
      },
      {
        title: 'Running Tests',
        description: 'Execute tests with different options',
        commands: [
          'testx run clientx auth          # Run specific test',
          'testx run clientx               # Run all ClientX tests',
          'testx run --headed              # Run with visible browser',
          'testx run --debug               # Run in debug mode'
        ]
      },
      {
        title: 'System Management',
        description: 'Check status and configure integrations',
        commands: [
          'testx status                    # Quick health check',
          'testx status --global           # Comprehensive check',
          'testx setup slack               # Configure Slack',
          'testx setup --all               # Setup all integrations'
        ]
      },
      {
        title: 'Advanced Workflows',
        description: 'Complex testing scenarios',
        commands: [
          '# Create custom workflow test',
          'testx create clientx custom --url https://app.example.com',
          '',
          '# Run tests with specific configuration',
          'testx run clientx --config production.json',
          '',
          '# Generate reports',
          'testx run clientx --reporter html'
        ]
      }
    ];

    examples.forEach(example => {
      this.logger.info(chalk.bold.green(example.title));
      this.logger.info(chalk.gray(example.description));
      this.logger.info('');
      
      example.commands.forEach(cmd => {
        if (cmd.startsWith('#')) {
          this.logger.info(chalk.gray(cmd));
        } else if (cmd === '') {
          this.logger.info('');
        } else {
          this.logger.info(chalk.cyan(`  ${cmd}`));
        }
      });
      this.logger.info('');
    });

    this.logger.info(chalk.bold('🎯 Next Steps:'));
    this.logger.info('  1. Try interactive mode: testx create');
    this.logger.info('  2. Check system status: testx status --global');
    this.logger.info('  3. Explore modules: testx help --modules');
    this.logger.info('');
  }

  private async showCommandHelp(command: string): Promise<void> {
    const helpContent: Record<string, () => void> = {
      create: () => this.showCreateHelp(),
      run: () => this.showRunHelp(),
      status: () => this.showStatusHelp(),
      setup: () => this.showSetupHelp()
    };

    const helpFunction = helpContent[command.toLowerCase()];
    if (helpFunction) {
      helpFunction();
    } else {
      this.logger.error(`Unknown command: ${command}`);
      this.logger.info('Available commands: create, run, status, setup');
      this.logger.info('Use "testx help" for general help');
    }
  }

  private showCreateHelp(): void {
    this.logger.info('');
    this.logger.info(chalk.bold.blue('📝 testx create - Test Creation Command'));
    this.logger.info(chalk.gray('─'.repeat(45)));
    this.logger.info('');
    
    this.logger.info(chalk.bold('Interactive Mode (Recommended):'));
    this.logger.info(chalk.cyan('  testx create'));
    this.logger.info('  • Step-by-step guided test creation');
    this.logger.info('  • Smart defaults and validation');
    this.logger.info('  • Module and scenario exploration');
    this.logger.info('');
    
    this.logger.info(chalk.bold('Quick Creation:'));
    this.logger.info(chalk.cyan('  testx create [module] [scenario]'));
    this.logger.info('  • Fast test creation with known parameters');
    this.logger.info('  • Automatic template selection');
    this.logger.info('');
    
    this.logger.info(chalk.bold('Traditional Mode:'));
    this.logger.info(chalk.cyan('  testx create scenario [module] [name] [options]'));
    this.logger.info('  • Compatible with existing scripts');
    this.logger.info('  • Full control over all parameters');
    this.logger.info('');
    
    this.logger.info(chalk.bold('Options:'));
    this.logger.info('  --url <url>          Target URL for testing');
    this.logger.info('  --template <name>    Template to use');
    this.logger.info('  --interactive        Force interactive mode');
    this.logger.info('  --traditional        Force traditional mode');
    this.logger.info('  --force              Overwrite existing files');
    this.logger.info('');
  }

  private showRunHelp(): void {
    this.logger.info('');
    this.logger.info(chalk.bold.blue('🚀 testx run - Test Execution Command'));
    this.logger.info(chalk.gray('─'.repeat(45)));
    this.logger.info('');
    
    this.logger.info(chalk.bold('Basic Usage:'));
    this.logger.info(chalk.cyan('  testx run [module] [scenario]'));
    this.logger.info('');
    
    this.logger.info(chalk.bold('Examples:'));
    this.logger.info('  testx run clientx auth       # Run ClientX auth tests');
    this.logger.info('  testx run clientx            # Run all ClientX tests');
    this.logger.info('  testx run                    # Run all tests');
    this.logger.info('');
    
    this.logger.info(chalk.bold('Browser Options:'));
    this.logger.info('  --headed                     # Show browser window');
    this.logger.info('  --debug                      # Debug mode');
    this.logger.info('  --ui                         # Interactive UI mode');
    this.logger.info('');
  }

  private showStatusHelp(): void {
    this.logger.info('');
    this.logger.info(chalk.bold.blue('📊 testx status - System Health Command'));
    this.logger.info(chalk.gray('─'.repeat(45)));
    this.logger.info('');
    
    this.logger.info(chalk.bold('Usage:'));
    this.logger.info(chalk.cyan('  testx status [options]'));
    this.logger.info('');
    
    this.logger.info(chalk.bold('Options:'));
    this.logger.info('  --global                     # Comprehensive system check');
    this.logger.info('  --integrations               # Check external services');
    this.logger.info('  --tests                      # Validate test configuration');
    this.logger.info('');
  }

  private showSetupHelp(): void {
    this.logger.info('');
    this.logger.info(chalk.bold.blue('⚙️  testx setup - Integration Setup Command'));
    this.logger.info(chalk.gray('─'.repeat(45)));
    this.logger.info('');
    
    this.logger.info(chalk.bold('Usage:'));
    this.logger.info(chalk.cyan('  testx setup [service]'));
    this.logger.info('');
    
    this.logger.info(chalk.bold('Available Services:'));
    this.logger.info('  slack                        # Slack integration');
    this.logger.info('  notion                       # Notion integration');
    this.logger.info('  github                       # GitHub integration');
    this.logger.info('');
    
    this.logger.info(chalk.bold('Options:'));
    this.logger.info('  --all                        # Setup all integrations');
    this.logger.info('  --force                      # Overwrite existing config');
    this.logger.info('');
  }
} 