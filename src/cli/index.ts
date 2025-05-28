#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { config } from 'dotenv';
import { CLIParser } from './core/parser';
import { CLILogger } from './utils/logger';
import { ErrorHandler } from './utils/error-handler';

// Load environment variables
config();

const program = new Command();
const logger = new CLILogger();
const errorHandler = new ErrorHandler(logger);

async function main() {
  try {
    // Set up global error handling
    process.on('uncaughtException', (error) => {
      errorHandler.handleError(error, 'UNCAUGHT_EXCEPTION');
      process.exit(1);
    });

    process.on('unhandledRejection', (reason) => {
      errorHandler.handleError(new Error(`Unhandled Rejection: ${reason}`), 'UNHANDLED_REJECTION');
      process.exit(1);
    });

    // Set up graceful shutdown
    process.on('SIGINT', () => {
      logger.info('Received SIGINT, shutting down gracefully...');
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      logger.info('Received SIGTERM, shutting down gracefully...');
      process.exit(0);
    });

    // Initialize CLI parser
    const parser = new CLIParser(program, logger);
    await parser.initialize();

    // Parse command line arguments
    await program.parseAsync(process.argv);

  } catch (error) {
    errorHandler.handleError(error as Error, 'CLI_INITIALIZATION');
    process.exit(1);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error(chalk.red('Fatal error:'), error.message);
    process.exit(1);
  });
}

export { main }; 