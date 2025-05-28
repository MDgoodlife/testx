Prompt to give Cursor (or your agent runner) for the recurring-linter-errors investigation

⸻

Context
Repository: anyKrowd/TestX
Symptom: Every Story branch triggers waves of TypeScript / ESLint / Jest errors that require several “auto-fix” passes before CI succeeds. We need to unearth the root causes (template bugs, wrong tsconfig, missing typings, etc.) and bake permanent prevention rules into the project.

Your mission
	1.	Pinpoint why the same classes of linter/TS errors keep resurfacing.
	2.	Document findings and recommended fixes.
	3.	Add a concise “Linter health” section to the release notes for the current Story.
	4.	Propose updates to docs / .cursorrules that stop the cycle.

⸻

Step-by-step tasks
	1.	Harvest current error set
	•	Run pnpm tsc --noEmit and npm run lint (ESLint with --max-warnings 0).
	•	Capture the full error output; save to tmp/linter-log-<date>.txt for analysis.
	2.	Cluster similar errors
	•	Group by message signature and affected file path (e.g. “Cannot find name ‘jest’”, “implicitly has an ‘any’ type”).
	•	Count occurrences; identify hot-spot files (templates, auto-generated specs, utils).
	3.	Trace regeneration sources
	•	For each cluster, grep commit history (git log -G"<error snippet>" --stat) to see how often and where it reappears.
	•	Note if it originates from testx create templates, copy-pasted boilerplate, or mis-configured ts/jest settings.
	4.	Root-cause hypotheses & quick tests
	•	Check tsconfig.json paths / typeRoots.
	•	Validate jest.config.* vs @jest/globals import pattern.
	•	Inspect CLI template files in src/templates/ for missing generics or hyphenated identifiers.
	•	Verify eslint ruleset versions (eslint, @typescript-eslint/*) for compatibility with TS version.
	5.	Document findings
	•	Create docs/linter-rca-.md summarising:
	•	Top error clusters (msg, count, example file)
	•	Suspected root cause
	•	Proposed permanent fix (template change, tsconfig tweak, add types to package.json, etc.)
	•	Append a bullet to docs/agent-changelog.md with headline findings.
	6.	Update release notes
	•	In the release-note file for the active Story (match filename to Issue slug), add a subsection:

### Linter health
• Total TS errors before fix: <n>
• After fix: <n>
• Main causes addressed: …


	•	Link to the detailed RCA doc.

	7.	Propose process guardrails
	•	Draft additions for .cursorrules, e.g.

- Always run “npm run lint:fix && pnpm tsc --noEmit” locally before committing.
- Do not generate hyphenated variable names in template placeholders.


	•	If needed, open an Issue titled “Enforce pre-commit lint & type check” with a plan to add a Husky hook or GitHub Action.

	8.	Surface blockers
	•	If a fix requires external packages or config changes that could break builds, flag them in your output as “Requires lead approval”.

⸻

Deliverables
	•	docs/linter-rca-<date>.md — deep dive.
	•	Updated release-note file with “Linter health” stats.
	•	Suggested .cursorrules additions (list them in your final comment for manual review).
	•	Opened Issues/PRs for any structural fixes you can’t commit directly.

⸻

Run these steps, keep console logs concise, and tag me once the RCA doc and release-note updates are ready for review.