/**
 * Run Command Tests
 * Unit tests for the run command functionality
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { RunCommand } from '../run.command';
import { CLILogger } from '../../utils/logger';

// Mock dependencies
jest.mock('../../utils/logger');
jest.mock('../../utils/error-handler');
jest.mock('child_process');

// Mock process.exit to prevent test termination
jest.spyOn(process, 'exit').mockImplementation((code?: string | number | null | undefined) => {
  throw new Error(`process.exit called with code ${code}`);
});

describe('RunCommand', () => {
  let runCommand: RunCommand;
  let mockLogger: jest.Mocked<CLILogger>;

  beforeEach(() => {
    // Create mock logger
    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
      success: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      step: jest.fn(),
      header: jest.fn(),
      failure: jest.fn(),
      command: jest.fn(),
      updateOptions: jest.fn(),
    } as any;

    (CLILogger as jest.MockedClass<typeof CLILogger>).mockImplementation(() => mockLogger);

    runCommand = new RunCommand(mockLogger);
    
    // Clear all mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with logger', () => {
      expect(runCommand).toBeDefined();
      expect(runCommand.getCommand).toBeDefined();
    });
  });

  describe('execute', () => {
    it('should run tests for valid module and scenario', async () => {
      // Mock child_process spawn BEFORE calling execute
      const { spawn } = require('child_process');
      const mockChild = {
        on: jest.fn((event: string, callback: (code: number) => void) => {
          if (event === 'close') {
            // Simulate successful test execution
            setTimeout(() => callback(0), 10);
          }
        })
      };
      spawn.mockReturnValue(mockChild);

      await runCommand.execute('clientx', 'auth');
      
      expect(mockLogger.header).toHaveBeenCalledWith('Running CLIENTX Tests');
      expect(mockLogger.info).toHaveBeenCalledWith(expect.stringContaining('Test path:'));
      expect(mockLogger.info).toHaveBeenCalledWith(expect.stringContaining('Command:'));
    });

    it('should handle missing module argument', async () => {
      try {
        await runCommand.execute('');
      } catch (error) {
        expect((error as Error).message).toContain('process.exit called with code');
      }
      
      expect(mockLogger.error).toHaveBeenCalled();
    });

    it('should handle invalid module', async () => {
      try {
        await runCommand.execute('invalidmodule');
      } catch (error) {
        expect((error as Error).message).toContain('process.exit called with code');
      }
      
      expect(mockLogger.error).toHaveBeenCalled();
    });

    it('should handle browser options', async () => {
      // Mock child_process spawn
      const { spawn } = require('child_process');
      const mockChild = {
        on: jest.fn((event: string, callback: (code: number) => void) => {
          if (event === 'close') {
            setTimeout(() => callback(0), 10);
          }
        })
      };
      spawn.mockReturnValue(mockChild);

      await runCommand.execute('clientx', 'auth', { browser: 'firefox' });
      
      expect(mockLogger.info).toHaveBeenCalledWith(expect.stringContaining('--project firefox'));
    });

    it('should handle headed mode', async () => {
      // Mock child_process spawn
      const { spawn } = require('child_process');
      const mockChild = {
        on: jest.fn((event: string, callback: (code: number) => void) => {
          if (event === 'close') {
            callback(0);
          }
        })
      };
      spawn.mockReturnValue(mockChild);

      await runCommand.execute('clientx', 'auth', { headed: true });
      
      expect(mockLogger.info).toHaveBeenCalledWith(expect.stringContaining('--headed'));
    });

    it('should handle debug mode', async () => {
      // Mock child_process spawn
      const { spawn } = require('child_process');
      const mockChild = {
        on: jest.fn((event: string, callback: (code: number) => void) => {
          if (event === 'close') {
            callback(0);
          }
        })
      };
      spawn.mockReturnValue(mockChild);

      await runCommand.execute('clientx', 'auth', { debug: true });
      
      expect(mockLogger.info).toHaveBeenCalledWith(expect.stringContaining('--debug'));
    });

    it('should handle test execution errors', async () => {
      // Mock child_process spawn to fail
      const { spawn } = require('child_process');
      const mockChild = {
        on: jest.fn((event: string, callback: (code: number) => void) => {
          if (event === 'close') {
            callback(1); // Failure
          }
        })
      };
      spawn.mockReturnValue(mockChild);

      try {
        await runCommand.execute('clientx', 'auth');
      } catch (error) {
        expect((error as Error).message).toContain('process.exit called with code');
      }
      
      expect(mockLogger.header).toHaveBeenCalled();
    });

    it('should handle UI mode', async () => {
      // Mock child_process spawn
      const { spawn } = require('child_process');
      const mockChild = {
        on: jest.fn((event: string, callback: (code: number) => void) => {
          if (event === 'close') {
            callback(0);
          }
        })
      };
      spawn.mockReturnValue(mockChild);

      await runCommand.execute('clientx', 'auth', { ui: true });
      
      expect(mockLogger.info).toHaveBeenCalledWith(expect.stringContaining('--ui'));
    });

    it('should handle trace mode', async () => {
      // Mock child_process spawn
      const { spawn } = require('child_process');
      const mockChild = {
        on: jest.fn((event: string, callback: (code: number) => void) => {
          if (event === 'close') {
            callback(0);
          }
        })
      };
      spawn.mockReturnValue(mockChild);

      await runCommand.execute('clientx', 'auth', { trace: true });
      
      expect(mockLogger.info).toHaveBeenCalledWith(expect.stringContaining('--trace on'));
    });

    it('should handle project option', async () => {
      // Mock child_process spawn
      const { spawn } = require('child_process');
      const mockChild = {
        on: jest.fn((event: string, callback: (code: number) => void) => {
          if (event === 'close') {
            callback(0);
          }
        })
      };
      spawn.mockReturnValue(mockChild);

      await runCommand.execute('clientx', 'auth', { project: 'chromium' });
      
      expect(mockLogger.info).toHaveBeenCalledWith(expect.stringContaining('--project chromium'));
    });
  });

  describe('validateModule', () => {
    it('should validate correct modules', () => {
      expect((runCommand as any).validateModule('clientx')).toBe(true);
      expect((runCommand as any).validateModule('staffx')).toBe(true);
      expect((runCommand as any).validateModule('adminx')).toBe(true);
    });

    it('should reject invalid modules', () => {
      expect((runCommand as any).validateModule('invalid')).toBe(false);
      expect((runCommand as any).validateModule('')).toBe(false);
      expect((runCommand as any).validateModule(undefined)).toBe(false);
    });
  });

  describe('validateScenario', () => {
    it('should validate correct scenarios for clientx', () => {
      expect((runCommand as any).validateScenario('auth', 'clientx')).toBe(true);
      expect((runCommand as any).validateScenario('dashboard', 'clientx')).toBe(true);
      expect((runCommand as any).validateScenario('wallet', 'clientx')).toBe(true);
    });

    it('should reject invalid scenarios', () => {
      expect((runCommand as any).validateScenario('invalid', 'clientx')).toBe(false);
      expect((runCommand as any).validateScenario('auth', 'invalid')).toBe(false);
    });
  });

  describe('error handling', () => {
    it('should handle spawn errors', async () => {
      // Mock child_process spawn to emit error
      const { spawn } = require('child_process');
      const mockChild = {
        on: jest.fn((event: string, callback: (error: Error) => void) => {
          if (event === 'error') {
            callback(new Error('Spawn error'));
          }
        })
      };
      spawn.mockReturnValue(mockChild);

      try {
        await runCommand.execute('clientx', 'auth');
      } catch (error) {
        expect((error as Error).message).toContain('process.exit called with code');
      }
    });

    it('should handle invalid scenario errors', async () => {
      try {
        await runCommand.execute('clientx', 'invalidscenario');
      } catch (error) {
        expect((error as Error).message).toContain('process.exit called with code');
      }
    });
  });
}); 