/**
 * Rollback management system for TestX external service integrations
 * Handles failed integrations with automated rollback and recovery procedures
 */

import {
  ServiceType,
  ServiceConfiguration,
  IntegrationState,
  IntegrationMode
} from './integration-types';

export interface RollbackPoint {
  id: string;
  timestamp: Date;
  service: ServiceType;
  state: IntegrationState;
  configuration: ServiceConfiguration;
  metadata: Record<string, any>;
  description: string;
}

export interface RollbackPlan {
  id: string;
  service: ServiceType;
  rollbackPoints: RollbackPoint[];
  strategy: 'immediate' | 'graceful' | 'staged';
  estimatedDuration: number;
  riskLevel: 'low' | 'medium' | 'high';
  dependencies: ServiceType[];
  steps: RollbackStep[];
}

export interface RollbackStep {
  id: string;
  order: number;
  description: string;
  action: 'disable_service' | 'restore_config' | 'clear_cache' | 'reset_auth' | 'notify_users' | 'custom';
  target: ServiceType;
  parameters: Record<string, any>;
  timeout: number;
  rollbackOnFailure: boolean;
}

export interface RollbackExecution {
  id: string;
  plan: RollbackPlan;
  startTime: Date;
  endTime?: Date;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  currentStep: number;
  completedSteps: string[];
  failedSteps: string[];
  errors: string[];
  logs: string[];
}

export interface RollbackResult {
  execution: RollbackExecution;
  success: boolean;
  duration: number;
  stepsCompleted: number;
  stepsTotal: number;
  finalState: Record<ServiceType, IntegrationState>;
  recommendations: string[];
}

export class RollbackManager {
  private rollbackPoints: Map<ServiceType, RollbackPoint[]> = new Map();
  private activeExecutions: Map<string, RollbackExecution> = new Map();
  private rollbackHistory: RollbackExecution[] = [];
  private maxRollbackPoints = 10;
  private maxHistorySize = 100;

  constructor() {
    this.initializeDefaultRollbackStrategies();
  }

  /**
   * Create a rollback point for a service
   */
  public createRollbackPoint(
    service: ServiceType,
    state: IntegrationState,
    configuration: ServiceConfiguration,
    description: string,
    metadata: Record<string, any> = {}
  ): RollbackPoint {
    const rollbackPoint: RollbackPoint = {
      id: this.generateId(),
      timestamp: new Date(),
      service,
      state: { ...state },
      configuration: { ...configuration },
      metadata: { ...metadata },
      description
    };

    // Get existing rollback points for service
    const existingPoints = this.rollbackPoints.get(service) || [];
    
    // Add new point and maintain size limit
    existingPoints.unshift(rollbackPoint);
    if (existingPoints.length > this.maxRollbackPoints) {
      existingPoints.splice(this.maxRollbackPoints);
    }
    
    this.rollbackPoints.set(service, existingPoints);

    console.log(`[Rollback Manager] Created rollback point for ${service}: ${description}`);
    return rollbackPoint;
  }

  /**
   * Generate a rollback plan for a service
   */
  public generateRollbackPlan(
    service: ServiceType,
    targetPoint?: RollbackPoint,
    strategy: 'immediate' | 'graceful' | 'staged' = 'graceful'
  ): RollbackPlan {
    const rollbackPoints = this.rollbackPoints.get(service) || [];
    
    if (rollbackPoints.length === 0) {
      throw new Error(`No rollback points available for service ${service}`);
    }

    const target = targetPoint || rollbackPoints[0]; // Use latest if not specified
    if (!target) {
      throw new Error(`No valid rollback point found for service ${service}`);
    }
    
    const dependencies = this.getDependentServices(service);
    
    const plan: RollbackPlan = {
      id: this.generateId(),
      service,
      rollbackPoints: [target],
      strategy,
      estimatedDuration: this.estimateRollbackDuration(service, strategy),
      riskLevel: this.assessRollbackRisk(service, strategy),
      dependencies,
      steps: this.generateRollbackSteps(service, target, strategy)
    };

    console.log(`[Rollback Manager] Generated ${strategy} rollback plan for ${service}`);
    return plan;
  }

  /**
   * Execute a rollback plan
   */
  public async executeRollback(plan: RollbackPlan): Promise<RollbackResult> {
    const execution: RollbackExecution = {
      id: this.generateId(),
      plan,
      startTime: new Date(),
      status: 'running',
      currentStep: 0,
      completedSteps: [],
      failedSteps: [],
      errors: [],
      logs: []
    };

    this.activeExecutions.set(execution.id, execution);
    execution.logs.push(`Starting ${plan.strategy} rollback for ${plan.service}`);

    try {
      // Execute rollback steps in order
      for (let i = 0; i < plan.steps.length; i++) {
        const step = plan.steps[i];
        if (!step) {
          throw new Error(`Step ${i} is undefined in rollback plan`);
        }
        
        execution.currentStep = i;
        execution.logs.push(`Executing step ${i + 1}/${plan.steps.length}: ${step.description}`);

        try {
          await this.executeRollbackStep(step, execution);
          execution.completedSteps.push(step.id);
          execution.logs.push(`Completed step: ${step.description}`);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          execution.failedSteps.push(step.id);
          execution.errors.push(`Step ${step.id} failed: ${errorMessage}`);
          execution.logs.push(`Failed step: ${step.description} - ${errorMessage}`);

          if (step.rollbackOnFailure) {
            execution.logs.push('Step marked for rollback on failure, stopping execution');
            break;
          }
        }
      }

      execution.endTime = new Date();
      execution.status = execution.failedSteps.length === 0 ? 'completed' : 'failed';

      const result = this.generateRollbackResult(execution);
      this.addToHistory(execution);

      console.log(`[Rollback Manager] Rollback ${execution.status} for ${plan.service}`);
      return result;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      execution.endTime = new Date();
      execution.status = 'failed';
      execution.errors.push(`Rollback execution failed: ${errorMessage}`);
      
      this.addToHistory(execution);
      
      throw new Error(`Rollback failed for ${plan.service}: ${errorMessage}`);
    } finally {
      this.activeExecutions.delete(execution.id);
    }
  }

  /**
   * Execute a single rollback step
   */
  private async executeRollbackStep(step: RollbackStep, execution: RollbackExecution): Promise<void> {
    const timeout = step.timeout || 30000; // 30 second default timeout
    
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(`Step timeout after ${timeout}ms`)), timeout);
    });

    const stepPromise = this.performStepAction(step, execution);

    try {
      await Promise.race([stepPromise, timeoutPromise]);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Perform the actual step action
   */
  private async performStepAction(step: RollbackStep, _execution: RollbackExecution): Promise<void> {
    switch (step.action) {
      case 'disable_service':
        await this.disableService(step.target, step.parameters);
        break;
        
      case 'restore_config':
        await this.restoreConfiguration(step.target, step.parameters);
        break;
        
      case 'clear_cache':
        await this.clearServiceCache(step.target, step.parameters);
        break;
        
      case 'reset_auth':
        await this.resetAuthentication(step.target, step.parameters);
        break;
        
      case 'notify_users':
        await this.notifyUsers(step.target, step.parameters);
        break;
        
      case 'custom':
        await this.executeCustomAction(step.target, step.parameters);
        break;
        
      default:
        throw new Error(`Unknown rollback action: ${step.action}`);
    }
  }

  /**
   * Disable a service
   */
  private async disableService(service: ServiceType, _parameters: Record<string, any>): Promise<void> {
    console.log(`[Rollback Manager] Disabling service ${service}`);
    
    // Implementation would disable the service
    // For now, simulate the action
    await this.sleep(1000);
    
    console.log(`[Rollback Manager] Service ${service} disabled`);
  }

  /**
   * Restore service configuration
   */
  private async restoreConfiguration(service: ServiceType, parameters: Record<string, any>): Promise<void> {
    console.log(`[Rollback Manager] Restoring configuration for ${service}`);
    
    const { rollbackPointId } = parameters;
    const rollbackPoints = this.rollbackPoints.get(service) || [];
    const targetPoint = rollbackPoints.find(point => point.id === rollbackPointId);
    
    if (!targetPoint) {
      throw new Error(`Rollback point ${rollbackPointId} not found for service ${service}`);
    }
    
    // Implementation would restore the configuration
    await this.sleep(2000);
    
    console.log(`[Rollback Manager] Configuration restored for ${service}`);
  }

  /**
   * Clear service cache
   */
  private async clearServiceCache(service: ServiceType, _parameters: Record<string, any>): Promise<void> {
    console.log(`[Rollback Manager] Clearing cache for ${service}`);
    
    // Implementation would clear service-specific cache
    await this.sleep(500);
    
    console.log(`[Rollback Manager] Cache cleared for ${service}`);
  }

  /**
   * Reset service authentication
   */
  private async resetAuthentication(service: ServiceType, _parameters: Record<string, any>): Promise<void> {
    console.log(`[Rollback Manager] Resetting authentication for ${service}`);
    
    // Implementation would reset auth tokens/credentials
    await this.sleep(1500);
    
    console.log(`[Rollback Manager] Authentication reset for ${service}`);
  }

  /**
   * Notify users about rollback
   */
  private async notifyUsers(service: ServiceType, _parameters: Record<string, any>): Promise<void> {
    console.log(`[Rollback Manager] Notifying users about ${service} rollback`);
    
    // Implementation would send notifications
    await this.sleep(1000);
    
    console.log(`[Rollback Manager] Users notified about ${service} rollback`);
  }

  /**
   * Execute custom rollback action
   */
  private async executeCustomAction(service: ServiceType, _parameters: Record<string, any>): Promise<void> {
    console.log(`[Rollback Manager] Executing custom action for ${service}`);
    
    // Implementation would execute custom rollback logic
    await this.sleep(2000);
    
    console.log(`[Rollback Manager] Custom action completed for ${service}`);
  }

  /**
   * Generate rollback steps based on strategy
   */
  private generateRollbackSteps(
    service: ServiceType,
    rollbackPoint: RollbackPoint,
    strategy: 'immediate' | 'graceful' | 'staged'
  ): RollbackStep[] {
    const steps: RollbackStep[] = [];

    switch (strategy) {
      case 'immediate':
        steps.push({
          id: this.generateId(),
          order: 1,
          description: `Immediately disable ${service}`,
          action: 'disable_service',
          target: service,
          parameters: { immediate: true },
          timeout: 5000,
          rollbackOnFailure: false
        });
        break;

      case 'graceful':
        steps.push(
          {
            id: this.generateId(),
            order: 1,
            description: `Notify users about ${service} maintenance`,
            action: 'notify_users',
            target: service,
            parameters: { 
              message: `${service} is undergoing maintenance`,
              channels: ['slack', 'email']
            },
            timeout: 10000,
            rollbackOnFailure: false
          },
          {
            id: this.generateId(),
            order: 2,
            description: `Clear ${service} cache`,
            action: 'clear_cache',
            target: service,
            parameters: {},
            timeout: 15000,
            rollbackOnFailure: false
          },
          {
            id: this.generateId(),
            order: 3,
            description: `Restore ${service} configuration`,
            action: 'restore_config',
            target: service,
            parameters: { rollbackPointId: rollbackPoint.id },
            timeout: 30000,
            rollbackOnFailure: true
          },
          {
            id: this.generateId(),
            order: 4,
            description: `Reset ${service} authentication`,
            action: 'reset_auth',
            target: service,
            parameters: {},
            timeout: 20000,
            rollbackOnFailure: false
          }
        );
        break;

      case 'staged':
        steps.push(
          {
            id: this.generateId(),
            order: 1,
            description: `Stage 1: Prepare ${service} rollback`,
            action: 'notify_users',
            target: service,
            parameters: { 
              message: `${service} rollback preparation started`,
              channels: ['slack']
            },
            timeout: 10000,
            rollbackOnFailure: false
          },
          {
            id: this.generateId(),
            order: 2,
            description: `Stage 2: Clear ${service} cache`,
            action: 'clear_cache',
            target: service,
            parameters: {},
            timeout: 15000,
            rollbackOnFailure: false
          },
          {
            id: this.generateId(),
            order: 3,
            description: `Stage 3: Restore ${service} configuration`,
            action: 'restore_config',
            target: service,
            parameters: { rollbackPointId: rollbackPoint.id },
            timeout: 45000,
            rollbackOnFailure: true
          },
          {
            id: this.generateId(),
            order: 4,
            description: `Stage 4: Verify ${service} rollback`,
            action: 'custom',
            target: service,
            parameters: { 
              action: 'verify_rollback',
              script: 'health_check'
            },
            timeout: 30000,
            rollbackOnFailure: true
          },
          {
            id: this.generateId(),
            order: 5,
            description: `Stage 5: Complete ${service} rollback`,
            action: 'notify_users',
            target: service,
            parameters: { 
              message: `${service} rollback completed successfully`,
              channels: ['slack', 'email']
            },
            timeout: 10000,
            rollbackOnFailure: false
          }
        );
        break;
    }

    return steps;
  }

  /**
   * Get dependent services that might be affected by rollback
   */
  private getDependentServices(service: ServiceType): ServiceType[] {
    // Define service dependencies
    const dependencies: Record<ServiceType, ServiceType[]> = {
      [ServiceType.SLACK]: [], // Slack has no dependencies
      [ServiceType.NOTION]: [ServiceType.SLACK], // Notion depends on Slack for notifications
      [ServiceType.GITHUB]: [ServiceType.SLACK, ServiceType.NOTION], // GitHub depends on both
      [ServiceType.ANYKROWD]: [ServiceType.SLACK, ServiceType.NOTION, ServiceType.GITHUB] // anyKrowd depends on all
    };

    return dependencies[service] || [];
  }

  /**
   * Estimate rollback duration based on strategy
   */
  private estimateRollbackDuration(service: ServiceType, strategy: string): number {
    const baseDuration = {
      [ServiceType.SLACK]: 30000, // 30 seconds
      [ServiceType.NOTION]: 60000, // 1 minute
      [ServiceType.GITHUB]: 90000, // 1.5 minutes
      [ServiceType.ANYKROWD]: 120000 // 2 minutes
    };

    const strategyMultiplier = {
      immediate: 0.3,
      graceful: 1.0,
      staged: 1.5
    };

    return (baseDuration[service] || 60000) * (strategyMultiplier[strategy as keyof typeof strategyMultiplier] || 1.0);
  }

  /**
   * Assess rollback risk level
   */
  private assessRollbackRisk(service: ServiceType, strategy: string): 'low' | 'medium' | 'high' {
    // Higher risk for services with more dependencies
    const serviceRisk = {
      [ServiceType.SLACK]: 'low',
      [ServiceType.NOTION]: 'medium',
      [ServiceType.GITHUB]: 'medium',
      [ServiceType.ANYKROWD]: 'high'
    } as const;

    // Immediate rollbacks are riskier
    if (strategy === 'immediate') {
      const currentRisk = serviceRisk[service] || 'medium';
      if (currentRisk === 'low') return 'medium';
      if (currentRisk === 'medium') return 'high';
      return 'high';
    }

    return serviceRisk[service] || 'medium';
  }

  /**
   * Generate rollback result
   */
  private generateRollbackResult(execution: RollbackExecution): RollbackResult {
    const duration = execution.endTime 
      ? execution.endTime.getTime() - execution.startTime.getTime()
      : 0;

    const recommendations: string[] = [];
    
    if (execution.failedSteps.length > 0) {
      recommendations.push(`Review and retry failed steps: ${execution.failedSteps.join(', ')}`);
    }
    
    if (execution.errors.length > 0) {
      recommendations.push('Investigate rollback errors before next attempt');
    }
    
    if (duration > execution.plan.estimatedDuration * 1.5) {
      recommendations.push('Consider optimizing rollback procedures for faster execution');
    }

    // Create a proper finalState object with all required ServiceType keys
    const finalState: Record<ServiceType, IntegrationState> = {
      [ServiceType.SLACK]: {
        service: ServiceType.SLACK,
        mode: IntegrationMode.ONLINE,
        connected: false,
        connectionAttempts: 0,
        errorCount: 0
      },
      [ServiceType.NOTION]: {
        service: ServiceType.NOTION,
        mode: IntegrationMode.ONLINE,
        connected: false,
        connectionAttempts: 0,
        errorCount: 0
      },
      [ServiceType.GITHUB]: {
        service: ServiceType.GITHUB,
        mode: IntegrationMode.ONLINE,
        connected: false,
        connectionAttempts: 0,
        errorCount: 0
      },
      [ServiceType.ANYKROWD]: {
        service: ServiceType.ANYKROWD,
        mode: IntegrationMode.ONLINE,
        connected: false,
        connectionAttempts: 0,
        errorCount: 0
      }
    };

    return {
      execution,
      success: execution.status === 'completed',
      duration,
      stepsCompleted: execution.completedSteps.length,
      stepsTotal: execution.plan.steps.length,
      finalState,
      recommendations
    };
  }

  /**
   * Add execution to history
   */
  private addToHistory(execution: RollbackExecution): void {
    this.rollbackHistory.unshift(execution);
    
    // Maintain history size limit
    if (this.rollbackHistory.length > this.maxHistorySize) {
      this.rollbackHistory.splice(this.maxHistorySize);
    }
  }

  /**
   * Get rollback points for a service
   */
  public getRollbackPoints(service: ServiceType): RollbackPoint[] {
    return [...(this.rollbackPoints.get(service) || [])];
  }

  /**
   * Get rollback history
   */
  public getRollbackHistory(service?: ServiceType): RollbackExecution[] {
    if (service) {
      return this.rollbackHistory.filter(execution => execution.plan.service === service);
    }
    return [...this.rollbackHistory];
  }

  /**
   * Get active rollback executions
   */
  public getActiveExecutions(): RollbackExecution[] {
    return Array.from(this.activeExecutions.values());
  }

  /**
   * Cancel an active rollback execution
   */
  public async cancelRollback(executionId: string): Promise<void> {
    const execution = this.activeExecutions.get(executionId);
    if (!execution) {
      throw new Error(`Rollback execution ${executionId} not found`);
    }

    execution.status = 'cancelled';
    execution.endTime = new Date();
    execution.logs.push('Rollback execution cancelled by user');
    
    this.activeExecutions.delete(executionId);
    this.addToHistory(execution);
    
    console.log(`[Rollback Manager] Cancelled rollback execution ${executionId}`);
  }

  /**
   * Initialize default rollback strategies
   */
  private initializeDefaultRollbackStrategies(): void {
    console.log('[Rollback Manager] Initialized with default rollback strategies');
  }

  /**
   * Utility functions
   */
  private generateId(): string {
    return `rb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get rollback statistics
   */
  public getRollbackStatistics(): {
    totalRollbacks: number;
    successfulRollbacks: number;
    failedRollbacks: number;
    averageDuration: number;
    rollbacksByService: Record<string, number>;
    rollbacksByStrategy: Record<string, number>;
  } {
    const totalRollbacks = this.rollbackHistory.length;
    const successfulRollbacks = this.rollbackHistory.filter(r => r.status === 'completed').length;
    const failedRollbacks = this.rollbackHistory.filter(r => r.status === 'failed').length;

    const durations = this.rollbackHistory
      .filter(r => r.endTime)
      .map(r => r.endTime!.getTime() - r.startTime.getTime());
    const averageDuration = durations.length > 0 
      ? durations.reduce((sum, duration) => sum + duration, 0) / durations.length 
      : 0;

    const rollbacksByService: Record<string, number> = {};
    const rollbacksByStrategy: Record<string, number> = {};

    this.rollbackHistory.forEach(execution => {
      const service = execution.plan.service;
      const strategy = execution.plan.strategy;
      
      rollbacksByService[service] = (rollbacksByService[service] || 0) + 1;
      rollbacksByStrategy[strategy] = (rollbacksByStrategy[strategy] || 0) + 1;
    });

    return {
      totalRollbacks,
      successfulRollbacks,
      failedRollbacks,
      averageDuration,
      rollbacksByService,
      rollbacksByStrategy
    };
  }
} 