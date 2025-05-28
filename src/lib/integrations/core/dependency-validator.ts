/**
 * Dependency validation system for TestX external service integrations
 * Validates service dependencies and ensures proper integration sequence
 */

import {
  ServiceType,
  ServiceConfiguration,
  DependencyValidationResult,
  DependencyValidationRule,
  IntegrationSequence,
  DependencyError
} from './integration-types';

export class DependencyValidator {
  private validationRules: DependencyValidationRule[] = [];

  constructor() {
    this.initializeDefaultRules();
  }

  /**
   * Initialize default validation rules for TestX integration sequence
   */
  private initializeDefaultRules(): void {
    this.validationRules = [
      {
        name: 'circular_dependency_check',
        description: 'Ensures no circular dependencies exist between services',
        validate: this.validateCircularDependencies.bind(this)
      },
      {
        name: 'required_dependency_check',
        description: 'Ensures all required dependencies are available',
        validate: this.validateRequiredDependencies.bind(this)
      },
      {
        name: 'integration_sequence_check',
        description: 'Validates the proper integration sequence (Slack → Notion → GitHub)',
        validate: this.validateIntegrationSequence.bind(this)
      },
      {
        name: 'fallback_availability_check',
        description: 'Ensures fallback strategies are available for critical services',
        validate: this.validateFallbackAvailability.bind(this)
      }
    ];
  }

  /**
   * Validate all services against all validation rules
   */
  public validateServices(services: ServiceConfiguration[]): DependencyValidationResult {
    const result: DependencyValidationResult = {
      valid: true,
      missingDependencies: [],
      circularDependencies: [],
      errors: [],
      warnings: []
    };

    // Run all validation rules
    for (const rule of this.validationRules) {
      try {
        const ruleResult = rule.validate(services);
        
        // Merge results
        result.missingDependencies.push(...ruleResult.missingDependencies);
        result.circularDependencies.push(...ruleResult.circularDependencies);
        result.errors.push(...ruleResult.errors);
        result.warnings.push(...ruleResult.warnings);
        
        if (!ruleResult.valid) {
          result.valid = false;
        }
      } catch (error) {
        result.valid = false;
        result.errors.push(`Validation rule '${rule.name}' failed: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    // Remove duplicates
    result.missingDependencies = [...new Set(result.missingDependencies)];
    result.circularDependencies = [...new Set(result.circularDependencies)];

    return result;
  }

  /**
   * Check for circular dependencies between services
   */
  private validateCircularDependencies(services: ServiceConfiguration[]): DependencyValidationResult {
    const result: DependencyValidationResult = {
      valid: true,
      missingDependencies: [],
      circularDependencies: [],
      errors: [],
      warnings: []
    };

    const serviceMap = new Map<ServiceType, ServiceConfiguration>();
    services.forEach(service => serviceMap.set(service.type, service));

    // Use DFS to detect cycles
    const visited = new Set<ServiceType>();
    const recursionStack = new Set<ServiceType>();

    const hasCycle = (service: ServiceType, path: ServiceType[]): boolean => {
      if (recursionStack.has(service)) {
        // Found a cycle
        const cycleStart = path.indexOf(service);
        const cycle = path.slice(cycleStart);
        result.circularDependencies.push(...cycle);
        result.errors.push(`Circular dependency detected: ${cycle.join(' → ')} → ${service}`);
        return true;
      }

      if (visited.has(service)) {
        return false;
      }

      visited.add(service);
      recursionStack.add(service);
      path.push(service);

      const serviceConfig = serviceMap.get(service);
      if (serviceConfig) {
        for (const dependency of serviceConfig.dependencies) {
          if (hasCycle(dependency.service, [...path])) {
            result.valid = false;
            return true;
          }
        }
      }

      recursionStack.delete(service);
      path.pop();
      return false;
    };

    // Check each service for cycles
    for (const service of services) {
      if (!visited.has(service.type)) {
        hasCycle(service.type, []);
      }
    }

    return result;
  }

  /**
   * Validate that all required dependencies are available
   */
  private validateRequiredDependencies(services: ServiceConfiguration[]): DependencyValidationResult {
    const result: DependencyValidationResult = {
      valid: true,
      missingDependencies: [],
      circularDependencies: [],
      errors: [],
      warnings: []
    };

    const availableServices = new Set(services.map(s => s.type));

    for (const service of services) {
      for (const dependency of service.dependencies) {
        if (dependency.required && !availableServices.has(dependency.service)) {
          result.missingDependencies.push(dependency.service);
          result.errors.push(
            `Service '${service.type}' requires '${dependency.service}' but it's not available`
          );
          result.valid = false;
        }
      }
    }

    return result;
  }

  /**
   * Validate the proper TestX integration sequence (Slack → Notion → GitHub)
   */
  private validateIntegrationSequence(services: ServiceConfiguration[]): DependencyValidationResult {
    const result: DependencyValidationResult = {
      valid: true,
      missingDependencies: [],
      circularDependencies: [],
      errors: [],
      warnings: []
    };

    const serviceMap = new Map<ServiceType, ServiceConfiguration>();
    services.forEach(service => serviceMap.set(service.type, service));

    // Define expected sequence dependencies
    const expectedSequence = [
      ServiceType.SLACK,
      ServiceType.NOTION,
      ServiceType.GITHUB,
      ServiceType.ANYKROWD
    ];

    // Validate sequence order
    for (let i = 1; i < expectedSequence.length; i++) {
      const currentServiceType = expectedSequence[i]!;
      const previousServiceType = expectedSequence[i - 1]!;
      const currentService = serviceMap.get(currentServiceType);

      if (currentService) {
        const hasPreviousDependency = currentService.dependencies.some(
          dep => dep.service === previousServiceType
        );

        if (!hasPreviousDependency) {
          result.warnings.push(
            `Service '${currentServiceType}' should depend on '${previousServiceType}' according to TestX integration sequence`
          );
        }
      }
    }

    // Validate that Slack has no dependencies (it's the foundation)
    const slackService = serviceMap.get(ServiceType.SLACK);
    if (slackService && slackService.dependencies.length > 0) {
      result.warnings.push(
        'Slack service should not have dependencies as it\'s the foundation service'
      );
    }

    return result;
  }

  /**
   * Validate that fallback strategies are available for critical services
   */
  private validateFallbackAvailability(services: ServiceConfiguration[]): DependencyValidationResult {
    const result: DependencyValidationResult = {
      valid: true,
      missingDependencies: [],
      circularDependencies: [],
      errors: [],
      warnings: []
    };

    const criticalServices = [ServiceType.SLACK, ServiceType.NOTION, ServiceType.GITHUB];

    for (const service of services) {
      if (criticalServices.includes(service.type)) {
        if (!service.fallbackStrategy.enabled) {
          result.warnings.push(
            `Critical service '${service.type}' should have fallback strategy enabled`
          );
        }

        if (service.fallbackStrategy.enabled && service.fallbackStrategy.offlineCapabilities.length === 0) {
          result.warnings.push(
            `Service '${service.type}' has fallback enabled but no offline capabilities defined`
          );
        }
      }
    }

    return result;
  }

  /**
   * Generate integration sequence based on dependencies
   */
  public generateIntegrationSequence(services: ServiceConfiguration[]): IntegrationSequence {
    const serviceMap = new Map<ServiceType, ServiceConfiguration>();
    services.forEach(service => serviceMap.set(service.type, service));

    // Topological sort to determine sequence
    const sequence: ServiceType[] = [];
    const visited = new Set<ServiceType>();
    const temp = new Set<ServiceType>();

    const visit = (service: ServiceType): void => {
      if (temp.has(service)) {
        throw new DependencyError([], `Circular dependency detected involving ${service}`);
      }
      if (visited.has(service)) {
        return;
      }

      temp.add(service);
      const serviceConfig = serviceMap.get(service);
      
      if (serviceConfig) {
        // Visit dependencies first
        for (const dependency of serviceConfig.dependencies) {
          if (dependency.required) {
            visit(dependency.service);
          }
        }
      }

      temp.delete(service);
      visited.add(service);
      sequence.push(service);
    };

    // Sort services by priority (lower number = higher priority)
    const sortedServices = [...services].sort((a, b) => a.priority - b.priority);

    // Visit all services
    for (const service of sortedServices) {
      if (!visited.has(service.type)) {
        visit(service.type);
      }
    }

    // Identify parallel groups (services with no dependencies between them)
    const parallelGroups: ServiceType[][] = [];
    const processed = new Set<ServiceType>();

    for (const service of sequence) {
      if (processed.has(service)) continue;

      const group: ServiceType[] = [service];
      processed.add(service);

      // Find services that can run in parallel with this one
      for (const otherService of sequence) {
        if (processed.has(otherService)) continue;

        const serviceConfig = serviceMap.get(service);
        const otherServiceConfig = serviceMap.get(otherService);

        if (serviceConfig && otherServiceConfig) {
          const hasDirectDependency = serviceConfig.dependencies.some(dep => dep.service === otherService) ||
                                    otherServiceConfig.dependencies.some(dep => dep.service === service);

          if (!hasDirectDependency) {
            group.push(otherService);
            processed.add(otherService);
          }
        }
      }

      if (group.length > 1) {
        parallelGroups.push(group);
      }
    }

    return {
      sequence,
      parallelGroups,
      validationRules: this.validationRules
    };
  }

  /**
   * Add custom validation rule
   */
  public addValidationRule(rule: DependencyValidationRule): void {
    this.validationRules.push(rule);
  }

  /**
   * Remove validation rule by name
   */
  public removeValidationRule(name: string): boolean {
    const index = this.validationRules.findIndex(rule => rule.name === name);
    if (index !== -1) {
      this.validationRules.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Get all validation rules
   */
  public getValidationRules(): DependencyValidationRule[] {
    return [...this.validationRules];
  }
} 