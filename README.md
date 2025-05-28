# TestX MVP - Professional Browser Testing Framework

[![Playwright Tests](https://github.com/MDgoodlife/testx/actions/workflows/playwright.yml/badge.svg)](https://github.com/MDgoodlife/testx/actions/workflows/playwright.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.40-green.svg)](https://playwright.dev/)

Professional browser testing framework for anyKrowd ClientX with integrated collaboration tools, CLI interface, and BMAD Method architecture.

## 🎯 Project Overview

- **Mission:** Professional browser testing framework with integrated collaboration tools
- **Architecture:** CLI-first, Module-based (ClientX, StaffX, AdminX)
- **Framework:** Playwright Test with TypeScript
- **Method:** BMAD (Business, Method, Architecture, Development)
- **Target:** anyKrowd ClientX core user flows

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Access to anyKrowd krowd-dev environment
- GitHub repository access
- **Google test account credentials** (for OAuth testing)
- **Facebook test account credentials** (for OAuth testing)

### Installation
```bash
# Clone the repository
git clone https://github.com/MDgoodlife/testx.git
cd testx

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Setup integrations
npm run setup

# Run initial tests
npm test
```

### First Test Run
```bash
# Run ClientX authentication tests
npm run test:clientx

# Run with browser visible
npm run test:headed

# Run with Playwright UI
npm run test:ui

# View test report
npm run test:report
```

## 🏗️ Architecture

### Module-Based Organization
```
src/
├── cli/                    # CLI commands and core logic
├── tests/                  # Test suites by module
│   ├── clientx/           # ClientX tests (PRIMARY)
│   ├── staffx/            # StaffX tests (FUTURE)
│   └── adminx/            # AdminX tests (FUTURE)
├── lib/                   # Shared libraries
│   ├── pages/             # Page objects by module
│   ├── integrations/      # External service integrations
│   └── utils/             # Shared utilities
```

### CLI-First Design
All testing operations are accessible via the `testx` CLI:
```bash
testx run clientx auth        # Run ClientX auth tests
testx create clientx flow     # Create new test scenario
testx setup slack            # Setup Slack integration
testx status --global        # System health check
```

## 🧪 Testing Strategy

### Playwright Best Practices
- **Setup Projects:** Multi-role authentication with state isolation
- **Page Objects:** TypeScript-based page object models
- **Test Isolation:** Independent tests with fresh authentication states
- **Cross-Browser:** Chromium, Firefox, WebKit, and mobile testing
- **Enhanced Debugging:** Traces, screenshots, and AI-friendly error logging

### Authentication Strategy
- **Multiple Auth States:** `clientx-user.json`, `clientx-admin.json`, `clientx-guest.json`
- **OAuth Testing:** Google and Facebook OAuth flows with fallback to email
- **State Isolation:** Separate authentication per test scenario
- **Credential Management:** Secure storage and rotation of test credentials

### Test Coverage
- **ClientX Authentication:** Email, Google OAuth, Facebook OAuth
- **ClientX Dashboard:** Navigation, profile management
- **ClientX Wallet:** Top-up, balance, transactions (future)
- **Cross-Browser:** All major browsers and mobile devices

## 🔌 Integrations

### Slack Integration (#testx Channel)
- **Channel ID:** C08U6H5DJGM
- **Slash Commands:** `/testx run clientx auth`, `/testx status`
- **Notifications:** Real-time test results and failure alerts
- **Team Collaboration:** Shared visibility into testing activities

### Notion Integration
- **Workspace:** [TestX Database](https://www.notion.so/anykrowd/TestX-2017344e93f480ac9089dd92b35e1d23)
- **Auto-Created Databases:** Test executions, scenarios, error tracking
- **Comprehensive Logging:** Detailed execution history and analytics
- **AI-Friendly Data:** Structured data for AI debugging and learning

### GitHub Integration
- **Repository:** https://github.com/MDgoodlife/testx
- **Branch Strategy:** `main` (stable), `dev` (development)
- **CI/CD:** GitHub Actions with manual deployment controls
- **Issue Templates:** Epic, Story, and Bug templates for consistent tracking

## 📋 Development Workflow

### Branch Strategy
- **main:** Production-ready, stable code (protected)
- **dev:** Active development branch (default)
- **feature/{issue-number}-{description}:** Feature branches

### Development Process
1. Create feature branch from `dev`
2. Implement changes following building rules
3. Test locally and ensure all tests pass
4. Commit with conventional commit messages
5. Push to feature branch and create PR to `dev`
6. Code review and approval
7. Merge to `dev` after approval
8. Deploy to `main` only after human approval

### Commit Standards
```bash
feat(cli): add testx run command for clientx module
fix(auth): resolve OAuth fallback mechanism
docs(readme): update installation instructions
```

## 🛠️ Available Commands

### Development Commands
```bash
npm run dev                   # Start development mode
npm run build                 # Build TypeScript
npm run test                  # Run all tests
npm run test:clientx          # Run ClientX tests only
npm run test:headed           # Run with browser visible
npm run test:debug            # Run with Playwright inspector
npm run test:ui               # Run in UI mode
npm run lint                  # Run linting
npm run type-check           # TypeScript type checking
```

### CLI Commands (Once Implemented)
```bash
testx run clientx auth        # Run ClientX auth tests
testx run clientx wallet      # Run ClientX wallet tests
testx create clientx flow     # Create new test scenario
testx record clientx --url    # Record browser actions
testx setup slack            # Setup Slack integration
testx setup notion           # Setup Notion integration
testx status --global        # System health check
testx analyze last-run       # Analyze last test execution
```

### Slack Commands
```bash
/testx run clientx auth       # Execute auth tests from Slack
/testx status                 # Current system status
/testx results --last 5       # Last 5 test results
/testx help                   # Available commands
```

## 🔒 Security & Credentials

### Required Credentials
Create a `.env` file with the following credentials:

```bash
# anyKrowd Environment
ANYKROWD_BASE_URL=https://krowd-dev.anykrowd.dev
ANYKROWD_TENANT=krowd-dev

# Social Login Testing (REQUIRED)
GOOGLE_TEST_EMAIL=your-google-test-account@gmail.com
GOOGLE_TEST_PASSWORD=your-google-test-password
FACEBOOK_TEST_EMAIL=your-facebook-test-account@email.com
FACEBOOK_TEST_PASSWORD=your-facebook-test-password

# Slack Integration
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_CHANNEL_ID=C08U6H5DJGM

# Notion Integration
NOTION_TOKEN=your-notion-integration-token

# GitHub Integration
GITHUB_TOKEN=your-github-personal-access-token
```

### Security Best Practices
- Never commit credentials to git
- Use dedicated test accounts for OAuth
- Rotate test credentials regularly
- Secure storage of authentication states
- Implement fallback mechanisms for service outages

## 📊 Monitoring & Analytics

### Test Execution Tracking
- **Notion Database:** Comprehensive execution logs with metadata
- **Slack Notifications:** Real-time status updates and failure alerts
- **GitHub Actions:** Automated testing on PR creation
- **Playwright Reports:** Detailed HTML reports with traces and screenshots

### Performance Metrics
- Test execution speed and reliability
- Cross-browser compatibility results
- Authentication success rates
- Integration health monitoring

## 🤖 AI/Agent Development

### AI-Optimized Features
- **Rich CLI Output:** Comprehensive error logging for AI debugging
- **Structured Data:** JSON context in Notion for AI learning
- **Clear Documentation:** Comprehensive guides for autonomous development
- **Building Rules:** Strict conventions in `.cursorrules` for consistency

### Agent Guidelines
1. Read `docs/project-rules.md` before making changes
2. Follow module-first organization strictly
3. Update documentation with every change
4. Test changes locally before committing
5. Use conventional commit messages

## 📝 Release Management

### Automated Release Process
Every story/epic completion follows a standardized release process:

#### After Each Story Completion
1. **Create Release Note** (`release-notes/v{version}-{story-name}.md`)
   - Follow template format from existing release notes
   - Document all acceptance criteria verification
   - Include technical specifications and file changes
   - Provide next development target and continuation prompt

2. **Update GitHub Repository**
   - Push feature branch: `git push origin feature/{issue-number}-{description}`
   - Update GitHub issue with completion status and release note link
   - Add appropriate labels: `completed`, `story`, `epic-{number}`
   - Close issue when all acceptance criteria verified

3. **Sync Documentation**
   - Commit and push all documentation changes
   - Update README.md for new features or setup steps
   - Verify all documentation links are working
   - Update architectural diagrams if structure changed

4. **Validate Integration**
   - Run full test suite: `npm run test`
   - Verify TypeScript compilation: `npm run type-check`
   - Check linting: `npm run lint`
   - Ensure no breaking changes introduced

#### Release Note Template
```markdown
# TestX MVP v{version} - {Story/Epic Name} Complete
**Release Date:** {YYYY-MM-DD}
**BMAD Agent:** {Agent Name and Role}
**Status:** ✅ {STORY/EPIC} COMPLETE - {Brief Status}

## 🎯 Release Summary
{Comprehensive summary of what was accomplished}

## ✅ Major Accomplishments
{Detailed list of all major features/changes}

## 📊 Technical Specifications
{Technical details, file structure, environment variables}

## 🚨 Critical Requirements for Next Steps
{What user needs to do, setup requirements}

## 🎯 Next Development Target
{Next story/epic with issue link and details}

## 🚀 OPTIMAL CONTINUATION PROMPT
{Exact prompt for next development phase}

## 📋 Validation Checklist
{All acceptance criteria with checkboxes}

## 🔗 Important Links
{Repository, issues, documentation links}
```

#### GitHub Issue Management
- **Labels:** `story`, `epic`, `completed`, `in-progress`, `blocked`, `needs-review`
- **Priority Labels:** `priority-p0` (Critical), `priority-p1` (High), `priority-p2` (Medium)
- **Updates Required:** Link to release note, status labels, completion timestamp, feature branch link

#### Quality Gates
- [ ] All tests passing locally
- [ ] TypeScript compilation successful
- [ ] No linting errors
- [ ] All documentation updated
- [ ] Feature branch pushed to GitHub
- [ ] GitHub issue updated
- [ ] Release note created and complete
- [ ] Next development target identified

## 📚 Documentation

### Core Documentation
- [Building Rules](.cursorrules) - Development guidelines and standards
- [Project Structure](docs/folder-structure.md) - Detailed folder organization
- [CLI Guide](docs/cli-guide.md) - Complete CLI command reference
- [Authentication Guide](docs/authentication-guide.md) - OAuth setup and testing
- [Troubleshooting](docs/troubleshooting.md) - Common issues and solutions

### API Documentation
- [Playwright Configuration](playwright.config.ts) - Test framework setup
- [Page Objects](src/lib/pages/) - Reusable page interaction patterns
- [Integration APIs](src/lib/integrations/) - External service integrations

## 🚨 Troubleshooting

### Common Issues

**OAuth Authentication Fails:**
- Verify test account credentials in `.env`
- Check OAuth service status
- Ensure fallback to email authentication works

**Tests Fail in CI:**
- Check GitHub Secrets configuration
- Verify browser installation in CI
- Review CI logs for specific error messages

**Slack Integration Not Working:**
- Verify bot token and channel ID
- Check bot permissions in Slack workspace
- Test fallback notification methods

**Notion Database Issues:**
- Verify integration token permissions
- Check database creation in TestX workspace
- Test offline mode functionality

### Getting Help
1. Check existing documentation
2. Review similar implementations
3. Test in isolation
4. Create GitHub issue with detailed context
5. Contact team via Slack #testx channel

## 🎯 Roadmap

### Phase 1: Foundation (Week 1-2) ✅
- [x] Project structure and configuration
- [x] GitHub repository setup
- [x] Basic CLI framework
- [x] Playwright configuration

### Phase 2: Core Testing (Week 3-4)
- [ ] ClientX authentication tests
- [ ] Page object models
- [ ] Multi-role authentication setup
- [ ] Basic CLI commands

### Phase 3: Integrations (Week 5-6)
- [ ] Slack bot integration
- [ ] Notion database setup
- [ ] GitHub Actions CI/CD
- [ ] Enhanced CLI features

### Phase 4: Production Ready (Week 7-8)
- [ ] Complete documentation
- [ ] Performance optimization
- [ ] Security hardening
- [ ] Team training

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create feature branch from `dev`
3. Follow building rules in `.cursorrules`
4. Test changes locally
5. Submit PR with clear description

### Code Standards
- TypeScript with strict type checking
- Playwright best practices
- Conventional commit messages
- Comprehensive error handling
- Module-first organization

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **BMAD Method:** Business, Method, Architecture, Development approach
- **Playwright Team:** Excellent testing framework and documentation
- **anyKrowd Team:** Domain expertise and testing requirements
- **Open Source Community:** Tools and libraries that make this possible

---

**TestX MVP: Intelligent. Reliable. Professional. Playwright-Powered.** 🚀 