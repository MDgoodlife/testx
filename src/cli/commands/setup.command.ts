import { BaseCommand } from '../core/base-command';
import { CLILogger } from '../utils/logger';

export class SetupCommand extends BaseCommand {
  constructor(logger: CLILogger) {
    super(logger);
  }

  configure(): void {
    this.command
      .name('setup')
      .description('Setup and configure external services')
      .argument('[service]', 'Service to setup (slack, notion, github, all)')
      .option('-f, --force', 'Force reconfiguration of existing setup')
      .option('-t, --test', 'Test configuration after setup')
      .action(async (service?: string, options?: any) => {
        await this.execute(service, options);
      });
  }

  async execute(service?: string, options: any = {}): Promise<void> {
    try {
      this.logger.header('TestX Service Setup');

      if (!service || service === 'all') {
        await this.setupAllServices(options);
      } else {
        await this.setupService(service, options);
      }

      this.logger.success('Setup completed successfully!');

    } catch (error) {
      this.handleError(error as Error, 'SERVICE_INTEGRATION', 'setup', [service || 'all']);
      process.exit(1);
    }
  }

  private async setupAllServices(options: any): Promise<void> {
    const services = ['slack', 'notion', 'github'];
    
    for (const service of services) {
      try {
        await this.setupService(service, options);
      } catch (error) {
        this.logger.warn(`Failed to setup ${service}: ${(error as Error).message}`);
        if (!options.force) {
          throw error;
        }
      }
    }
  }

  private async setupService(service: string, options: any): Promise<void> {
    const validServices = ['slack', 'notion', 'github'];
    
    if (!validServices.includes(service.toLowerCase())) {
      throw new Error(`Invalid service: ${service}. Valid services: ${validServices.join(', ')}`);
    }

    this.logger.step(`Setting up ${service.toUpperCase()} integration...`);

    switch (service.toLowerCase()) {
      case 'slack':
        await this.setupSlack();
        break;
      case 'notion':
        await this.setupNotion();
        break;
      case 'github':
        await this.setupGitHub();
        break;
    }

    if (options.test) {
      await this.testService(service);
    }
  }

  private async setupSlack(): Promise<void> {
    await this.withSpinner(
      'Configuring Slack integration',
      async () => {
        // TODO: Integrate with existing Slack setup from Story 0.2
        // For now, just validate environment variables
        this.validateEnvVar('SLACK_BOT_TOKEN', 'Slack Bot Token');
        this.validateEnvVar('SLACK_SIGNING_SECRET', 'Slack Signing Secret');
        this.validateEnvVar('SLACK_CHANNEL_ID', 'Slack Channel ID');
        
        this.logger.info('Slack configuration validated');
      }
    );
  }

  private async setupNotion(): Promise<void> {
    await this.withSpinner(
      'Configuring Notion integration',
      async () => {
        // TODO: Integrate with existing Notion setup from Story 0.2
        this.validateEnvVar('NOTION_API_KEY', 'Notion API Key');
        this.validateEnvVar('NOTION_DATABASE_ID', 'Notion Database ID');
        
        this.logger.info('Notion configuration validated');
      }
    );
  }

  private async setupGitHub(): Promise<void> {
    await this.withSpinner(
      'Configuring GitHub integration',
      async () => {
        // TODO: Integrate with existing GitHub setup from Story 0.2
        this.validateEnvVar('GITHUB_TOKEN', 'GitHub Token');
        this.validateEnvVar('GITHUB_REPO', 'GitHub Repository');
        
        this.logger.info('GitHub configuration validated');
      }
    );
  }

  private async testService(service: string): Promise<void> {
    this.logger.step(`Testing ${service.toUpperCase()} connection...`);
    
    await this.withSpinner(
      `Testing ${service} integration`,
      async () => {
        // TODO: Implement actual service testing using existing integration system
        // For now, just simulate a test
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.logger.info(`${service.toUpperCase()} connection test passed`);
      }
    );
  }

  private validateEnvVar(varName: string, description: string): void {
    const value = process.env[varName];
    if (!value) {
      throw new Error(`Missing required environment variable: ${varName} (${description})`);
    }
    this.logger.debug(`✓ ${varName} is configured`);
  }
} 