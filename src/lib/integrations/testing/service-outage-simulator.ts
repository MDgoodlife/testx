/**
 * Service outage simulator for TestX integration testing
 * Simulates various failure scenarios including outages, auth failures, rate limits, and network delays
 */

import { ServiceType } from '../core/integration-types';

export interface OutageSimulation {
  service: ServiceType;
  type: 'outage' | 'auth_failure' | 'rate_limit' | 'network_delay';
  startTime: Date;
  duration: number;
  active: boolean;
}

export class ServiceOutageSimulator {
  private activeSimulations: Map<ServiceType, OutageSimulation> = new Map();
  private originalFetch: typeof fetch;

  constructor() {
    this.originalFetch = global.fetch;
    this.setupInterceptors();
  }

  /**
   * Simulate a complete service outage
   */
  public async simulateOutage(service: ServiceType, duration: number): Promise<void> {
    const simulation: OutageSimulation = {
      service,
      type: 'outage',
      startTime: new Date(),
      duration,
      active: true
    };

    this.activeSimulations.set(service, simulation);
    console.log(`[Outage Simulator] Started ${service} outage simulation for ${duration}ms`);

    // Auto-end simulation after duration
    setTimeout(() => {
      if (this.activeSimulations.get(service)?.active) {
        this.endOutage(service);
      }
    }, duration);
  }

  /**
   * End a service outage simulation
   */
  public async endOutage(service: ServiceType): Promise<void> {
    const simulation = this.activeSimulations.get(service);
    if (simulation) {
      simulation.active = false;
      this.activeSimulations.delete(service);
      console.log(`[Outage Simulator] Ended ${service} outage simulation`);
    }
  }

  /**
   * Simulate authentication failures
   */
  public async simulateAuthFailure(service: ServiceType): Promise<void> {
    const simulation: OutageSimulation = {
      service,
      type: 'auth_failure',
      startTime: new Date(),
      duration: 30000, // 30 seconds default
      active: true
    };

    this.activeSimulations.set(service, simulation);
    console.log(`[Outage Simulator] Started ${service} auth failure simulation`);

    // Auto-end after duration
    setTimeout(() => {
      if (this.activeSimulations.get(service)?.active) {
        this.endAuthFailure(service);
      }
    }, simulation.duration);
  }

  /**
   * End authentication failure simulation
   */
  public async endAuthFailure(service: ServiceType): Promise<void> {
    const simulation = this.activeSimulations.get(service);
    if (simulation && simulation.type === 'auth_failure') {
      simulation.active = false;
      this.activeSimulations.delete(service);
      console.log(`[Outage Simulator] Ended ${service} auth failure simulation`);
    }
  }

  /**
   * Simulate rate limiting
   */
  public async simulateRateLimit(service: ServiceType): Promise<void> {
    const simulation: OutageSimulation = {
      service,
      type: 'rate_limit',
      startTime: new Date(),
      duration: 60000, // 1 minute default
      active: true
    };

    this.activeSimulations.set(service, simulation);
    console.log(`[Outage Simulator] Started ${service} rate limit simulation`);

    // Auto-end after duration
    setTimeout(() => {
      if (this.activeSimulations.get(service)?.active) {
        this.endRateLimit(service);
      }
    }, simulation.duration);
  }

  /**
   * End rate limiting simulation
   */
  public async endRateLimit(service: ServiceType): Promise<void> {
    const simulation = this.activeSimulations.get(service);
    if (simulation && simulation.type === 'rate_limit') {
      simulation.active = false;
      this.activeSimulations.delete(service);
      console.log(`[Outage Simulator] Ended ${service} rate limit simulation`);
    }
  }

  /**
   * Simulate network delays
   */
  public async simulateNetworkDelay(service: ServiceType, delay: number): Promise<void> {
    const simulation: OutageSimulation = {
      service,
      type: 'network_delay',
      startTime: new Date(),
      duration: delay,
      active: true
    };

    this.activeSimulations.set(service, simulation);
    console.log(`[Outage Simulator] Started ${service} network delay simulation (${delay}ms)`);

    // Auto-end after duration
    setTimeout(() => {
      if (this.activeSimulations.get(service)?.active) {
        this.endNetworkDelay(service);
      }
    }, delay);
  }

  /**
   * End network delay simulation
   */
  public async endNetworkDelay(service: ServiceType): Promise<void> {
    const simulation = this.activeSimulations.get(service);
    if (simulation && simulation.type === 'network_delay') {
      simulation.active = false;
      this.activeSimulations.delete(service);
      console.log(`[Outage Simulator] Ended ${service} network delay simulation`);
    }
  }

  /**
   * Check if a service is currently being simulated
   */
  public isServiceAffected(service: ServiceType): boolean {
    const simulation = this.activeSimulations.get(service);
    return simulation ? simulation.active : false;
  }

  /**
   * Get current simulation for a service
   */
  public getSimulation(service: ServiceType): OutageSimulation | null {
    return this.activeSimulations.get(service) || null;
  }

  /**
   * Get all active simulations
   */
  public getActiveSimulations(): OutageSimulation[] {
    return Array.from(this.activeSimulations.values()).filter(sim => sim.active);
  }

  /**
   * Cleanup all simulations
   */
  public async cleanup(): Promise<void> {
    console.log('[Outage Simulator] Cleaning up all simulations');
    
    // End all active simulations
    for (const [service, simulation] of this.activeSimulations) {
      if (simulation.active) {
        simulation.active = false;
        console.log(`[Outage Simulator] Ended ${service} simulation during cleanup`);
      }
    }
    
    this.activeSimulations.clear();
    
    // Restore original fetch if we intercepted it
    if (this.originalFetch) {
      global.fetch = this.originalFetch;
    }
  }

  /**
   * Setup network interceptors to simulate failures
   */
  private setupInterceptors(): void {
    // Store original fetch
    const originalFetch = global.fetch;

    // Override global fetch to simulate failures
    global.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
      const affectedService = this.getServiceFromUrl(url);

      if (affectedService) {
        const simulation = this.activeSimulations.get(affectedService);
        
        if (simulation && simulation.active) {
          return this.simulateFailureResponse(simulation, url);
        }
      }

      // No simulation active, proceed with normal request
      return originalFetch(input, init);
    };
  }

  /**
   * Determine which service a URL belongs to
   */
  private getServiceFromUrl(url: string): ServiceType | null {
    if (url.includes('slack.com')) {
      return ServiceType.SLACK;
    }
    if (url.includes('notion.com')) {
      return ServiceType.NOTION;
    }
    if (url.includes('github.com') || url.includes('api.github.com')) {
      return ServiceType.GITHUB;
    }
    if (url.includes('anykrowd.com')) {
      return ServiceType.ANYKROWD;
    }
    return null;
  }

  /**
   * Simulate failure response based on simulation type
   */
  private async simulateFailureResponse(simulation: OutageSimulation, url: string): Promise<Response> {
    switch (simulation.type) {
      case 'outage':
        // Simulate complete service unavailability
        throw new Error(`Network error: Service ${simulation.service} is currently unavailable`);

      case 'auth_failure':
        // Simulate authentication failure
        return new Response(
          JSON.stringify({ error: 'Unauthorized', message: 'Authentication failed' }),
          {
            status: 401,
            statusText: 'Unauthorized',
            headers: { 'Content-Type': 'application/json' }
          }
        );

      case 'rate_limit':
        // Simulate rate limiting
        return new Response(
          JSON.stringify({ 
            error: 'Rate limit exceeded', 
            message: 'Too many requests',
            retry_after: 60 
          }),
          {
            status: 429,
            statusText: 'Too Many Requests',
            headers: { 
              'Content-Type': 'application/json',
              'Retry-After': '60',
              'X-RateLimit-Limit': '100',
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': String(Math.floor(Date.now() / 1000) + 60)
            }
          }
        );

      case 'network_delay':
        // Simulate network delay then timeout
        await this.sleep(simulation.duration);
        throw new Error(`Request timeout: Network request to ${simulation.service} timed out`);

      default:
        // Fallback to server error
        return new Response(
          JSON.stringify({ error: 'Internal server error', message: 'Service temporarily unavailable' }),
          {
            status: 500,
            statusText: 'Internal Server Error',
            headers: { 'Content-Type': 'application/json' }
          }
        );
    }
  }

  /**
   * Utility function for delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Generate realistic error responses for different services
   */
  private generateServiceSpecificError(service: ServiceType, type: string): any {
    switch (service) {
      case ServiceType.SLACK:
        if (type === 'auth_failure') {
          return { ok: false, error: 'invalid_auth' };
        }
        if (type === 'rate_limit') {
          return { ok: false, error: 'rate_limited' };
        }
        return { ok: false, error: 'slack_error' };

      case ServiceType.NOTION:
        if (type === 'auth_failure') {
          return { 
            object: 'error', 
            status: 401, 
            code: 'unauthorized',
            message: 'API token is invalid.' 
          };
        }
        if (type === 'rate_limit') {
          return { 
            object: 'error', 
            status: 429, 
            code: 'rate_limited',
            message: 'Rate limited. Please wait before making more requests.' 
          };
        }
        return { 
          object: 'error', 
          status: 500, 
          code: 'internal_server_error',
          message: 'Internal server error.' 
        };

      case ServiceType.GITHUB:
        if (type === 'auth_failure') {
          return { 
            message: 'Bad credentials',
            documentation_url: 'https://docs.github.com/rest' 
          };
        }
        if (type === 'rate_limit') {
          return { 
            message: 'API rate limit exceeded',
            documentation_url: 'https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting' 
          };
        }
        return { 
          message: 'Server Error',
          documentation_url: 'https://docs.github.com/rest' 
        };

      case ServiceType.ANYKROWD:
        if (type === 'auth_failure') {
          return { error: 'Authentication failed', code: 'AUTH_FAILED' };
        }
        if (type === 'rate_limit') {
          return { error: 'Rate limit exceeded', code: 'RATE_LIMITED' };
        }
        return { error: 'Service unavailable', code: 'SERVICE_ERROR' };

      default:
        return { error: 'Unknown service error' };
    }
  }

  /**
   * Get simulation statistics
   */
  public getSimulationStats(): {
    totalSimulations: number;
    activeSimulations: number;
    simulationsByType: Record<string, number>;
    simulationsByService: Record<string, number>;
  } {
    const allSimulations = Array.from(this.activeSimulations.values());
    const activeSimulations = allSimulations.filter(sim => sim.active);

    const simulationsByType: Record<string, number> = {};
    const simulationsByService: Record<string, number> = {};

    allSimulations.forEach(sim => {
      simulationsByType[sim.type] = (simulationsByType[sim.type] || 0) + 1;
      simulationsByService[sim.service] = (simulationsByService[sim.service] || 0) + 1;
    });

    return {
      totalSimulations: allSimulations.length,
      activeSimulations: activeSimulations.length,
      simulationsByType,
      simulationsByService
    };
  }
} 