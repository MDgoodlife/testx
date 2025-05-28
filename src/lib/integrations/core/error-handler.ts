/**
 * Comprehensive error handling system for TestX external service integrations
 * Provides clear error messages, troubleshooting guidance, and diagnostic tools
 */

import {
  ServiceType,
  IntegrationError,
  ServiceConfiguration
} from './integration-types';

export interface ErrorContext {
  service: ServiceType;
  operation: string;
  timestamp: Date;
  errorCode?: string;
  httpStatus?: number;
  requestId?: string;
  metadata?: Record<string, any>;
}

export interface TroubleshootingStep {
  step: number;
  description: string;
  action: string;
  expectedResult: string;
  troubleshootingUrl?: string;
}

export interface ErrorResolution {
  errorType: string;
  description: string;
  commonCauses: string[];
  troubleshootingSteps: TroubleshootingStep[];
  preventionTips: string[];
  escalationRequired: boolean;
}

export interface DiagnosticResult {
  service: ServiceType;
  timestamp: Date;
  status: 'healthy' | 'degraded' | 'unhealthy';
  checks: DiagnosticCheck[];
  recommendations: string[];
  errorSummary?: string;
}

export interface DiagnosticCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  details?: Record<string, any>;
}

export class IntegrationErrorHandler {
  private errorResolutions: Map<string, ErrorResolution> = new Map();
  private errorHistory: ErrorContext[] = [];
  private maxHistorySize = 1000;

  constructor() {
    this.initializeErrorResolutions();
  }

  /**
   * Handle an integration error with context and provide resolution guidance
   */
  public handleError(error: Error | IntegrationError, context: ErrorContext): {
    errorMessage: string;
    resolution: ErrorResolution | null;
    diagnosticSteps: string[];
  } {
    // Add to error history
    this.addToErrorHistory(context);

    // Determine error type
    const errorType = this.categorizeError(error, context);
    
    // Get resolution guidance
    const resolution = this.errorResolutions.get(errorType) || null;

    // Generate clear error message
    const errorMessage = this.generateErrorMessage(error, context);

    // Generate diagnostic steps
    const diagnosticSteps = this.generateDiagnosticSteps(context, errorType);

    // Log error with AI-friendly context
    this.logErrorForAI(error, context, errorType, resolution);

    return {
      errorMessage,
      resolution,
      diagnosticSteps
    };
  }

  /**
   * Run comprehensive diagnostics for a service
   */
  public async runDiagnostics(
    service: ServiceType,
    serviceConfig: ServiceConfiguration
  ): Promise<DiagnosticResult> {
    const checks: DiagnosticCheck[] = [];
    const recommendations: string[] = [];
    let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';

    // Check 1: Service configuration
    const configCheck = this.checkServiceConfiguration(serviceConfig);
    checks.push(configCheck);
    if (configCheck.status === 'fail') overallStatus = 'unhealthy';

    // Check 2: Network connectivity
    const networkCheck = await this.checkNetworkConnectivity(serviceConfig);
    checks.push(networkCheck);
    if (networkCheck.status === 'fail') overallStatus = 'unhealthy';

    // Check 3: Authentication
    const authCheck = await this.checkAuthentication(serviceConfig);
    checks.push(authCheck);
    if (authCheck.status === 'fail') overallStatus = 'unhealthy';

    // Check 4: API rate limits
    const rateLimitCheck = await this.checkRateLimits(service);
    checks.push(rateLimitCheck);
    if (rateLimitCheck.status === 'warning' && overallStatus === 'healthy') {
      overallStatus = 'degraded';
    }

    // Check 5: Service-specific checks
    const serviceSpecificChecks = await this.runServiceSpecificChecks(service, serviceConfig);
    checks.push(...serviceSpecificChecks);

    // Generate recommendations
    recommendations.push(...this.generateRecommendations(checks, service));

    // Generate error summary if unhealthy
    const errorSummary = overallStatus === 'unhealthy' 
      ? `${checks.filter(check => check.status === 'fail').length} critical issues found: ${checks.filter(check => check.status === 'fail').map(c => c.name).join(', ')}`
      : undefined;

    const result: DiagnosticResult = {
      service,
      timestamp: new Date(),
      status: overallStatus,
      checks,
      recommendations
    };

    if (errorSummary) {
      result.errorSummary = errorSummary;
    }

    return result;
  }

  /**
   * Get error statistics for a service
   */
  public getErrorStatistics(service?: ServiceType): {
    totalErrors: number;
    errorsByType: Record<string, number>;
    recentErrors: ErrorContext[];
    topErrors: Array<{ type: string; count: number }>;
  } {
    const relevantErrors = service 
      ? this.errorHistory.filter(e => e.service === service)
      : this.errorHistory;

    const errorsByType: Record<string, number> = {};
    relevantErrors.forEach(error => {
      const type = this.categorizeError(new Error(error.operation), error);
      errorsByType[type] = (errorsByType[type] || 0) + 1;
    });

    const topErrors = Object.entries(errorsByType)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const recentErrors = relevantErrors
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 10);

    return {
      totalErrors: relevantErrors.length,
      errorsByType,
      recentErrors,
      topErrors
    };
  }

  /**
   * Initialize error resolution database
   */
  private initializeErrorResolutions(): void {
    // Slack integration errors
    this.errorResolutions.set('slack_auth_failed', {
      errorType: 'slack_auth_failed',
      description: 'Failed to authenticate with Slack API',
      commonCauses: [
        'Invalid or expired Slack bot token',
        'Insufficient bot permissions',
        'Slack workspace restrictions',
        'Network connectivity issues'
      ],
      troubleshootingSteps: [
        {
          step: 1,
          description: 'Verify Slack bot token',
          action: 'Check SLACK_BOT_TOKEN environment variable',
          expectedResult: 'Token should start with xoxb- and be valid',
          troubleshootingUrl: 'https://api.slack.com/authentication/token-types'
        },
        {
          step: 2,
          description: 'Check bot permissions',
          action: 'Verify bot has required OAuth scopes in Slack app settings',
          expectedResult: 'Bot should have chat:write, channels:read permissions',
          troubleshootingUrl: 'https://api.slack.com/scopes'
        },
        {
          step: 3,
          description: 'Test API connectivity',
          action: 'Run: curl -H "Authorization: Bearer $SLACK_BOT_TOKEN" https://slack.com/api/auth.test',
          expectedResult: 'Should return {"ok": true} with user info'
        }
      ],
      preventionTips: [
        'Regularly rotate Slack bot tokens',
        'Monitor token expiration dates',
        'Use environment-specific tokens',
        'Implement token validation in CI/CD'
      ],
      escalationRequired: false
    });

    // Notion integration errors
    this.errorResolutions.set('notion_auth_failed', {
      errorType: 'notion_auth_failed',
      description: 'Failed to authenticate with Notion API',
      commonCauses: [
        'Invalid or expired Notion integration token',
        'Insufficient integration permissions',
        'Database access restrictions',
        'Rate limiting'
      ],
      troubleshootingSteps: [
        {
          step: 1,
          description: 'Verify Notion integration token',
          action: 'Check NOTION_TOKEN environment variable',
          expectedResult: 'Token should start with secret_ and be valid',
          troubleshootingUrl: 'https://developers.notion.com/docs/authorization'
        },
        {
          step: 2,
          description: 'Check database permissions',
          action: 'Verify integration has access to target databases',
          expectedResult: 'Integration should appear in database sharing settings'
        },
        {
          step: 3,
          description: 'Test API connectivity',
          action: 'Run: curl -H "Authorization: Bearer $NOTION_TOKEN" https://api.notion.com/v1/users/me',
          expectedResult: 'Should return user information'
        }
      ],
      preventionTips: [
        'Use workspace-level integrations when possible',
        'Monitor API rate limits',
        'Implement proper error handling for rate limits',
        'Cache database schemas to reduce API calls'
      ],
      escalationRequired: false
    });

    // GitHub integration errors
    this.errorResolutions.set('github_auth_failed', {
      errorType: 'github_auth_failed',
      description: 'Failed to authenticate with GitHub API',
      commonCauses: [
        'Invalid or expired GitHub personal access token',
        'Insufficient token permissions',
        'Repository access restrictions',
        'Rate limiting'
      ],
      troubleshootingSteps: [
        {
          step: 1,
          description: 'Verify GitHub token',
          action: 'Check GITHUB_TOKEN environment variable',
          expectedResult: 'Token should be valid GitHub PAT',
          troubleshootingUrl: 'https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
        },
        {
          step: 2,
          description: 'Check token permissions',
          action: 'Verify token has required scopes (repo, workflow)',
          expectedResult: 'Token should have necessary permissions for repository operations'
        },
        {
          step: 3,
          description: 'Test API connectivity',
          action: 'Run: curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user',
          expectedResult: 'Should return authenticated user information'
        }
      ],
      preventionTips: [
        'Use fine-grained personal access tokens',
        'Regularly rotate GitHub tokens',
        'Monitor token expiration dates',
        'Use GitHub Apps for organization-wide access'
      ],
      escalationRequired: false
    });

    // anyKrowd environment errors
    this.errorResolutions.set('anykrowd_connection_failed', {
      errorType: 'anykrowd_connection_failed',
      description: 'Failed to connect to anyKrowd environment',
      commonCauses: [
        'anyKrowd environment not accessible',
        'Network connectivity issues',
        'Environment configuration problems',
        'Authentication failures'
      ],
      troubleshootingSteps: [
        {
          step: 1,
          description: 'Check environment URL',
          action: 'Verify ANYKROWD_BASE_URL is correct and accessible',
          expectedResult: 'URL should be reachable and return valid response'
        },
        {
          step: 2,
          description: 'Test network connectivity',
          action: 'Run: curl -I $ANYKROWD_BASE_URL/api/health',
          expectedResult: 'Should return HTTP 200 status'
        },
        {
          step: 3,
          description: 'Check authentication',
          action: 'Verify anyKrowd credentials are valid',
          expectedResult: 'Authentication should succeed'
        }
      ],
      preventionTips: [
        'Monitor anyKrowd environment health',
        'Implement proper timeout handling',
        'Use environment-specific configurations',
        'Set up monitoring alerts'
      ],
      escalationRequired: true
    });

    // Network and connectivity errors
    this.errorResolutions.set('network_timeout', {
      errorType: 'network_timeout',
      description: 'Network request timed out',
      commonCauses: [
        'Slow network connectivity',
        'Service overload',
        'Firewall restrictions',
        'DNS resolution issues'
      ],
      troubleshootingSteps: [
        {
          step: 1,
          description: 'Check network connectivity',
          action: 'Test internet connection and DNS resolution',
          expectedResult: 'Network should be stable and DNS working'
        },
        {
          step: 2,
          description: 'Verify service status',
          action: 'Check service status pages for outages',
          expectedResult: 'Services should be operational'
        },
        {
          step: 3,
          description: 'Adjust timeout settings',
          action: 'Increase timeout values in configuration',
          expectedResult: 'Requests should complete within timeout'
        }
      ],
      preventionTips: [
        'Implement exponential backoff',
        'Use appropriate timeout values',
        'Monitor network performance',
        'Implement circuit breaker pattern'
      ],
      escalationRequired: false
    });

    // Rate limiting errors
    this.errorResolutions.set('rate_limit_exceeded', {
      errorType: 'rate_limit_exceeded',
      description: 'API rate limit exceeded',
      commonCauses: [
        'Too many requests in short time period',
        'Inefficient API usage patterns',
        'Multiple instances making requests',
        'Lack of request throttling'
      ],
      troubleshootingSteps: [
        {
          step: 1,
          description: 'Check rate limit headers',
          action: 'Review API response headers for rate limit information',
          expectedResult: 'Should show current usage and reset time'
        },
        {
          step: 2,
          description: 'Implement request throttling',
          action: 'Add delays between API requests',
          expectedResult: 'Request rate should stay within limits'
        },
        {
          step: 3,
          description: 'Optimize API usage',
          action: 'Batch requests and cache responses where possible',
          expectedResult: 'Reduced number of API calls'
        }
      ],
      preventionTips: [
        'Implement request queuing',
        'Use caching to reduce API calls',
        'Monitor rate limit usage',
        'Implement exponential backoff'
      ],
      escalationRequired: false
    });
  }

  /**
   * Categorize error based on error object and context
   */
  private categorizeError(error: Error | IntegrationError, context: ErrorContext): string {
    const message = error.message.toLowerCase();
    const { service, httpStatus } = context;

    // HTTP status-based categorization
    if (httpStatus === 401 || httpStatus === 403) {
      return `${service.toLowerCase()}_auth_failed`;
    }
    if (httpStatus === 429) {
      return 'rate_limit_exceeded';
    }
    if (httpStatus && httpStatus >= 500) {
      return `${service.toLowerCase()}_server_error`;
    }

    // Message-based categorization
    if (message.includes('timeout') || message.includes('timed out')) {
      return 'network_timeout';
    }
    if (message.includes('network') || message.includes('connection')) {
      return `${service.toLowerCase()}_connection_failed`;
    }
    if (message.includes('auth') || message.includes('token') || message.includes('unauthorized')) {
      return `${service.toLowerCase()}_auth_failed`;
    }
    if (message.includes('rate limit') || message.includes('too many requests')) {
      return 'rate_limit_exceeded';
    }

    // Default categorization
    return `${service.toLowerCase()}_unknown_error`;
  }

  /**
   * Generate clear, actionable error message
   */
  private generateErrorMessage(error: Error | IntegrationError, context: ErrorContext): string {
    const { service, operation, timestamp, httpStatus, requestId } = context;
    
    let message = `[${service}] ${operation} failed at ${timestamp.toISOString()}`;
    
    if (httpStatus) {
      message += ` (HTTP ${httpStatus})`;
    }
    
    if (requestId) {
      message += ` [Request ID: ${requestId}]`;
    }
    
    message += `\nError: ${error.message}`;
    
    return message;
  }

  /**
   * Generate diagnostic steps for troubleshooting
   */
  private generateDiagnosticSteps(context: ErrorContext, errorType: string): string[] {
    const steps = [
      `1. Check ${context.service} service status and connectivity`,
      `2. Verify authentication credentials for ${context.service}`,
      `3. Review recent error patterns for ${context.service}`,
      `4. Check network connectivity and firewall settings`
    ];

    // Add error-type specific steps
    const resolution = this.errorResolutions.get(errorType);
    if (resolution) {
      steps.push(...resolution.troubleshootingSteps.map(step => 
        `${step.step + 4}. ${step.description}: ${step.action}`
      ));
    }

    return steps;
  }

  /**
   * Log error with AI-friendly context for debugging
   */
  private logErrorForAI(
    error: Error | IntegrationError,
    context: ErrorContext,
    errorType: string,
    resolution: ErrorResolution | null
  ): void {
    const logEntry = {
      timestamp: context.timestamp.toISOString(),
      service: context.service,
      operation: context.operation,
      errorType,
      errorMessage: error.message,
      httpStatus: context.httpStatus,
      requestId: context.requestId,
      metadata: context.metadata,
      resolution: resolution ? {
        description: resolution.description,
        escalationRequired: resolution.escalationRequired,
        troubleshootingSteps: resolution.troubleshootingSteps.length
      } : null,
      aiContext: {
        category: 'integration_error',
        severity: this.determineSeverity(errorType),
        actionable: resolution !== null,
        autoRecoverable: this.isAutoRecoverable(errorType)
      }
    };

    console.error('[TestX Integration Error]', JSON.stringify(logEntry, null, 2));
  }

  /**
   * Add error to history with size management
   */
  private addToErrorHistory(context: ErrorContext): void {
    this.errorHistory.push(context);
    
    // Maintain history size limit
    if (this.errorHistory.length > this.maxHistorySize) {
      this.errorHistory = this.errorHistory.slice(-this.maxHistorySize);
    }
  }

  /**
   * Check service configuration
   */
  private checkServiceConfiguration(config: ServiceConfiguration): DiagnosticCheck {
    const issues: string[] = [];
    
    if (!config.enabled) {
      return {
        name: 'Service Configuration',
        status: 'warning',
        message: 'Service is disabled in configuration',
        details: { enabled: false }
      };
    }

    if (!config.healthCheck?.url) {
      issues.push('Missing health check URL');
    }

    if (issues.length > 0) {
      return {
        name: 'Service Configuration',
        status: 'fail',
        message: `Configuration issues: ${issues.join(', ')}`,
        details: { issues }
      };
    }

    return {
      name: 'Service Configuration',
      status: 'pass',
      message: 'Service configuration is valid'
    };
  }

  /**
   * Check network connectivity
   */
  private async checkNetworkConnectivity(config: ServiceConfiguration): Promise<DiagnosticCheck> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(config.healthCheck.url, {
        method: 'HEAD',
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok || response.status === 405) { // 405 is acceptable for HEAD requests
        return {
          name: 'Network Connectivity',
          status: 'pass',
          message: 'Network connectivity is working',
          details: { status: response.status, url: config.healthCheck.url }
        };
      } else {
        return {
          name: 'Network Connectivity',
          status: 'fail',
          message: `Network request failed with status ${response.status}`,
          details: { status: response.status, url: config.healthCheck.url }
        };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        name: 'Network Connectivity',
        status: 'fail',
        message: `Network connectivity failed: ${errorMessage}`,
        details: { error: errorMessage, url: config.healthCheck.url }
      };
    }
  }

  /**
   * Check authentication
   */
  private async checkAuthentication(config: ServiceConfiguration): Promise<DiagnosticCheck> {
    // For now, just check if health check is configured
    // Real implementation would check actual auth tokens
    return {
      name: 'Authentication',
      status: 'pass',
      message: 'Authentication configuration check passed',
      details: { hasHealthCheck: !!config.healthCheck }
    };
  }

  /**
   * Check rate limits
   */
  private async checkRateLimits(service: ServiceType): Promise<DiagnosticCheck> {
    // This would check recent request patterns and rate limit status
    // For now, return a basic check
    const recentErrors = this.errorHistory
      .filter(e => e.service === service && e.timestamp > new Date(Date.now() - 3600000))
      .filter(e => this.categorizeError(new Error(e.operation), e) === 'rate_limit_exceeded');

    if (recentErrors.length > 0) {
      return {
        name: 'Rate Limits',
        status: 'warning',
        message: `${recentErrors.length} rate limit errors in the last hour`,
        details: { recentRateLimitErrors: recentErrors.length }
      };
    }

    return {
      name: 'Rate Limits',
      status: 'pass',
      message: 'No recent rate limit issues detected'
    };
  }

  /**
   * Run service-specific diagnostic checks
   */
  private async runServiceSpecificChecks(
    service: ServiceType,
    config: ServiceConfiguration
  ): Promise<DiagnosticCheck[]> {
    const checks: DiagnosticCheck[] = [];

    switch (service) {
      case ServiceType.SLACK:
        checks.push(await this.checkSlackSpecific(config));
        break;
      case ServiceType.NOTION:
        checks.push(await this.checkNotionSpecific(config));
        break;
      case ServiceType.GITHUB:
        checks.push(await this.checkGitHubSpecific(config));
        break;
      case ServiceType.ANYKROWD:
        checks.push(await this.checkAnyKrowdSpecific(config));
        break;
    }

    return checks;
  }

  /**
   * Slack-specific diagnostic checks
   */
  private async checkSlackSpecific(config: ServiceConfiguration): Promise<DiagnosticCheck> {
    // Check if health check URL is Slack-specific
    if (!config.healthCheck.url.includes('slack.com')) {
      return {
        name: 'Slack Configuration',
        status: 'fail',
        message: 'Health check URL should be for Slack API'
      };
    }

    return {
      name: 'Slack Configuration',
      status: 'pass',
      message: 'Slack configuration appears correct'
    };
  }

  /**
   * Notion-specific diagnostic checks
   */
  private async checkNotionSpecific(config: ServiceConfiguration): Promise<DiagnosticCheck> {
    if (!config.healthCheck.url.includes('notion.com')) {
      return {
        name: 'Notion Configuration',
        status: 'fail',
        message: 'Health check URL should be for Notion API'
      };
    }

    return {
      name: 'Notion Configuration',
      status: 'pass',
      message: 'Notion configuration appears correct'
    };
  }

  /**
   * GitHub-specific diagnostic checks
   */
  private async checkGitHubSpecific(config: ServiceConfiguration): Promise<DiagnosticCheck> {
    if (!config.healthCheck.url.includes('github.com')) {
      return {
        name: 'GitHub Configuration',
        status: 'fail',
        message: 'Health check URL should be for GitHub API'
      };
    }

    return {
      name: 'GitHub Configuration',
      status: 'pass',
      message: 'GitHub configuration appears correct'
    };
  }

  /**
   * anyKrowd-specific diagnostic checks
   */
  private async checkAnyKrowdSpecific(config: ServiceConfiguration): Promise<DiagnosticCheck> {
    if (!config.healthCheck.url.includes('anykrowd')) {
      return {
        name: 'anyKrowd Configuration',
        status: 'fail',
        message: 'Health check URL should be for anyKrowd environment'
      };
    }

    return {
      name: 'anyKrowd Configuration',
      status: 'pass',
      message: 'anyKrowd configuration appears correct'
    };
  }

  /**
   * Generate recommendations based on diagnostic results
   */
  private generateRecommendations(checks: DiagnosticCheck[], service: ServiceType): string[] {
    const recommendations: string[] = [];
    const failedChecks = checks.filter(check => check.status === 'fail');
    const warningChecks = checks.filter(check => check.status === 'warning');

    if (failedChecks.length > 0) {
      recommendations.push(`Address ${failedChecks.length} critical issues before proceeding`);
      failedChecks.forEach(check => {
        recommendations.push(`Fix ${check.name}: ${check.message}`);
      });
    }

    if (warningChecks.length > 0) {
      recommendations.push(`Review ${warningChecks.length} warnings for optimal performance`);
    }

    // Service-specific recommendations
    switch (service) {
      case ServiceType.SLACK:
        recommendations.push('Consider using Slack Socket Mode for real-time events');
        break;
      case ServiceType.NOTION:
        recommendations.push('Implement caching to reduce API calls and avoid rate limits');
        break;
      case ServiceType.GITHUB:
        recommendations.push('Use GitHub Apps instead of PATs for organization-wide access');
        break;
      case ServiceType.ANYKROWD:
        recommendations.push('Set up health monitoring for anyKrowd environment');
        break;
    }

    return recommendations;
  }

  /**
   * Determine error severity
   */
  private determineSeverity(errorType: string): 'low' | 'medium' | 'high' | 'critical' {
    if (errorType.includes('auth_failed')) return 'high';
    if (errorType.includes('connection_failed')) return 'high';
    if (errorType.includes('server_error')) return 'medium';
    if (errorType.includes('rate_limit')) return 'medium';
    if (errorType.includes('timeout')) return 'low';
    return 'medium';
  }

  /**
   * Check if error type is auto-recoverable
   */
  private isAutoRecoverable(errorType: string): boolean {
    const autoRecoverableTypes = [
      'network_timeout',
      'rate_limit_exceeded',
      'server_error'
    ];
    return autoRecoverableTypes.some(type => errorType.includes(type));
  }
} 