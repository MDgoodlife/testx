import { Command } from 'commander';
import { CLILogger } from '../utils/logger';
import { ErrorHandler } from '../utils/error-handler';

export abstract class BaseCommand {
  protected logger: CLILogger;
  protected errorHandler: ErrorHandler;
  protected command: Command;

  constructor(logger: CLILogger) {
    this.logger = logger;
    this.errorHandler = new ErrorHandler(logger);
    this.command = new Command();
  }

  abstract configure(): void;
  abstract execute(...args: any[]): Promise<void>;

  getCommand(): Command {
    this.configure();
    return this.command;
  }

  protected handleError(error: Error, context: string, command?: string, args?: string[]): void {
    this.errorHandler.handleError(error, context as any, command, args);
  }

  protected validateModule(module: string): boolean {
    const validModules = ['clientx', 'staffx', 'adminx'];
    return validModules.includes(module.toLowerCase());
  }

  protected validateScenario(scenario: string, module: string): boolean {
    // Define valid scenarios per module
    const validScenarios: Record<string, string[]> = {
      clientx: ['auth', 'dashboard', 'wallet', 'profile'],
      staffx: ['dashboard', 'orders', 'analytics'],
      adminx: ['users', 'analytics', 'settings']
    };

    return validScenarios[module]?.includes(scenario.toLowerCase()) || false;
  }

  protected async withSpinner<T>(
    message: string,
    operation: () => Promise<T>
  ): Promise<T> {
    // TODO: Implement with ora spinner
    this.logger.step(message);
    try {
      const result = await operation();
      this.logger.success(`${message} - Complete`);
      return result;
    } catch (error) {
      this.logger.failure(`${message} - Failed`);
      throw error;
    }
  }
} 