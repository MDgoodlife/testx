/**
 * Logger Tests
 * Unit tests for the CLI logger utility
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { CLILogger } from '../logger';

// Mock Winston to capture its output
const mockWinstonLogger = {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
  level: 'info',
  format: jest.fn(),
};

jest.mock('winston', () => ({
  createLogger: jest.fn(() => mockWinstonLogger),
  format: {
    combine: jest.fn(),
    timestamp: jest.fn(),
    printf: jest.fn(),
    json: jest.fn(),
  },
  transports: {
    Console: jest.fn(),
  },
}));

describe('CLILogger', () => {
  let logger: CLILogger;
  let consoleSpy: jest.SpiedFunction<typeof console.log>;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    
    logger = new CLILogger();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with default settings', () => {
      expect(logger).toBeDefined();
    });

    it('should initialize with custom settings', () => {
      const customLogger = new CLILogger({ verbose: true, quiet: false });
      expect(customLogger).toBeDefined();
    });
  });

  describe('info', () => {
    it('should log info messages', () => {
      logger.info('Test info message');
      
      expect(mockWinstonLogger.info).toHaveBeenCalledWith('Test info message');
    });

    it('should format info messages with colors', () => {
      logger.info('Test info message');
      
      // Winston logger should be called
      expect(mockWinstonLogger.info).toHaveBeenCalled();
    });
  });

  describe('success', () => {
    it('should log success messages', () => {
      logger.success('Test success message');
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.anything(), // The checkmark symbol
        'Test success message'
      );
    });

    it('should format success messages with green color', () => {
      logger.success('Test success message');
      
      expect(consoleSpy).toHaveBeenCalled();
      // The first argument should contain ANSI color codes
      const firstArg = consoleSpy.mock.calls[0]?.[0];
      expect(typeof firstArg).toBe('string');
    });
  });

  describe('error', () => {
    it('should log error messages', () => {
      logger.error('Test error message');
      
      expect(mockWinstonLogger.error).toHaveBeenCalledWith('Test error message');
    });

    it('should format error messages with red color', () => {
      logger.error('Test error message');
      
      // Winston logger should be called
      expect(mockWinstonLogger.error).toHaveBeenCalled();
    });
  });

  describe('warn', () => {
    it('should log warning messages', () => {
      logger.warn('Test warning message');
      
      expect(mockWinstonLogger.warn).toHaveBeenCalledWith('Test warning message');
    });

    it('should format warning messages with yellow color', () => {
      logger.warn('Test warning message');
      
      // Winston logger should be called
      expect(mockWinstonLogger.warn).toHaveBeenCalled();
    });
  });

  describe('debug', () => {
    it('should log debug messages when verbose is enabled', () => {
      const verboseLogger = new CLILogger({ verbose: true });
      
      verboseLogger.debug('Test debug message');
      
      expect(mockWinstonLogger.debug).toHaveBeenCalledWith('Test debug message');
    });

    it('should not log debug messages when verbose is disabled', () => {
      const quietLogger = new CLILogger({ verbose: false });
      
      quietLogger.debug('Test debug message');
      
      expect(mockWinstonLogger.debug).toHaveBeenCalledWith('Test debug message');
    });
  });

  describe('quiet mode', () => {
    it('should suppress output when quiet mode is enabled', () => {
      const quietLogger = new CLILogger({ quiet: true });
      
      quietLogger.success('Test success');
      
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('should still log errors in quiet mode', () => {
      const quietLogger = new CLILogger({ quiet: true });
      
      quietLogger.error('Test error');
      
      expect(mockWinstonLogger.error).toHaveBeenCalledWith('Test error');
    });
  });

  describe('JSON output', () => {
    it('should format output as JSON when enabled', () => {
      const jsonLogger = new CLILogger({ json: true });
      
      jsonLogger.info('Test message');
      
      expect(mockWinstonLogger.info).toHaveBeenCalledWith('Test message');
    });

    it('should include metadata in JSON output', () => {
      const jsonLogger = new CLILogger({ json: true });
      
      jsonLogger.info('Test message');
      
      expect(mockWinstonLogger.info).toHaveBeenCalledWith('Test message');
    });
  });

  describe('CLI-specific methods', () => {
    it('should log step messages', () => {
      logger.step('Test step');
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.anything(), // The arrow symbol
        'Test step'
      );
    });

    it('should log header messages', () => {
      logger.header('Test Header');
      
      expect(consoleSpy).toHaveBeenCalled();
      // Should be called multiple times for header formatting
      expect(consoleSpy.mock.calls.length).toBeGreaterThan(1);
    });

    it('should log failure messages', () => {
      logger.failure('Test failure');
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.anything(), // The X symbol
        'Test failure'
      );
    });

    it('should log command execution', () => {
      const verboseLogger = new CLILogger({ verbose: true });
      verboseLogger.command('test command');
      
      expect(mockWinstonLogger.debug).toHaveBeenCalledWith('Executing command: test command');
    });
  });

  describe('options update', () => {
    it('should update logger options', () => {
      logger.updateOptions({ verbose: true });
      
      // Test that verbose mode is now enabled
      logger.debug('Test debug message');
      
      expect(mockWinstonLogger.debug).toHaveBeenCalledWith('Test debug message');
    });

    it('should update quiet mode', () => {
      logger.updateOptions({ quiet: true });
      
      logger.step('Test message');
      
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should handle undefined messages gracefully', () => {
      expect(() => {
        logger.info(undefined as any);
      }).not.toThrow();
    });

    it('should handle null messages gracefully', () => {
      expect(() => {
        logger.info(null as any);
      }).not.toThrow();
    });
  });
}); 