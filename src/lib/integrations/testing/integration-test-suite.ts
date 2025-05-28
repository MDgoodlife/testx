/**
 * Comprehensive integration testing suite for TestX external service integrations
 * Includes service outage simulation, failure scenarios, and recovery testing
 */

import {
  ServiceType,
  ServiceConfiguration,
  IntegrationState,
  ServiceStatus,
  IntegrationMode
} from '../core/integration-types';

import { IntegrationManager } from '../core/integration-manager';
import { IntegrationErrorHandler, ErrorContext } from '../core/error-handler';
import { ServiceOutageSimulator } from './service-outage-simulator';

export interface TestScenario {
  id: string;
  name: string;
  description: string;
  service: ServiceType;
  type: 'outage' | 'auth_failure' | 'rate_limit' | 'network_timeout' | 'recovery';
  duration: number; // milliseconds
  expectedBehavior: string;
  recoveryExpected: boolean;
}

export interface TestResult {
  scenario: TestScenario;
  startTime: Date;
  endTime: Date;
  duration: number;
  status: 'passed' | 'failed' | 'skipped';
  actualBehavior: string;
  errors: string[];
  metrics: TestMetrics;
  logs: string[];
}

export interface TestMetrics {
  requestCount: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  maxResponseTime: number;
  minResponseTime: number;
  recoveryTime?: number;
  fallbackActivations: number;
}

export interface TestSuiteResult {
  suiteName: string;
  startTime: Date;
  endTime: Date;
  totalDuration: number;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  results: TestResult[];
  summary: TestSummary;
}

export interface TestSummary {
  overallStatus: 'passed' | 'failed' | 'partial';
  criticalFailures: number;
  recoverySuccessRate: number;
  averageRecoveryTime: number;
  recommendations: string[];
}

export class IntegrationTestSuite {
  private integrationManager: IntegrationManager;
  private errorHandler: IntegrationErrorHandler;
  private outageSimulator: ServiceOutageSimulator;
  private testResults: TestResult[] = [];
  private isRunning = false;

  constructor(
    integrationManager: IntegrationManager,
    errorHandler: IntegrationErrorHandler
  ) {
    this.integrationManager = integrationManager;
    this.errorHandler = errorHandler;
    this.outageSimulator = new ServiceOutageSimulator();
  }

  /**
   * Run the complete integration test suite
   */
  public async runTestSuite(
    services: ServiceConfiguration[],
    scenarios?: TestScenario[]
  ): Promise<TestSuiteResult> {
    if (this.isRunning) {
      throw new Error('Test suite is already running');
    }

    this.isRunning = true;
    const startTime = new Date();
    const testScenarios = scenarios || this.getDefaultTestScenarios(services);
    
    console.log(`[TestX Integration Tests] Starting test suite with ${testScenarios.length} scenarios`);

    try {
      // Initialize integration manager for testing
      await this.integrationManager.initialize(services);

      // Run each test scenario
      for (const scenario of testScenarios) {
        console.log(`[TestX Integration Tests] Running scenario: ${scenario.name}`);
        const result = await this.runTestScenario(scenario);
        this.testResults.push(result);
        
        // Brief pause between tests
        await this.sleep(1000);
      }

      const endTime = new Date();
      const summary = this.generateTestSummary();

      return {
        suiteName: 'TestX Integration Test Suite',
        startTime,
        endTime,
        totalDuration: endTime.getTime() - startTime.getTime(),
        totalTests: testScenarios.length,
        passedTests: this.testResults.filter(r => r.status === 'passed').length,
        failedTests: this.testResults.filter(r => r.status === 'failed').length,
        skippedTests: this.testResults.filter(r => r.status === 'skipped').length,
        results: this.testResults,
        summary
      };

    } finally {
      this.isRunning = false;
      await this.cleanup();
    }
  }

  /**
   * Run a single test scenario
   */
  public async runTestScenario(scenario: TestScenario): Promise<TestResult> {
    const startTime = new Date();
    const logs: string[] = [];
    const errors: string[] = [];
    let actualBehavior = '';
    let status: 'passed' | 'failed' | 'skipped' = 'failed';

    const metrics: TestMetrics = {
      requestCount: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      maxResponseTime: 0,
      minResponseTime: Infinity,
      fallbackActivations: 0
    };

    try {
      logs.push(`Starting scenario: ${scenario.name}`);
      
      switch (scenario.type) {
        case 'outage':
          status = await this.testServiceOutage(scenario, metrics, logs, errors);
          break;
        case 'auth_failure':
          status = await this.testAuthFailure(scenario, metrics, logs, errors);
          break;
        case 'rate_limit':
          status = await this.testRateLimit(scenario, metrics, logs, errors);
          break;
        case 'network_timeout':
          status = await this.testNetworkTimeout(scenario, metrics, logs, errors);
          break;
        case 'recovery':
          status = await this.testRecovery(scenario, metrics, logs, errors);
          break;
        default:
          errors.push(`Unknown test type: ${scenario.type}`);
          status = 'skipped';
      }

      actualBehavior = this.generateActualBehaviorDescription(scenario, metrics, logs);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      errors.push(`Test execution failed: ${errorMessage}`);
      logs.push(`Error: ${errorMessage}`);
      status = 'failed';
    }

    const endTime = new Date();
    
    return {
      scenario,
      startTime,
      endTime,
      duration: endTime.getTime() - startTime.getTime(),
      status,
      actualBehavior,
      errors,
      metrics,
      logs
    };
  }

  /**
   * Test service outage scenario
   */
  private async testServiceOutage(
    scenario: TestScenario,
    metrics: TestMetrics,
    logs: string[],
    errors: string[]
  ): Promise<'passed' | 'failed'> {
    try {
      // Start outage simulation
      logs.push(`Simulating outage for ${scenario.service}`);
      await this.outageSimulator.simulateOutage(scenario.service, scenario.duration);

      // Test operations during outage
      const operationResults = await this.performTestOperations(scenario.service, 5, metrics);
      logs.push(`Performed ${operationResults.length} operations during outage`);

      // Check if fallback was activated
      const serviceState = this.integrationManager.getServiceState(scenario.service);
      if (serviceState?.mode === IntegrationMode.FALLBACK) {
        metrics.fallbackActivations++;
        logs.push('Fallback mode activated successfully');
      }

      // End outage simulation
      await this.outageSimulator.endOutage(scenario.service);
      logs.push('Outage simulation ended');

      // Test recovery if expected
      if (scenario.recoveryExpected) {
        const recoveryStartTime = Date.now();
        const recovered = await this.waitForRecovery(scenario.service, 30000); // 30 second timeout
        
        if (recovered) {
          metrics.recoveryTime = Date.now() - recoveryStartTime;
          logs.push(`Service recovered in ${metrics.recoveryTime}ms`);
          return 'passed';
        } else {
          errors.push('Service did not recover within timeout');
          return 'failed';
        }
      }

      // Check if operations failed as expected during outage
      const allOperationsFailed = operationResults.every(result => !result.success);
      if (allOperationsFailed) {
        logs.push('All operations failed as expected during outage');
        return 'passed';
      } else {
        errors.push('Some operations succeeded during outage when they should have failed');
        return 'failed';
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      errors.push(`Outage test failed: ${errorMessage}`);
      return 'failed';
    }
  }

  /**
   * Test authentication failure scenario
   */
  private async testAuthFailure(
    scenario: TestScenario,
    metrics: TestMetrics,
    logs: string[],
    errors: string[]
  ): Promise<'passed' | 'failed'> {
    try {
      // Simulate auth failure
      logs.push(`Simulating auth failure for ${scenario.service}`);
      await this.outageSimulator.simulateAuthFailure(scenario.service);

      // Test operations with auth failure
      const operationResults = await this.performTestOperations(scenario.service, 3, metrics);
      logs.push(`Performed ${operationResults.length} operations with auth failure`);

      // Check if all operations failed with auth errors
      const authFailures = operationResults.filter(result => 
        !result.success && result.error?.includes('auth')
      );

      if (authFailures.length === operationResults.length) {
        logs.push('All operations failed with auth errors as expected');
        return 'passed';
      } else {
        errors.push('Not all operations failed with auth errors');
        return 'failed';
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      errors.push(`Auth failure test failed: ${errorMessage}`);
      return 'failed';
    }
  }

  /**
   * Test rate limiting scenario
   */
  private async testRateLimit(
    scenario: TestScenario,
    metrics: TestMetrics,
    logs: string[],
    errors: string[]
  ): Promise<'passed' | 'failed'> {
    try {
      // Simulate rate limiting
      logs.push(`Simulating rate limit for ${scenario.service}`);
      await this.outageSimulator.simulateRateLimit(scenario.service);

      // Perform rapid operations to trigger rate limiting
      const operationResults = await this.performTestOperations(scenario.service, 10, metrics, 100); // 100ms intervals
      logs.push(`Performed ${operationResults.length} rapid operations`);

      // Check if rate limiting was detected and handled
      const rateLimitErrors = operationResults.filter(result => 
        !result.success && result.error?.includes('rate limit')
      );

      if (rateLimitErrors.length > 0) {
        logs.push(`Rate limiting detected in ${rateLimitErrors.length} operations`);
        return 'passed';
      } else {
        errors.push('Rate limiting was not detected or handled properly');
        return 'failed';
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      errors.push(`Rate limit test failed: ${errorMessage}`);
      return 'failed';
    }
  }

  /**
   * Test network timeout scenario
   */
  private async testNetworkTimeout(
    scenario: TestScenario,
    metrics: TestMetrics,
    logs: string[],
    errors: string[]
  ): Promise<'passed' | 'failed'> {
    try {
      // Simulate network delays
      logs.push(`Simulating network timeout for ${scenario.service}`);
      await this.outageSimulator.simulateNetworkDelay(scenario.service, scenario.duration);

      // Test operations with timeouts
      const operationResults = await this.performTestOperations(scenario.service, 3, metrics);
      logs.push(`Performed ${operationResults.length} operations with network delays`);

      // Check if timeouts were handled properly
      const timeoutErrors = operationResults.filter(result => 
        !result.success && (result.error?.includes('timeout') || result.error?.includes('timed out'))
      );

      if (timeoutErrors.length > 0) {
        logs.push(`Network timeouts detected and handled in ${timeoutErrors.length} operations`);
        return 'passed';
      } else {
        errors.push('Network timeouts were not detected or handled properly');
        return 'failed';
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      errors.push(`Network timeout test failed: ${errorMessage}`);
      return 'failed';
    }
  }

  /**
   * Test recovery scenario
   */
  private async testRecovery(
    scenario: TestScenario,
    metrics: TestMetrics,
    logs: string[],
    errors: string[]
  ): Promise<'passed' | 'failed'> {
    try {
      // First, simulate a failure
      logs.push(`Testing recovery for ${scenario.service}`);
      await this.outageSimulator.simulateOutage(scenario.service, 5000); // 5 second outage

      // Wait for failure detection
      await this.sleep(2000);

      // End the outage to trigger recovery
      await this.outageSimulator.endOutage(scenario.service);
      logs.push('Outage ended, testing recovery');

      // Test recovery
      const recoveryStartTime = Date.now();
      const recovered = await this.waitForRecovery(scenario.service, scenario.duration);

      if (recovered) {
        metrics.recoveryTime = Date.now() - recoveryStartTime;
        logs.push(`Service recovered successfully in ${metrics.recoveryTime}ms`);

        // Test operations after recovery
        const operationResults = await this.performTestOperations(scenario.service, 3, metrics);
        const successfulOperations = operationResults.filter(result => result.success);

        if (successfulOperations.length === operationResults.length) {
          logs.push('All operations successful after recovery');
          return 'passed';
        } else {
          errors.push('Some operations failed after recovery');
          return 'failed';
        }
      } else {
        errors.push('Service did not recover within timeout');
        return 'failed';
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      errors.push(`Recovery test failed: ${errorMessage}`);
      return 'failed';
    }
  }

  /**
   * Perform test operations on a service
   */
  private async performTestOperations(
    service: ServiceType,
    count: number,
    metrics: TestMetrics,
    interval = 1000
  ): Promise<Array<{ success: boolean; responseTime: number; error?: string }>> {
    const results: Array<{ success: boolean; responseTime: number; error?: string }> = [];

    for (let i = 0; i < count; i++) {
      const startTime = Date.now();
      
      try {
        // Simulate a service operation
        await this.integrationManager.executeOperation(
          service,
          async () => {
            // Mock operation that could fail
            if (Math.random() < 0.1) { // 10% random failure rate
              throw new Error('Random operation failure');
            }
            return { success: true };
          },
          `test-operation-${i}`
        );

        const responseTime = Date.now() - startTime;
        results.push({ success: true, responseTime });
        metrics.successfulRequests++;
        
        // Update response time metrics
        metrics.maxResponseTime = Math.max(metrics.maxResponseTime, responseTime);
        metrics.minResponseTime = Math.min(metrics.minResponseTime, responseTime);

      } catch (error) {
        const responseTime = Date.now() - startTime;
        const errorMessage = error instanceof Error ? error.message : String(error);
        results.push({ success: false, responseTime, error: errorMessage });
        metrics.failedRequests++;
      }

      metrics.requestCount++;
      
      // Wait before next operation
      if (i < count - 1) {
        await this.sleep(interval);
      }
    }

    // Calculate average response time
    const totalResponseTime = results.reduce((sum, result) => sum + result.responseTime, 0);
    metrics.averageResponseTime = totalResponseTime / results.length;

    return results;
  }

  /**
   * Wait for service recovery
   */
  private async waitForRecovery(service: ServiceType, timeout: number): Promise<boolean> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      const serviceHealth = this.integrationManager.getServiceHealth(service);
      
      if (serviceHealth === ServiceStatus.HEALTHY) {
        return true;
      }
      
      await this.sleep(1000); // Check every second
    }
    
    return false;
  }

  /**
   * Generate default test scenarios for services
   */
  private getDefaultTestScenarios(services: ServiceConfiguration[]): TestScenario[] {
    const scenarios: TestScenario[] = [];

    for (const service of services) {
      if (!service.enabled) continue;

      // Service outage scenario
      scenarios.push({
        id: `${service.type.toLowerCase()}-outage`,
        name: `${service.type} Service Outage`,
        description: `Test behavior during ${service.type} service outage`,
        service: service.type,
        type: 'outage',
        duration: 10000, // 10 seconds
        expectedBehavior: 'Operations should fail gracefully and activate fallback mode',
        recoveryExpected: true
      });

      // Authentication failure scenario
      scenarios.push({
        id: `${service.type.toLowerCase()}-auth-failure`,
        name: `${service.type} Authentication Failure`,
        description: `Test behavior with ${service.type} authentication failures`,
        service: service.type,
        type: 'auth_failure',
        duration: 5000, // 5 seconds
        expectedBehavior: 'Operations should fail with authentication errors',
        recoveryExpected: false
      });

      // Rate limiting scenario
      scenarios.push({
        id: `${service.type.toLowerCase()}-rate-limit`,
        name: `${service.type} Rate Limiting`,
        description: `Test behavior when ${service.type} rate limits are exceeded`,
        service: service.type,
        type: 'rate_limit',
        duration: 5000, // 5 seconds
        expectedBehavior: 'Operations should be throttled and retried with backoff',
        recoveryExpected: true
      });

      // Network timeout scenario
      scenarios.push({
        id: `${service.type.toLowerCase()}-network-timeout`,
        name: `${service.type} Network Timeout`,
        description: `Test behavior with ${service.type} network timeouts`,
        service: service.type,
        type: 'network_timeout',
        duration: 8000, // 8 seconds
        expectedBehavior: 'Operations should timeout and retry with exponential backoff',
        recoveryExpected: true
      });

      // Recovery scenario
      scenarios.push({
        id: `${service.type.toLowerCase()}-recovery`,
        name: `${service.type} Recovery`,
        description: `Test ${service.type} service recovery after outage`,
        service: service.type,
        type: 'recovery',
        duration: 30000, // 30 seconds max recovery time
        expectedBehavior: 'Service should recover and resume normal operations',
        recoveryExpected: true
      });
    }

    return scenarios;
  }

  /**
   * Generate actual behavior description
   */
  private generateActualBehaviorDescription(
    scenario: TestScenario,
    metrics: TestMetrics,
    logs: string[]
  ): string {
    const parts = [
      `Executed ${metrics.requestCount} operations`,
      `${metrics.successfulRequests} successful, ${metrics.failedRequests} failed`,
      `Average response time: ${metrics.averageResponseTime.toFixed(2)}ms`
    ];

    if (metrics.fallbackActivations > 0) {
      parts.push(`Fallback activated ${metrics.fallbackActivations} times`);
    }

    if (metrics.recoveryTime) {
      parts.push(`Recovery time: ${metrics.recoveryTime}ms`);
    }

    return parts.join('. ');
  }

  /**
   * Generate test summary
   */
  private generateTestSummary(): TestSummary {
    const passedTests = this.testResults.filter(r => r.status === 'passed').length;
    const failedTests = this.testResults.filter(r => r.status === 'failed').length;
    const totalTests = this.testResults.length;

    const criticalFailures = this.testResults.filter(r => 
      r.status === 'failed' && (
        r.scenario.type === 'outage' || 
        r.scenario.type === 'recovery'
      )
    ).length;

    const recoveryTests = this.testResults.filter(r => 
      r.scenario.recoveryExpected && r.metrics.recoveryTime !== undefined
    );
    
    const recoverySuccessRate = recoveryTests.length > 0 
      ? recoveryTests.filter(r => r.status === 'passed').length / recoveryTests.length 
      : 0;

    const averageRecoveryTime = recoveryTests.length > 0
      ? recoveryTests.reduce((sum, r) => sum + (r.metrics.recoveryTime || 0), 0) / recoveryTests.length
      : 0;

    const recommendations: string[] = [];
    
    if (failedTests > 0) {
      recommendations.push(`Address ${failedTests} failed test scenarios`);
    }
    
    if (criticalFailures > 0) {
      recommendations.push(`Critical: ${criticalFailures} outage/recovery tests failed`);
    }
    
    if (recoverySuccessRate < 0.8) {
      recommendations.push('Improve service recovery mechanisms');
    }
    
    if (averageRecoveryTime > 10000) {
      recommendations.push('Optimize recovery time (currently > 10 seconds)');
    }

    return {
      overallStatus: failedTests === 0 ? 'passed' : criticalFailures > 0 ? 'failed' : 'partial',
      criticalFailures,
      recoverySuccessRate,
      averageRecoveryTime,
      recommendations
    };
  }

  /**
   * Cleanup after tests
   */
  private async cleanup(): Promise<void> {
    try {
      // End any ongoing simulations
      await this.outageSimulator.cleanup();
      
      // Reset integration manager if needed
      await this.integrationManager.forceAllHealthChecks();
      
    } catch (error) {
      console.warn('Cleanup warning:', error);
    }
  }

  /**
   * Utility function for delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get test results
   */
  public getTestResults(): TestResult[] {
    return [...this.testResults];
  }

  /**
   * Clear test results
   */
  public clearTestResults(): void {
    this.testResults = [];
  }
} 