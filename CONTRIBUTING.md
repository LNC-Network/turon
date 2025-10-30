Thanks for wanting to contribute to turon! This document explains how to file issues and pull requests, coding conventions, tests, and the review process.

1. Getting started
- Fork the repo and create a branch from main for your change:
  - git checkout -b feat/short-description
- Install dependencies:
  - npm ci
- Build locally (TypeScript):
  - npm run build
- Link locally to test CLI behaviour:
  - npm link
  - Use the CLI as a global command while developing.

2. Issue policy
- Search existing issues before opening a new one.
- For bug reports include:
  - Node/npm/yarn version
  - turon version (from package.json or build)
  - Steps to reproduce
  - Expected vs actual behavior
  - Minimal reproducible example if possible
- For feature requests include:
  - Use-case and motivation
  - Example CLI input/output or flags
  - Backwards-compatibility considerations

3. How to contribute code
- One logical change per PR. Keep PRs small and focused.
- Branch naming convention:
  - feat/<short-desc>, fix/<short-desc>, chore/<short-desc>, docs/<short-desc>
- Follow commit message guidelines (Conventional Commits recommended):
  - Example: feat(generator): add express-typescript template
  - Example: fix(cli): correctly parse --port flag
- Include tests for bug fixes and new features.
- Update README or docs when behavior or CLI flags change.

4. Code style and quality
- Use TypeScript where appropriate; follow the repo’s tsconfig and target.
- Run linter/formatter:
  - npm run lint
  - npm run format
- Preferred rules:
  - Prettier for formatting
  - ESLint with recommended rules + TypeScript plugin
  - No committed trailing whitespace; consistent semicolons per existing style
- Add or update types for public exports and CLI options.

5. Testing
- Add unit tests for generators and core logic. Avoid brittle tests that rely on file timestamps or environment.
- End-to-end tests for the CLI (example: create a project in a tmp dir, assert files and package.json).
- Run:
  - npm test
  - npm run test:watch (if available)
- CI must pass before merging.

6. Pull request process
- Open a PR against main.
- PR description should include:
  - What problem is solved
  - Key design decisions
  - How to test locally (commands)
- Link the related issue (if any).
- A maintainer or reviewer will review; respond to feedback and update the branch.
- Squash or rebase commits as requested by maintainers to keep history tidy.

7. Releases and changelog
- Use Conventional Commits to automate changelogs/releases (optional: semantic-release).
- Update changelog for breaking changes and noteworthy features if not automated.

8. CI & pre-commit hooks (recommended)
- Use GitHub Actions to run tests and lint on PRs.
- Use Husky + lint-staged to run formatting/lint checks on staged files.
- Consider commitlint to enforce Conventional Commits.

9. Security and disclosures
- Do not include secrets or private keys in PRs or issues.
- For security vulnerabilities, email the maintainers (provide preferred contact) or use GitHub’s private security advisory flow.

10. Documentation
- Keep README and generator templates up to date.
- When adding new CLI flags, add examples showing usage.
- Add inline comments for complex logic and keep exported public APIs documented.

11. Code of conduct
- Please follow the project’s Code of Conduct (include a CODE_OF_CONDUCT.md). Be respectful and constructive.

12. Maintainers
- List maintainers or how to get attention (e.g., ping @owner or open an issue).

Appendix: Example npm scripts (suggested)
- "build": "tsc -p tsconfig.json"
- "lint": "eslint 'src/**'"
- "format": "prettier --write ."
- "test": "jest"
- "prepare": "npm run build"

Appendix: Example Conventional Commit types to use
- feat: new feature
- fix: bug fix
- docs: documentation only changes
- style: formatting, no code change
- refactor: code change that neither fixes a bug nor adds a feature
- test: adding or fixing tests
- chore: build process or auxiliary tools

Would you like me to:
- create this CONTRIBUTING.md in the repository now, or
- also add ISSUE_TEMPLATE.md and PULL_REQUEST_TEMPLATE.md and a CODE_OF_CONDUCT.md?
If yes, do you want Conventional Commits/commitlint and Husky configured automatically?
