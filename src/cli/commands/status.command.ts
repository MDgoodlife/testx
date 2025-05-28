import { BaseCommand } from '../core/base-command';
import { CLILogger } from '../utils/logger';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

interface HealthStatus {
  service: string;
  status: 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
  message: string;
  lastChecked: Date;
}

export class StatusCommand extends BaseCommand {
  constructor(logger: CLILogger) {
    super(logger);
  }

  configure(): void {
    this.command
      .name('status')
      .description('Check system and service health')
      .option('-g, --global', 'Check global system health')
      .option('-s, --services', 'Check external service health')
      .option('-e, --environment', 'Check environment configuration')
      .option('-t, --tests', 'Check test environment status')
      .option('--json', 'Output in JSON format')
      .action(async (options?: any) => {
        await this.execute(options);
      });
  }

  async execute(options: any = {}): Promise<void> {
    try {
      this.logger.header('TestX System Status');

      const results: HealthStatus[] = [];

      if (options.global || (!options.services && !options.environment && !options.tests)) {
        results.push(...await this.checkGlobalHealth());
      }

      if (options.services || options.global) {
        results.push(...await this.checkServiceHealth());
      }

      if (options.environment || options.global) {
        results.push(...await this.checkEnvironmentHealth());
      }

      if (options.tests || options.global) {
        results.push(...await this.checkTestEnvironmentHealth());
      }

      this.displayResults(results, options.json);

    } catch (error) {
      this.handleError(error as Error, 'COMMAND_EXECUTION', 'status');
      process.exit(1);
    }
  }

  private async checkGlobalHealth(): Promise<HealthStatus[]> {
    const results: HealthStatus[] = [];

    // Check Node.js version
    results.push(await this.checkNodeVersion());

    // Check npm dependencies
    results.push(await this.checkDependencies());

    // Check Playwright installation
    results.push(await this.checkPlaywrightInstallation());

    // Check project structure
    results.push(await this.checkProjectStructure());

    return results;
  }

  private async checkServiceHealth(): Promise<HealthStatus[]> {
    const results: HealthStatus[] = [];

    // Check Slack integration
    results.push(await this.checkSlackHealth());

    // Check Notion integration
    results.push(await this.checkNotionHealth());

    // Check GitHub integration
    results.push(await this.checkGitHubHealth());

    return results;
  }

  private async checkEnvironmentHealth(): Promise<HealthStatus[]> {
    const results: HealthStatus[] = [];

    // Check .env file
    results.push(await this.checkEnvFile());

    // Check required environment variables
    results.push(await this.checkRequiredEnvVars());

    // Check anyKrowd connectivity
    results.push(await this.checkAnyKrowdConnectivity());

    return results;
  }

  private async checkTestEnvironmentHealth(): Promise<HealthStatus[]> {
    const results: HealthStatus[] = [];

    // Check test directories
    results.push(await this.checkTestDirectories());

    // Check authentication states
    results.push(await this.checkAuthStates());

    // Check test configuration
    results.push(await this.checkTestConfiguration());

    return results;
  }

  private async checkNodeVersion(): Promise<HealthStatus> {
    try {
      const version = process.version;
      const versionParts = version.slice(1).split('.');
      const majorVersionStr = versionParts[0];
      
      if (!majorVersionStr) {
        throw new Error('Unable to parse Node.js version');
      }
      
      const majorVersion = parseInt(majorVersionStr);
      
      if (majorVersion >= 18) {
        return {
          service: 'Node.js',
          status: 'healthy',
          message: `Version ${version} (✓ >= 18.0.0)`,
          lastChecked: new Date()
        };
      } else {
        return {
          service: 'Node.js',
          status: 'unhealthy',
          message: `Version ${version} (✗ < 18.0.0 required)`,
          lastChecked: new Date()
        };
      }
    } catch (error) {
      return {
        service: 'Node.js',
        status: 'unknown',
        message: `Failed to check version: ${(error as Error).message}`,
        lastChecked: new Date()
      };
    }
  }

  private async checkDependencies(): Promise<HealthStatus> {
    try {
      const packageJsonPath = path.join(process.cwd(), 'package.json');
      const nodeModulesPath = path.join(process.cwd(), 'node_modules');
      
      if (!fs.existsSync(packageJsonPath)) {
        return {
          service: 'Dependencies',
          status: 'unhealthy',
          message: 'package.json not found',
          lastChecked: new Date()
        };
      }

      if (!fs.existsSync(nodeModulesPath)) {
        return {
          service: 'Dependencies',
          status: 'unhealthy',
          message: 'node_modules not found - run npm install',
          lastChecked: new Date()
        };
      }

      return {
        service: 'Dependencies',
        status: 'healthy',
        message: 'All dependencies installed',
        lastChecked: new Date()
      };
    } catch (error) {
      return {
        service: 'Dependencies',
        status: 'unknown',
        message: `Failed to check: ${(error as Error).message}`,
        lastChecked: new Date()
      };
    }
  }

  private async checkPlaywrightInstallation(): Promise<HealthStatus> {
    return new Promise((resolve) => {
      const child = spawn('npx', ['playwright', '--version'], { 
        stdio: 'pipe',
        shell: true 
      });

      let output = '';
      child.stdout?.on('data', (data) => {
        output += data.toString();
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve({
            service: 'Playwright',
            status: 'healthy',
            message: `Installed: ${output.trim()}`,
            lastChecked: new Date()
          });
        } else {
          resolve({
            service: 'Playwright',
            status: 'unhealthy',
            message: 'Not installed - run npx playwright install',
            lastChecked: new Date()
          });
        }
      });

      child.on('error', () => {
        resolve({
          service: 'Playwright',
          status: 'unhealthy',
          message: 'Not installed - run npx playwright install',
          lastChecked: new Date()
        });
      });
    });
  }

  private async checkProjectStructure(): Promise<HealthStatus> {
    const requiredDirs = [
      'src/tests/clientx',
      'src/lib/pages',
      'src/lib/integrations',
      'config'
    ];

    const missingDirs = requiredDirs.filter(dir => !fs.existsSync(dir));

    if (missingDirs.length === 0) {
      return {
        service: 'Project Structure',
        status: 'healthy',
        message: 'All required directories present',
        lastChecked: new Date()
      };
    } else {
      return {
        service: 'Project Structure',
        status: 'degraded',
        message: `Missing directories: ${missingDirs.join(', ')}`,
        lastChecked: new Date()
      };
    }
  }

  private async checkSlackHealth(): Promise<HealthStatus> {
    const requiredVars = ['SLACK_BOT_TOKEN', 'SLACK_SIGNING_SECRET', 'SLACK_CHANNEL_ID'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);

    if (missingVars.length === 0) {
      return {
        service: 'Slack',
        status: 'healthy',
        message: 'Configuration complete',
        lastChecked: new Date()
      };
    } else {
      return {
        service: 'Slack',
        status: 'unhealthy',
        message: `Missing env vars: ${missingVars.join(', ')}`,
        lastChecked: new Date()
      };
    }
  }

  private async checkNotionHealth(): Promise<HealthStatus> {
    const requiredVars = ['NOTION_API_KEY', 'NOTION_DATABASE_ID'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);

    if (missingVars.length === 0) {
      return {
        service: 'Notion',
        status: 'healthy',
        message: 'Configuration complete',
        lastChecked: new Date()
      };
    } else {
      return {
        service: 'Notion',
        status: 'unhealthy',
        message: `Missing env vars: ${missingVars.join(', ')}`,
        lastChecked: new Date()
      };
    }
  }

  private async checkGitHubHealth(): Promise<HealthStatus> {
    const requiredVars = ['GITHUB_TOKEN', 'GITHUB_REPO'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);

    if (missingVars.length === 0) {
      return {
        service: 'GitHub',
        status: 'healthy',
        message: 'Configuration complete',
        lastChecked: new Date()
      };
    } else {
      return {
        service: 'GitHub',
        status: 'unhealthy',
        message: `Missing env vars: ${missingVars.join(', ')}`,
        lastChecked: new Date()
      };
    }
  }

  private async checkEnvFile(): Promise<HealthStatus> {
    const envPath = path.join(process.cwd(), '.env');
    
    if (fs.existsSync(envPath)) {
      return {
        service: 'Environment File',
        status: 'healthy',
        message: '.env file exists',
        lastChecked: new Date()
      };
    } else {
      return {
        service: 'Environment File',
        status: 'unhealthy',
        message: '.env file missing - copy from .env.example',
        lastChecked: new Date()
      };
    }
  }

  private async checkRequiredEnvVars(): Promise<HealthStatus> {
    const requiredVars = [
      'ANYKROWD_BASE_URL',
      'ANYKROWD_TENANT',
      'GOOGLE_TEST_EMAIL'
    ];

    const missingVars = requiredVars.filter(varName => !process.env[varName]);

    if (missingVars.length === 0) {
      return {
        service: 'Environment Variables',
        status: 'healthy',
        message: 'All required variables configured',
        lastChecked: new Date()
      };
    } else {
      return {
        service: 'Environment Variables',
        status: 'unhealthy',
        message: `Missing: ${missingVars.join(', ')}`,
        lastChecked: new Date()
      };
    }
  }

  private async checkAnyKrowdConnectivity(): Promise<HealthStatus> {
    // TODO: Implement actual connectivity check
    return {
      service: 'anyKrowd Connectivity',
      status: 'unknown',
      message: 'Connectivity check not implemented',
      lastChecked: new Date()
    };
  }

  private async checkTestDirectories(): Promise<HealthStatus> {
    const testDirs = ['src/tests/clientx', 'src/tests/staffx', 'src/tests/adminx'];
    const existingDirs = testDirs.filter(dir => fs.existsSync(dir));

    if (existingDirs.length > 0) {
      return {
        service: 'Test Directories',
        status: 'healthy',
        message: `Found: ${existingDirs.join(', ')}`,
        lastChecked: new Date()
      };
    } else {
      return {
        service: 'Test Directories',
        status: 'unhealthy',
        message: 'No test directories found',
        lastChecked: new Date()
      };
    }
  }

  private async checkAuthStates(): Promise<HealthStatus> {
    const authDir = 'playwright/.auth';
    
    if (fs.existsSync(authDir)) {
      const authFiles = fs.readdirSync(authDir).filter(file => file.endsWith('.json'));
      return {
        service: 'Authentication States',
        status: authFiles.length > 0 ? 'healthy' : 'degraded',
        message: `Found ${authFiles.length} auth state(s)`,
        lastChecked: new Date()
      };
    } else {
      return {
        service: 'Authentication States',
        status: 'degraded',
        message: 'Auth directory not found',
        lastChecked: new Date()
      };
    }
  }

  private async checkTestConfiguration(): Promise<HealthStatus> {
    const configPath = 'playwright.config.ts';
    
    if (fs.existsSync(configPath)) {
      return {
        service: 'Test Configuration',
        status: 'healthy',
        message: 'Playwright config found',
        lastChecked: new Date()
      };
    } else {
      return {
        service: 'Test Configuration',
        status: 'unhealthy',
        message: 'playwright.config.ts not found',
        lastChecked: new Date()
      };
    }
  }

  private displayResults(results: HealthStatus[], jsonOutput: boolean = false): void {
    if (jsonOutput) {
      console.log(JSON.stringify(results, null, 2));
      return;
    }

    const healthyCount = results.filter(r => r.status === 'healthy').length;
    const totalCount = results.length;

    this.logger.info(`Overall Health: ${healthyCount}/${totalCount} services healthy`);
    this.logger.info('');

    results.forEach(result => {
      const statusIcon = this.getStatusIcon(result.status);
      const statusColor = this.getStatusColor(result.status);
      
      this.logger.info(`${statusIcon} ${result.service}: ${statusColor(result.message)}`);
    });

    this.logger.info('');
    
    if (healthyCount < totalCount) {
      this.logger.warn('Some services need attention. Run with --verbose for more details.');
    } else {
      this.logger.success('All systems operational!');
    }
  }

  private getStatusIcon(status: string): string {
    switch (status) {
      case 'healthy': return '✅';
      case 'degraded': return '⚠️';
      case 'unhealthy': return '❌';
      case 'unknown': return '❓';
      default: return '❓';
    }
  }

  private getStatusColor(status: string): (text: string) => string {
    const chalk = require('chalk');
    switch (status) {
      case 'healthy': return chalk.green;
      case 'degraded': return chalk.yellow;
      case 'unhealthy': return chalk.red;
      case 'unknown': return chalk.gray;
      default: return chalk.gray;
    }
  }
} 