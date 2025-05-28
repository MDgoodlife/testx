import { Command } from 'commander';
import chalk from 'chalk';
import { CLILogger, CLILoggerOptions } from '../utils/logger';
import { RunCommand } from '../commands/run.command';
import { SetupCommand } from '../commands/setup.command';
import { StatusCommand } from '../commands/status.command';
import { CreateCommand } from '../commands/create.command';
import { HelpCommand } from '../commands/help.command';

export class CLIParser {
  private program: Command;
  private logger: CLILogger;

  constructor(program: Command, logger: CLILogger) {
    this.program = program;
    this.logger = logger;
  }

  async initialize(): Promise<void> {
    // Set up program metadata
    this.program
      .name('testx')
      .description('TestX MVP - Professional browser testing framework for anyKrowd ClientX')
      .version('1.0.0')
      .helpOption('-h, --help', 'Display help for command');

    // Add global options
    this.addGlobalOptions();

    // Register commands
    this.registerCommands();

    // Set up help and error handling
    this.setupHelpAndErrors();
  }

  private addGlobalOptions(): void {
    this.program
      .option('-v, --verbose', 'Enable verbose logging')
      .option('-q, --quiet', 'Suppress non-error output')
      .option('-j, --json', 'Output in JSON format')
      .hook('preAction', (thisCommand) => {
        // Update logger options based on global flags
        const options = thisCommand.opts() as { verbose?: boolean; quiet?: boolean; json?: boolean };
        const loggerOptions: CLILoggerOptions = {
          ...(options.verbose !== undefined && { verbose: options.verbose }),
          ...(options.quiet !== undefined && { quiet: options.quiet }),
          ...(options.json !== undefined && { json: options.json })
        };
        this.logger.updateOptions(loggerOptions);
      });
  }

  private registerCommands(): void {
    // Create command - Generate test scenarios (enhanced with interactive mode)
    const createCommand = new CreateCommand(this.logger);
    this.program.addCommand(createCommand.getCommand());

    // Run command - Execute tests
    const runCommand = new RunCommand(this.logger);
    this.program.addCommand(runCommand.getCommand());

    // Setup command - Configure services
    const setupCommand = new SetupCommand(this.logger);
    this.program.addCommand(setupCommand.getCommand());

    // Status command - Check system health
    const statusCommand = new StatusCommand(this.logger);
    this.program.addCommand(statusCommand.getCommand());

    // Help command - Enhanced help and discovery
    const helpCommand = new HelpCommand(this.logger);
    this.program.addCommand(helpCommand.getCommand());
  }

  private setupHelpAndErrors(): void {
    // Custom help
    this.program.configureHelp({
      sortSubcommands: true,
      subcommandTerm: (cmd) => cmd.name() + ' ' + cmd.usage()
    });

    // Handle unknown commands
    this.program.on('command:*', (operands) => {
      this.logger.error(`Unknown command: ${operands[0]}`);
      this.logger.info('');
      this.logger.info('Available commands:');
      this.program.commands.forEach(cmd => {
        this.logger.info(`  ${chalk.cyan(cmd.name())} - ${cmd.description()}`);
      });
      this.logger.info('');
      this.logger.info(`Run ${chalk.cyan('testx help')} for more information.`);
      process.exit(1);
    });

    // Handle no command provided
    if (process.argv.length <= 2) {
      this.showWelcome();
    }
  }

  private showWelcome(): void {
    console.log();
    console.log(chalk.bold.blue('🧪 TestX MVP - Professional Browser Testing Framework'));
    console.log(chalk.gray('─'.repeat(60)));
    console.log();
    console.log(chalk.bold('🚀 Quick Start:'));
    console.log(`  ${chalk.green('testx create')}                Start interactive test creation`);
    console.log(`  ${chalk.cyan('testx status --global')}       Check system health`);
    console.log(`  ${chalk.yellow('testx help')}                  Show detailed help`);
    console.log();
    console.log(chalk.bold('📋 Common Commands:'));
    console.log(`  ${chalk.cyan('testx create clientx auth')}    Quick auth test creation`);
    console.log(`  ${chalk.cyan('testx run clientx')}            Run ClientX tests`);
    console.log(`  ${chalk.cyan('testx help --modules')}         Learn about modules`);
    console.log();
    console.log(chalk.bold('🔍 Need Help?'));
    console.log(`  ${chalk.blue('testx help')}                  General help and examples`);
    console.log(`  ${chalk.blue('testx help create')}           Test creation help`);
    console.log(`  ${chalk.blue('testx help --examples')}       Usage examples`);
    console.log();
    console.log(`For more information, visit: ${chalk.blue('https://github.com/MDgoodlife/testx')}`);
    console.log();
  }
} 