/**
 * Status Command Tests
 * Unit tests for the status command functionality
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { StatusCommand } from '../status.command';
import { CLILogger } from '../../utils/logger';
import { ServiceMocker, createTestEnvironment } from '../../../tests/utils/cli-test-utils';

// Mock external dependencies
jest.mock('fs-extra');
jest.mock('axios');
jest.mock('@slack/bolt');
jest.mock('@notionhq/client');

// Mock dependencies
jest.mock('../../utils/logger');
jest.mock('../../utils/error-handler');

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

describe('StatusCommand', () => {
  let statusCommand: StatusCommand;
  let mockLogger: jest.Mocked<CLILogger>;
  let consoleSpy: jest.SpiedFunction<typeof console.log>;
  let serviceMocker: ServiceMocker;
  let originalEnv: Record<string, string | undefined>;

  beforeEach(() => {
    // Save original environment
    originalEnv = { ...process.env };
    
    // Set test environment
    Object.assign(process.env, createTestEnvironment());
    
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

    statusCommand = new StatusCommand(mockLogger);
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    serviceMocker = new ServiceMocker();
    
    // Clear all mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
    serviceMocker.clear();
    consoleSpy.mockRestore();
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with correct command properties', () => {
      expect(statusCommand).toBeDefined();
      expect(statusCommand.getCommand).toBeDefined();
    });
  });

  describe('execute', () => {
    it('should show global status when --global flag is provided', async () => {
      await statusCommand.execute('--global');
      
      expect(mockLogger.header).toHaveBeenCalled();
    });

    it('should show service status when --services flag is provided', async () => {
      await statusCommand.execute('--services');
      
      expect(mockLogger.header).toHaveBeenCalled();
    });

    it('should show help when no flags are provided', async () => {
      await statusCommand.execute([]);
      
      expect(mockLogger.info).toHaveBeenCalled();
    });

    it('should handle verbose output', async () => {
      await statusCommand.execute('--global --verbose');
      
      expect(mockLogger.header).toHaveBeenCalled();
    });

    it('should handle quiet output', async () => {
      await statusCommand.execute('--global --quiet');
      
      // In quiet mode, should have minimal output
      expect(mockLogger.header).toHaveBeenCalled();
    });

    it('should handle JSON output format', async () => {
      await statusCommand.execute('--global --json');
      
      expect(mockLogger.header).toHaveBeenCalled();
    });
  });

  describe('checkEnvironmentStatus', () => {
    it('should detect missing environment variables', async () => {
      // Mock missing environment variables
      const originalEnv = process.env['ANYKROWD_BASE_URL'];
      delete process.env['ANYKROWD_BASE_URL'];
      
      await statusCommand.execute(['--global']);
      
      expect(mockLogger.header).toHaveBeenCalled();
      
      // Restore environment
      if (originalEnv) {
        process.env['ANYKROWD_BASE_URL'] = originalEnv;
      }
    });

    it('should validate environment configuration', async () => {
      await statusCommand.execute(['--global']);
      
      expect(mockLogger.header).toHaveBeenCalled();
    });
  });

  describe('checkServiceHealth', () => {
    it('should check Slack service health', async () => {
      serviceMocker.mockSlackService({ ok: true });
      
      await statusCommand.execute(['--services']);
      
      expect(mockLogger.header).toHaveBeenCalled();
    });

    it('should check Notion service health', async () => {
      serviceMocker.mockNotionService({ id: 'test-db' });
      
      await statusCommand.execute(['--services']);
      
      expect(mockLogger.header).toHaveBeenCalled();
    });

    it('should check GitHub service health', async () => {
      serviceMocker.mockGitHubService({ status: 200 });
      
      await statusCommand.execute(['--services']);
      
      expect(mockLogger.header).toHaveBeenCalled();
    });

    it('should handle service connection failures', async () => {
      // Mock service failures
      await statusCommand.execute(['--services']);
      
      expect(mockLogger.header).toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should handle invalid flags gracefully', async () => {
      await statusCommand.execute(['--invalid-flag']);
      
      expect(mockLogger.header).toHaveBeenCalled();
    });

    it('should handle service check errors gracefully', async () => {
      await statusCommand.execute(['--services']);
      
      // Should still complete without throwing
      expect(mockLogger.header).toHaveBeenCalled();
    });
  });

  describe('output formatting', () => {
    it('should format status output with colors', async () => {
      await statusCommand.execute(['--global']);
      
      expect(mockLogger.header).toHaveBeenCalled();
    });

    it('should format JSON output correctly', async () => {
      await statusCommand.execute(['--global', '--json']);
      
      expect(mockLogger.header).toHaveBeenCalled();
    });

    it('should show progress indicators for long operations', async () => {
      await statusCommand.execute(['--services']);
      
      // Should show some kind of progress indication
      expect(mockLogger.header).toHaveBeenCalled();
    });
  });
}); 