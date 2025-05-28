Here’s the quickest path to getting the xoxb-… Bot User OAuth token you need for SLACK_BOT_TOKEN:

⸻

1. Create (or open) your Slack app
	1.	Sign into the workspace where you want the bot to live.
	2.	Go to https://api.slack.com/apps → Create New App → From scratch.
If you’ve already created the app, just click its tile instead.

2. Add a bot user & scopes
	1.	In the left sidebar choose Features → OAuth & Permissions.
	2.	Scroll to Scopes → Bot Token Scopes and add the permissions your bot needs (at minimum for sending messages use chat:write; you’ll often add app_mentions:read, channels:read, etc.).
	3.	Click Save Changes.

3. Install the app to the workspace
	1.	Still in the sidebar, click Install App (or Deployments → Install App) and press Install to Workspace.
	2.	Approve the permission screen.

4. Copy your Bot User OAuth Token

After installation, Slack drops you back on the OAuth & Permissions page. At the very top you’ll see “Bot User OAuth Token”—it starts with xoxb-. Click Copy. Slack’s docs call this out explicitly: “Navigate to the Install App section under Settings. Here, you’ll find your Bot User OAuth Token.”  ￼

5. Drop it into .env

# Slack credentials
SLACK_BOT_TOKEN=xoxb-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

(Keep it out of version control—your .gitignore/global ignore rule that hides .env files is there for a reason!)

⸻

Tips & gotchas

Issue	Fix
Token changes when you reinstall or change scopes	Grab the new xoxb-… and update your .env.
Getting a 401 / invalid_auth	Make sure the workspace you’re posting to is the one where the app is installed, and that you’re using the Bot token (starts xoxb-), not the User token (xoxp-).
Can’t see Install App	You may need a workspace owner/admin to allow “install apps” for developers.

That’s it—once the token is in your .env, the agent (or any code that reads SLACK_BOT_TOKEN) can authenticate to Slack. Let me know if you need help choosing scopes or setting up a signing secret!