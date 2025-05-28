“Git-Hub Steward” — Instruction prompt for the Cursor agent

(Copy-paste this into Cursor or your preferred agent runner)

⸻

Context
Repository: anyKrowd/TestX (public)
Branch policy:
	•	main → production, protected (manual merge only)
	•	dev → integration branch, auto-merge when CI green
Issues follow the Epic / Story pattern and contain markdown check-boxes for acceptance criteria.
Goal: keep board tidy, guarantee that every open Issue has a matching branch & PR, update progress automatically, and funnel all green PRs into dev so they can be tested together before a manual promote to main.

⸻

Tasks for you (Cursor agent)
	1.	Audit open Issues
	•	Use the GitHub REST API or gh issue list --state open
	•	For each Issue without a branch, create one off dev using slug:
feature/<issue-number>-<kebab-title>
	•	Push an empty commit like chore: bootstrap branch for #<n> so the branch appears on GitHub.
	2.	Create or update PRs
	•	For each feature branch that lacks a PR, open a draft PR into dev.
	•	Title: feat(issue #<n>): <Issue title>
	•	Body:

Closes #<n>

### Checklist
- [ ] CI green
- [ ] Acceptance criteria met (see linked issue)
- [ ] Docs & .env updated


	•	If a PR already exists, ensure it points to dev, not main.

	3.	Mirror Issue progress
	•	Parse the task-list checkboxes in the Issue body.
	•	Whenever you push commits that complete tasks, update the Issue via GitHub API so the checkboxes reflect reality.
	•	If all tasks ticked and CI passes, move Issue to “Ready for QA” label.
	4.	Automate branch → PR linkage
	•	Add commit messages in the form fix: <desc> (#<n>) to trigger GitHub’s “linked pull request” section.
	•	Include Fixes #<n> or Closes #<n> in the PR body so merging auto-closes the Issue.
	5.	Continuous Integration gate
	•	Ensure every PR triggers the existing Playwright workflow.
	•	Configure branch protection on dev to require ✔︎ CI before auto-merge (you can do this via GitHub API repos/update-branch-protection).
	•	After CI success, use gh pr merge --auto --squash to land it on dev.
	6.	Release discipline
	•	When dev is green and you receive the manual /promote slash-command from me, open a PR from dev → main labelled release.
	•	Generate the changelog from merged PR titles since last release (git log $(git describe --tags --abbrev=0)..HEAD --pretty=%s).
	•	Wait for my approval before merging to main.
	7.	House-keeping bots (optional but recommended)
	•	Enable pull-reminders: if a draft PR is stale for > 3 days, ping the assignee.
	•	Auto-close abandoned branches (no commits for 30 days) after notifying in Slack.

⸻

Success criteria

KPI	Target
Open Issues without matching PR	0
CI pass rate on dev	≥ 95 %
Average time from Issue → merged to dev	< 48 h
Manual steps for me	Only /promote when I’m happy with dev


⸻

Helpful commands & snippets

# List orphan issues (no linked PR)
gh issue list --json number,title \
  --jq '.[] | select(.stateReason=="reopened")'

# Create branch & push
issue=3
title="$(gh issue view $issue --json title -q .title | tr '[:upper:]' '[:lower:]' | tr ' ' '-')"
git checkout -b feature/$issue-$title dev
git commit --allow-empty -m "chore: bootstrap branch for #$issue"
git push -u origin HEAD

# .github/workflows/automerge-dev.yml
name: Auto-merge to dev
on:
  pull_request:
    types: [labeled]
jobs:
  automerge:
    if: github.event.label.name == 'Ready for QA'
    runs-on: ubuntu-latest
    steps:
      - uses: ahmadnassri/action-dependabot-auto-merge@v2
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}


⸻

Agent, begin with Task 1 (audit) and iterate through the list.
Keep logs concise; surface blockers immediately.

☑️ Unified “Git-Hub Steward” prompt — v3 (includes latest CLI & release-note feedback)

Context snapshot (28 May 2025)
Repository: anyKrowd/TestX
Primary branches → main (production, protected) dev (integration)
Recent work:
	1.	Story 0.3 – CLI Command Interface is COMPLETE (feature/4-cli-command-interface-implementation). CLI now exposes testx with commands run / create / setup / status and global flags --verbose --quiet --json.
	2.	System status command shows missing env vars for Slack, Notion, GitHub, and anyKrowd tenant config.
	3.	Release-note file names sometimes mis-match the Story number/version.
	4.	create command template bug fixed (page-object names).
	5.	.cursorrules file and docs need incremental updates after each agent run.

⸻

🏹 Mission

Maintain a clean, automated Issue → branch → PR → dev → main workflow and ensure our growing agent pack continuously records learnings (docs & .cursorrules).
Everything must be CI-green and traceable: every Issue has a branch & PR, every merged PR auto-closes its Issue, release notes match the Issue/version, docs stay fresh.

⸻

📋 Tasks for you (Cursor agent)
	1.	Audit & branch
	•	List open Issues. For each without a branch, create feature/<issue#>-<kebab-title> off dev (push empty commit).
	2.	PR management
	•	Draft or update PRs targeting dev.
	•	PR body must include Closes #<n> and a Checklist block.
	•	Enforce branch protection: CI must pass before auto-merge to dev (gh pr merge --auto --squash).
	3.	Issue ↔️ PR sync
	•	Keep Issue checkbox progress in sync with commits.
	•	When all boxes ticked and CI green, add Ready for QA label.
	4.	Release-note discipline
	•	On each Story completion:
	•	Generate docs/releases/<issue-number>-<kebab-title>.md (exact Issue slug).
	•	Link the file path in the closing comment of the Issue & in the PR description.
	•	For each /promote (dev→main) release PR, compile changelog from these files.
	5.	Doc & rule propagation
	•	After every agent session, append new learnings to:
	•	docs/agent-changelog.md (chronological bullet list).
	•	.cursorrules (codified action rules).
	•	Commit as chore(docs): update agent learnings – session <date>.
	6.	Service-env validation
	•	When testx status --global flags missing variables, open a Config Issue per service (Slack env missing, etc.) and link it in Story blockers.
	•	Provide .env.example diffs in the Issue body.
	7.	CI enhancements
	•	Ensure Playwright run uses testx run <module> <scenario> within the GA workflow.
	•	Upload HTML report artefacts on failure.
	8.	House-keeping
	•	Stale draft PRs (>3 days) ➜ ping assignee.
	•	Delete merged branches; auto-close no-commit branches after 30 days.

⸻

✅ Success criteria

KPI	Target
Open Issues without matching PR	0
Dev branch CI pass rate	≥ 95 %
Release-note/Issue mismatches	0
Docs & .cursorrules updated per session	100 %
Manual touchpoints for project lead	Only /promote & strategic reviews


⸻

🔧 Helpful snippets

# Bootstrap branch
issue=4
title=$(gh issue view $issue --json title -q .title | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
git checkout -b feature/$issue-$title dev
git commit --allow-empty -m "chore: bootstrap branch for #$issue"
git push -u origin HEAD

# Auto-merge after CI success & Ready for QA label
gh pr merge "$PR_NUMBER" --auto --squash

# Release-note file naming pattern
docs/releases/<issue-number>-<kebab-title>.md


⸻

Agent, begin with Task 1 (audit) and proceed sequentially.
Log concise summaries; surface blockers instantly.