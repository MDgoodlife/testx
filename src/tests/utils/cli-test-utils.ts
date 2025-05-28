/**
 * CLI Test Utilities
 * Helper functions for testing CLI commands and validating output
 */

import { spawn, SpawnOptions } from 'child_process';

export interface CLITestResult {
  exitCode: number;
  stdout: string;
  stderr: string;
  error?: Error;
}

export interface CLITestOptions {
  timeout?: number;
  env?: Record<string, string>;
  cwd?: string;
  input?: string;
}

/**
 * Execute a CLI command and capture output
 */
export async function runCLICommand(
  command: string,
  args: string[] = [],
  options: CLITestOptions = {}
): Promise<CLITestResult> {
  const { timeout = 30000, env = {}, cwd = process.cwd(), input } = options;

  return new Promise((resolve) => {
    const spawnOptions: SpawnOptions = {
      cwd,
      env: { ...process.env, ...env },
      stdio: input ? 'pipe' : 'inherit',
    };

    const child = spawn(command, args, spawnOptions);
    let stdout = '';
    let stderr = '';

    if (child.stdout) {
      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });
    }

    if (child.stderr) {
      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });
    }

    if (input && child.stdin) {
      child.stdin.write(input);
      child.stdin.end();
    }

    const timeoutId = setTimeout(() => {
      child.kill('SIGTERM');
      resolve({
        exitCode: -1,
        stdout,
        stderr,
        error: new Error(`Command timed out after ${timeout}ms`),
      });
    }, timeout);

    child.on('close', (code) => {
      clearTimeout(timeoutId);
      resolve({
        exitCode: code || 0,
        stdout,
        stderr,
      });
    });

    child.on('error', (error) => {
      clearTimeout(timeoutId);
      resolve({
        exitCode: -1,
        stdout,
        stderr,
        error,
      });
    });
  });
}

/**
 * Execute testx CLI command
 */
export async function runTestXCommand(
  args: string[] = [],
  options: CLITestOptions = {}
): Promise<CLITestResult> {
  return runCLICommand('node', ['dist/cli/index.js', ...args], options);
}

/**
 * Mock service responses for testing
 */
export class ServiceMocker {
  private mocks: Map<string, any> = new Map();

  mockSlackService(response: any = { ok: true }) {
    this.mocks.set('slack', response);
    return this;
  }

  mockNotionService(response: any = { id: 'test-db-id' }) {
    this.mocks.set('notion', response);
    return this;
  }

  mockGitHubService(response: any = { status: 200 }) {
    this.mocks.set('github', response);
    return this;
  }

  mockPlaywrightService(response: any = { success: true }) {
    this.mocks.set('playwright', response);
    return this;
  }

  getMock(service: string) {
    return this.mocks.get(service);
  }

  clear() {
    this.mocks.clear();
  }
}

/**
 * Validate CLI output patterns
 */
export class OutputValidator {
  constructor(private output: string) {}

  static fromResult(result: CLITestResult) {
    return new OutputValidator(result.stdout + result.stderr);
  }

  containsText(text: string): boolean {
    return this.output.includes(text);
  }

  containsPattern(pattern: RegExp): boolean {
    return pattern.test(this.output);
  }

  containsError(errorText: string): boolean {
    return this.output.toLowerCase().includes(errorText.toLowerCase());
  }

  containsSuccess(successText: string): boolean {
    return this.output.toLowerCase().includes(successText.toLowerCase());
  }

  hasColoredOutput(): boolean {
    // Check for ANSI color codes
    // eslint-disable-next-line no-control-regex
    const ansiColorRegex = /\x1b\[[0-9;]*m/;
    return ansiColorRegex.test(this.output);
  }

  getLines(): string[] {
    return this.output.split('\n').filter(line => line.trim().length > 0);
  }

  getErrorLines(): string[] {
    return this.getLines().filter(line => 
      line.toLowerCase().includes('error') || 
      line.toLowerCase().includes('failed') ||
      line.toLowerCase().includes('✗')
    );
  }

  getSuccessLines(): string[] {
    return this.getLines().filter(line => 
      line.toLowerCase().includes('success') || 
      line.toLowerCase().includes('complete') ||
      line.toLowerCase().includes('✓')
    );
  }
}

/**
 * Create test environment with mocked services
 */
export function createTestEnvironment(): Record<string, string> {
  return {
    NODE_ENV: 'test',
    ANYKROWD_BASE_URL: 'https://test.anykrowd.dev',
    ANYKROWD_TENANT: 'test-tenant',
    SLACK_BOT_TOKEN: 'xoxb-test-token',
    SLACK_CHANNEL_ID: 'C123456789',
    NOTION_TOKEN: 'secret_test_token',
    GITHUB_TOKEN: 'ghp_test_token',
    GOOGLE_TEST_EMAIL: 'test@example.com',
    GOOGLE_TEST_PASSWORD: 'test-password',
  };
}

/**
 * Wait for a condition to be true
 */
export async function waitFor(
  condition: () => boolean | Promise<boolean>,
  timeout: number = 5000,
  interval: number = 100
): Promise<void> {
  const start = Date.now();
  
  while (Date.now() - start < timeout) {
    if (await condition()) {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  
  throw new Error(`Condition not met within ${timeout}ms`);
}

/**
 * Create temporary test files
 */
export class TestFileManager {
  private files: string[] = [];

  async createTempFile(content: string, extension: string = '.tmp'): Promise<string> {
    const fs = await import('fs-extra');
    const path = await import('path');
    const os = await import('os');
    
    const tempDir = os.tmpdir();
    const fileName = `testx-test-${Date.now()}${extension}`;
    const filePath = path.join(tempDir, fileName);
    
    await fs.writeFile(filePath, content);
    this.files.push(filePath);
    
    return filePath;
  }

  async cleanup(): Promise<void> {
    const fs = await import('fs-extra');
    
    for (const file of this.files) {
      try {
        await fs.remove(file);
      } catch (error) {
        // Ignore cleanup errors
      }
    }
    
    this.files = [];
  }
}

export default {
  runCLICommand,
  runTestXCommand,
  ServiceMocker,
  OutputValidator,
  createTestEnvironment,
  waitFor,
  TestFileManager,
}; 