import chalk from 'chalk';
import { CLILogger } from './logger';

export type ErrorContext = 
  | 'CLI_INITIALIZATION'
  | 'COMMAND_EXECUTION'
  | 'SERVICE_INTEGRATION'
  | 'TEST_EXECUTION'
  | 'UNCAUGHT_EXCEPTION'
  | 'UNHANDLED_REJECTION'
  | 'VALIDATION_ERROR'
  | 'NETWORK_ERROR'
  | 'FILE_SYSTEM_ERROR';

export interface ErrorDetails {
  context: ErrorContext;
  command?: string;
  args?: string[];
  timestamp: Date;
  stack?: string;
  suggestions?: string[];
}

export class ErrorHandler {
  private logger: CLILogger;

  constructor(logger: CLILogger) {
    this.logger = logger;
  }

  handleError(error: Error, context: ErrorContext, command?: string, args?: string[]): void {
    const errorDetails: ErrorDetails = {
      context,
      ...(command && { command }),
      ...(args && { args }),
      timestamp: new Date(),
      ...(error.stack && { stack: error.stack }),
      suggestions: this.generateSuggestions(error, context)
    };

    // Log error with AI-friendly format
    this.logError(error, errorDetails);

    // Log to external services if available
    this.logToExternalServices();
  }

  private logError(error: Error, details: ErrorDetails): void {
    this.logger.error('');
    this.logger.error(chalk.red.bold('❌ TestX CLI Error'));
    this.logger.error(chalk.red('─'.repeat(50)));
    
    this.logger.error(`Context: ${details.context}`);
    this.logger.error(`Message: ${error.message}`);
    
    if (details.command) {
      this.logger.error(`Command: testx ${details.command} ${(details.args || []).join(' ')}`);
    }
    
    this.logger.error(`Timestamp: ${details.timestamp.toISOString()}`);
    
    if (details.suggestions && details.suggestions.length > 0) {
      this.logger.error('');
      this.logger.error(chalk.yellow.bold('💡 Suggestions:'));
      details.suggestions.forEach((suggestion, index) => {
        this.logger.error(`  ${index + 1}. ${suggestion}`);
      });
    }

    // Log stack trace in debug mode
    if (details.stack) {
      this.logger.debug('');
      this.logger.debug('Stack trace:');
      this.logger.debug(details.stack);
    }

    this.logger.error('');
    this.logger.error(chalk.gray('For more help, run: testx help'));
    this.logger.error(chalk.gray('Report issues: https://github.com/MDgoodlife/testx/issues'));
  }

  private generateSuggestions(error: Error, context: ErrorContext): string[] {
    const suggestions: string[] = [];

    switch (context) {
      case 'CLI_INITIALIZATION':
        suggestions.push('Check if all dependencies are installed: npm install');
        suggestions.push('Verify Node.js version is 18+: node --version');
        suggestions.push('Check if .env file exists and is properly configured');
        break;

      case 'COMMAND_EXECUTION':
        suggestions.push('Verify command syntax: testx help');
        suggestions.push('Check if required arguments are provided');
        suggestions.push('Ensure you have proper permissions');
        break;

      case 'SERVICE_INTEGRATION':
        suggestions.push('Check service credentials in .env file');
        suggestions.push('Verify network connectivity');
        suggestions.push('Run service health check: testx status --services');
        break;

      case 'TEST_EXECUTION':
        suggestions.push('Check if Playwright browsers are installed: npx playwright install');
        suggestions.push('Verify test environment configuration');
        suggestions.push('Check if anyKrowd environment is accessible');
        break;

      case 'VALIDATION_ERROR':
        suggestions.push('Check command arguments and options');
        suggestions.push('Verify input format and required fields');
        break;

      case 'NETWORK_ERROR':
        suggestions.push('Check internet connectivity');
        suggestions.push('Verify service endpoints are accessible');
        suggestions.push('Check firewall and proxy settings');
        break;

      case 'FILE_SYSTEM_ERROR':
        suggestions.push('Check file and directory permissions');
        suggestions.push('Verify disk space availability');
        suggestions.push('Ensure file paths are correct');
        break;

      default:
        suggestions.push('Check the error message for specific details');
        suggestions.push('Try running with --verbose flag for more information');
    }

    // Add common suggestions
    if (error.message.includes('ENOENT')) {
      suggestions.push('File or directory not found - check the path');
    }
    
    if (error.message.includes('EACCES')) {
      suggestions.push('Permission denied - check file/directory permissions');
    }
    
    if (error.message.includes('ECONNREFUSED')) {
      suggestions.push('Connection refused - check if service is running');
    }

    return suggestions;
  }

  private async logToExternalServices(): Promise<void> {
    try {
      // TODO: Integrate with Notion error logging
      // TODO: Integrate with Slack error notifications (for critical errors)
      
      // For now, just log to debug
      this.logger.debug('Error logged to external services');
    } catch (loggingError) {
      const errorMessage = loggingError instanceof Error ? loggingError.message : String(loggingError);
      this.logger.debug(`Failed to log to external services: ${errorMessage}`);
    }
  }

  getExitCode(context: ErrorContext): number {
    switch (context) {
      case 'CLI_INITIALIZATION':
        return 1;
      case 'COMMAND_EXECUTION':
        return 2;
      case 'SERVICE_INTEGRATION':
        return 3;
      case 'TEST_EXECUTION':
        return 4;
      case 'VALIDATION_ERROR':
        return 5;
      case 'NETWORK_ERROR':
        return 6;
      case 'FILE_SYSTEM_ERROR':
        return 7;
      case 'UNCAUGHT_EXCEPTION':
      case 'UNHANDLED_REJECTION':
        return 1;
      default:
        return 1;
    }
  }
} 