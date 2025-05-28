import chalk from 'chalk';
import { createLogger, format, transports, Logger } from 'winston';

export interface CLILoggerOptions {
  verbose?: boolean;
  quiet?: boolean;
  json?: boolean;
}

export class CLILogger {
  private winston: Logger;
  private options: CLILoggerOptions;

  constructor(options: CLILoggerOptions = {}) {
    this.options = options;
    
    this.winston = createLogger({
      level: this.getLogLevel(),
      format: this.getLogFormat(),
      transports: [
        new transports.Console({
          silent: Boolean(this.options.quiet)
        })
      ]
    });
  }

  private getLogLevel(): string {
    if (this.options.verbose) return 'debug';
    if (this.options.quiet) return 'error';
    return 'info';
  }

  private getLogFormat() {
    if (this.options.json) {
      return format.combine(
        format.timestamp(),
        format.json()
      );
    }

    return format.combine(
      format.timestamp({ format: 'HH:mm:ss' }),
      format.printf(({ level, message, timestamp }) => {
        const coloredLevel = this.colorizeLevel(level);
        return `${chalk.gray(timestamp)} ${coloredLevel} ${message}`;
      })
    );
  }

  private colorizeLevel(level: string): string {
    switch (level) {
      case 'error': return chalk.red('ERROR');
      case 'warn': return chalk.yellow('WARN');
      case 'info': return chalk.blue('INFO');
      case 'debug': return chalk.gray('DEBUG');
      default: return level.toUpperCase();
    }
  }

  // Public logging methods
  info(message: string, ...args: any[]): void {
    this.winston.info(message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.winston.warn(message, ...args);
  }

  error(message: string, ...args: any[]): void {
    this.winston.error(message, ...args);
  }

  debug(message: string, ...args: any[]): void {
    this.winston.debug(message, ...args);
  }

  success(message: string): void {
    if (!this.options.quiet) {
      console.log(chalk.green('✓'), message);
    }
  }

  failure(message: string): void {
    if (!this.options.quiet) {
      console.log(chalk.red('✗'), message);
    }
  }

  // CLI-specific methods
  command(command: string): void {
    this.debug(`Executing command: ${command}`);
  }

  step(message: string): void {
    if (!this.options.quiet) {
      console.log(chalk.cyan('→'), message);
    }
  }

  header(message: string): void {
    if (!this.options.quiet) {
      console.log();
      console.log(chalk.bold.blue(message));
      console.log(chalk.gray('─'.repeat(message.length)));
    }
  }

  // Update logger options
  updateOptions(options: Partial<CLILoggerOptions>): void {
    this.options = { ...this.options, ...options };
    this.winston.level = this.getLogLevel();
    this.winston.format = this.getLogFormat();
  }
} 