#!/bin/bash

# TestX MVP - GitHub Issues Creation Script
# Creates all Epic and Story issues from BMAD Implementation Specification

echo "🚀 Creating GitHub Issues for TestX MVP..."

# Create remaining Epic 0 stories
echo "Creating Epic 0 Stories..."

# Story 0.2
cat > temp_story02.md << 'EOF'
# Story: External Service Integration Sequence Definition

## User Story
**As a** TestX orchestrator  
**I want** a clearly defined integration setup sequence with dependencies  
**So that** external service integrations are reliable and properly ordered

## Acceptance Criteria
- [ ] Integration dependency map created (Slack → Notion → GitHub)
- [ ] Service health check endpoints implemented for all external services
- [ ] Integration failure detection and retry mechanisms
- [ ] Service-specific fallback strategies (offline mode, cached data)
- [ ] Integration setup automation with dependency validation
- [ ] Clear error messages and troubleshooting guides for each service
- [ ] Integration testing with service outage simulation
- [ ] Rollback procedures for failed integrations

## Technical Requirements
- Service health monitoring
- Dependency validation logic
- Retry mechanisms with exponential backoff
- Fallback data sources
- Integration state management

## Definition of Done
- [ ] All acceptance criteria met
- [ ] Integration tests passing
- [ ] Fallback scenarios tested
- [ ] Documentation complete
- [ ] Monitoring alerts configured

## Story Points
**Estimate:** 8
**Priority:** P0 (Critical)

## Dependencies
- None

## Epic
**Epic:** Epic 0: Foundation & Risk Mitigation

## Sprint
**Target Sprint:** Week 1
EOF

gh issue create --title "Story 0.2: External Service Integration Sequence Definition" --label "story,P0" --body-file temp_story02.md

# Story 0.3
cat > temp_story03.md << 'EOF'
# Story: User vs Agent Responsibility Documentation

## User Story
**As a** TestX user  
**I want** clear documentation of what I need to do vs what agents handle automatically  
**So that** I can properly set up and maintain the TestX system

## Acceptance Criteria
- [ ] User responsibility matrix created (account creation, credential provision, approvals)
- [ ] Agent responsibility matrix created (automation, testing, reporting)
- [ ] Setup checklist with clear user action items
- [ ] Boundary definitions between manual and automated processes
- [ ] Escalation procedures when agent automation fails
- [ ] User training materials for manual intervention scenarios
- [ ] Agent capability documentation and limitations
- [ ] Handoff procedures between user actions and agent automation

## Technical Requirements
- Documentation framework
- Interactive checklists
- Training materials
- Process flow diagrams

## Definition of Done
- [ ] All acceptance criteria met
- [ ] Documentation reviewed and approved
- [ ] Training materials tested
- [ ] User feedback incorporated

## Story Points
**Estimate:** 5
**Priority:** P1 (High)

## Dependencies
- Story 0.1, Story 0.2

## Epic
**Epic:** Epic 0: Foundation & Risk Mitigation

## Sprint
**Target Sprint:** Week 1
EOF

gh issue create --title "Story 0.3: User vs Agent Responsibility Documentation" --label "story,P1" --body-file temp_story03.md

# Story 0.4
cat > temp_story04.md << 'EOF'
# Story: Integration Failure Contingency Planning

## User Story
**As a** TestX system  
**I want** comprehensive contingency plans for external service failures  
**So that** testing can continue even when external dependencies are unavailable

## Acceptance Criteria
- [ ] Slack outage contingency plan (email notifications, local logging)
- [ ] Notion outage contingency plan (local database, file exports)
- [ ] GitHub outage contingency plan (local git, manual deployment)
- [ ] anyKrowd environment outage contingency plan (mock services, cached data)
- [ ] Network connectivity failure handling (offline mode, cached operations)
- [ ] Service degradation detection and automatic fallback activation
- [ ] Manual override procedures for critical operations
- [ ] Recovery procedures when services come back online

## Technical Requirements
- Service monitoring and health checks
- Fallback data sources
- Offline operation capabilities
- Manual override interfaces
- Recovery automation

## Definition of Done
- [ ] All acceptance criteria met
- [ ] Fallback scenarios tested
- [ ] Recovery procedures validated
- [ ] Monitoring alerts configured
- [ ] Documentation complete

## Story Points
**Estimate:** 8
**Priority:** P0 (Critical)

## Dependencies
- Story 0.2

## Epic
**Epic:** Epic 0: Foundation & Risk Mitigation

## Sprint
**Target Sprint:** Week 1
EOF

gh issue create --title "Story 0.4: Integration Failure Contingency Planning" --label "story,P0" --body-file temp_story04.md

echo "✅ Epic 0 Stories Created!"

# Create Epic 1
cat > temp_epic1.md << 'EOF'
# Epic: Core Infrastructure (Enhanced)

## Overview
Establish foundational infrastructure with enhanced dependency management and comprehensive error handling.

## User Stories
- [ ] Story 1.1: Enhanced Playwright Test Environment Setup - 13sp
- [ ] Story 1.2: Enhanced CLI Framework Foundation - 13sp
- [ ] Story 1.3: SlackBot Integration with Fallback - 21sp
- [ ] Story 1.4: Notion Database Integration with Offline Mode - 21sp
- [ ] Story 1.5: GitHub Repository Setup with Manual Deployment - 13sp
- [ ] Story 1.6: Environment Detection and Configuration - 8sp

## Acceptance Criteria
- [ ] All infrastructure components functional
- [ ] Enhanced error handling implemented
- [ ] Fallback mechanisms tested
- [ ] Integration health monitoring active
- [ ] Documentation complete

## Dependencies
- Epic 0 completion

## Definition of Done
- [ ] All user stories completed
- [ ] Epic acceptance criteria met
- [ ] Integration testing passed
- [ ] Documentation updated
- [ ] Performance benchmarks met

## Risk Assessment
**Risk Level:** High
**Mitigation Strategies:**
- Enhanced error handling and diagnostics
- Comprehensive fallback mechanisms
- Integration health monitoring
- Incremental implementation approach

## Sprint Planning
**Target Sprint:** Week 1-2
**Story Points Total:** 89
**Priority:** P0 (Critical)

## Notes
Enhanced version of original Epic 1 with risk mitigation integration from Epic 0 findings.
EOF

gh issue create --title "Epic 1: Core Infrastructure (Enhanced)" --label "epic,planning,P0" --body-file temp_epic1.md

echo "✅ Epic 1 Created!"

# Clean up temporary files
rm -f temp_story02.md temp_story03.md temp_story04.md temp_epic1.md

echo "🎉 GitHub Issues Creation Complete!"
echo "📋 Summary:"
echo "   - Epic 0: Foundation & Risk Mitigation (Issue #1)"
echo "   - Story 0.1: OAuth Integration Prototyping (Issue #2)"
echo "   - Story 0.2: External Service Integration Sequence (Issue #3)"
echo "   - Story 0.3: User vs Agent Responsibility Documentation (Issue #4)"
echo "   - Story 0.4: Integration Failure Contingency Planning (Issue #5)"
echo "   - Epic 1: Core Infrastructure (Enhanced) (Issue #6)"
echo ""
echo "🔗 View all issues: https://github.com/MDgoodlife/testx/issues" 