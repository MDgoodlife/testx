# OAuth Integration Setup Guide

## Overview

This guide provides comprehensive instructions for setting up OAuth integration with Google and Facebook for TestX authentication testing, including fallback strategies and credential management.

## Prerequisites

- Node.js 18+ installed
- Access to anyKrowd krowd-dev environment
- Google and Facebook developer accounts (for OAuth setup)
- Test email accounts for OAuth providers

## OAuth Provider Setup

### Google OAuth Setup

#### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Enable the Google+ API and Google OAuth2 API

#### 2. Configure OAuth Consent Screen

1. Navigate to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in required information:
   - App name: "TestX Development"
   - User support email: Your email
   - Developer contact information: Your email
4. Add test users (your test account emails)

#### 3. Create OAuth Credentials

1. Navigate to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized redirect URIs:
   - `https://krowd-dev.anykrowd.dev/auth/google/callback`
   - `http://localhost:3000/auth/google/callback` (for local testing)
5. Save the Client ID and Client Secret

#### 4. Create Test Account

1. Create a dedicated Google account for testing
2. Add this account to the OAuth consent screen test users
3. Verify the account can access the OAuth flow

### Facebook OAuth Setup

#### 1. Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "Create App" > "Consumer" > "Next"
3. Enter app details:
   - App name: "TestX Development"
   - Contact email: Your email

#### 2. Configure Facebook Login

1. Add "Facebook Login" product to your app
2. Configure settings:
   - Valid OAuth Redirect URIs:
     - `https://krowd-dev.anykrowd.dev/auth/facebook/callback`
     - `http://localhost:3000/auth/facebook/callback`

#### 3. Get App Credentials

1. Navigate to "Settings" > "Basic"
2. Copy the App ID and App Secret
3. Add your domain to "App Domains"

#### 4. Create Test Account

1. Create a dedicated Facebook account for testing
2. Add this account as a test user in your app
3. Verify the account can access the OAuth flow

## Environment Configuration

### 1. Copy Environment Template

```bash
cp .env.example .env
```

### 2. Configure OAuth Credentials

Edit your `.env` file with the following:

```bash
# anyKrowd Environment
ANYKROWD_BASE_URL=https://krowd-dev.anykrowd.dev
ANYKROWD_TENANT=krowd-dev

# Google OAuth (REQUIRED for Google OAuth testing)
GOOGLE_TEST_EMAIL=your-google-test-account@gmail.com
GOOGLE_TEST_PASSWORD=your-google-test-password
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret

# Facebook OAuth (REQUIRED for Facebook OAuth testing)
FACEBOOK_TEST_EMAIL=your-facebook-test-account@example.com
FACEBOOK_TEST_PASSWORD=your-facebook-test-password
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret

# Fallback Authentication (REQUIRED)
FALLBACK_TEST_EMAIL=your-fallback-test-account@example.com
FALLBACK_TEST_PASSWORD=your-fallback-test-password

# OAuth Configuration
OAUTH_TIMEOUT_MS=30000
OAUTH_RETRY_ATTEMPTS=3
OAUTH_FALLBACK_ENABLED=true
OAUTH_MOCK_MODE=false
```

### 3. Validate Configuration

Run the configuration validation:

```bash
npm run test:oauth-config
```

## Fallback Strategy

### Email Authentication Fallback

When OAuth providers are unavailable, the system automatically falls back to email authentication:

1. **Automatic Detection**: Service monitor checks OAuth provider availability
2. **Graceful Degradation**: Falls back to email authentication when OAuth fails
3. **Retry Logic**: Attempts OAuth first, then falls back after configured retries
4. **Clear Logging**: Provides detailed logs about fallback decisions

### Mock Mode

For development and CI environments where OAuth is not available:

```bash
# Enable mock mode
OAUTH_MOCK_MODE=true
```

Mock mode provides:
- Simulated OAuth responses
- Consistent test data
- No external API dependencies
- Fast test execution

## Testing OAuth Integration

### Run OAuth Integration Tests

```bash
# Run all OAuth tests
npm run test:oauth

# Run specific OAuth test suites
npm run test src/tests/clientx/auth/oauth-integration.spec.ts

# Run with debug output
DEBUG=oauth npm run test:oauth
```

### Test Different Scenarios

1. **OAuth Success**: Test with valid credentials
2. **OAuth Failure**: Test with invalid credentials
3. **Service Unavailable**: Test with network issues
4. **Fallback**: Test email authentication fallback
5. **Mock Mode**: Test with simulated responses

## Credential Management

### Security Best Practices

1. **Never commit credentials** to version control
2. **Use dedicated test accounts** for OAuth testing
3. **Rotate credentials regularly** (every 30 days)
4. **Monitor for suspicious activity** on test accounts
5. **Use environment-specific credentials**

### Credential Rotation

Configure automatic credential rotation:

```bash
# Enable credential rotation
CREDENTIAL_ROTATION_ENABLED=true
CREDENTIAL_ROTATION_DAYS=30
CREDENTIAL_ROTATION_WARNING_DAYS=7
CREDENTIAL_AUTO_ROTATE=false
CREDENTIAL_ROTATION_NOTIFICATIONS=slack,email
```

### Monitoring and Alerts

The system provides monitoring for:
- OAuth provider availability
- Authentication success/failure rates
- Credential expiration warnings
- Service degradation detection

## Troubleshooting

### Common Issues

#### OAuth Provider Not Available

```
Error: OAuth provider 'google' is not available
```

**Solutions:**
1. Check internet connectivity
2. Verify OAuth provider credentials
3. Check if provider service is down
4. Enable fallback authentication

#### Invalid Credentials

```
Error: Authentication failed with invalid credentials
```

**Solutions:**
1. Verify test account credentials in `.env`
2. Check if test account is active
3. Verify OAuth app configuration
4. Check if account needs re-authentication

#### Fallback Authentication Failed

```
Error: Fallback authentication failed
```

**Solutions:**
1. Verify fallback credentials in `.env`
2. Check anyKrowd environment availability
3. Verify test account has proper permissions
4. Check network connectivity

### Debug Mode

Enable debug logging for detailed troubleshooting:

```bash
# Enable OAuth debug logging
DEBUG=oauth:* npm run test

# Enable all debug logging
DEBUG=* npm run test
```

### Health Check

Run the OAuth health check:

```bash
npm run oauth:health-check
```

This will verify:
- Environment configuration
- OAuth provider availability
- Credential validity
- Fallback system status

## User vs Agent Responsibilities

### User Responsibilities

1. **OAuth App Setup**: Create and configure OAuth applications
2. **Test Account Creation**: Create dedicated test accounts
3. **Credential Provision**: Provide credentials in `.env` file
4. **Account Maintenance**: Keep test accounts active and secure
5. **Approval for Changes**: Approve credential rotation and updates

### Agent Responsibilities

1. **Automatic Testing**: Run OAuth integration tests
2. **Fallback Detection**: Automatically detect when to use fallback
3. **Error Handling**: Handle OAuth failures gracefully
4. **Monitoring**: Monitor OAuth provider availability
5. **Reporting**: Report authentication status and issues

### Handoff Procedures

1. **Initial Setup**: User creates OAuth apps → Agent validates configuration
2. **Credential Updates**: User updates credentials → Agent validates and tests
3. **Issue Detection**: Agent detects issues → User investigates and resolves
4. **Rotation**: Agent warns about expiration → User rotates credentials

## Integration with CI/CD

### GitHub Actions

Configure OAuth testing in CI:

```yaml
# .github/workflows/oauth-tests.yml
name: OAuth Integration Tests

on: [push, pull_request]

jobs:
  oauth-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run OAuth tests
        env:
          OAUTH_MOCK_MODE: true
          OAUTH_FALLBACK_ENABLED: true
        run: npm run test:oauth
```

### Environment-Specific Configuration

- **Development**: Full OAuth + fallback
- **Staging**: OAuth with fallback
- **CI/CD**: Mock mode only
- **Production**: Not applicable (testing only)

## Support and Escalation

### When to Escalate

1. **OAuth Provider Changes**: When providers change their APIs
2. **Security Issues**: When credentials are compromised
3. **Service Outages**: When multiple providers are unavailable
4. **Configuration Issues**: When setup instructions don't work

### Support Channels

1. **Documentation**: Check this guide and README
2. **Logs**: Review OAuth debug logs
3. **Health Check**: Run system health check
4. **Team Support**: Contact development team
5. **Provider Support**: Contact OAuth provider support

## Appendix

### Useful Commands

```bash
# Test OAuth configuration
npm run test:oauth-config

# Run OAuth health check
npm run oauth:health-check

# Test specific provider
npm run test:oauth -- --grep "google"

# Run with fallback only
OAUTH_FALLBACK_ENABLED=true npm run test:oauth

# Run in mock mode
OAUTH_MOCK_MODE=true npm run test:oauth
```

### Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_TEST_EMAIL` | Yes* | Google test account email |
| `GOOGLE_TEST_PASSWORD` | Yes* | Google test account password |
| `GOOGLE_CLIENT_ID` | No | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | No | Google OAuth client secret |
| `FACEBOOK_TEST_EMAIL` | Yes* | Facebook test account email |
| `FACEBOOK_TEST_PASSWORD` | Yes* | Facebook test account password |
| `FACEBOOK_APP_ID` | No | Facebook app ID |
| `FACEBOOK_APP_SECRET` | No | Facebook app secret |
| `FALLBACK_TEST_EMAIL` | Yes | Fallback email account |
| `FALLBACK_TEST_PASSWORD` | Yes | Fallback email password |
| `OAUTH_FALLBACK_ENABLED` | No | Enable fallback (default: true) |
| `OAUTH_MOCK_MODE` | No | Enable mock mode (default: false) |

*Required unless fallback credentials are provided 