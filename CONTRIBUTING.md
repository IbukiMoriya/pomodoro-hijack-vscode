# Contributing Guide

> **[日本語](docs/ja/CONTRIBUTING.md)**

Thank you for your interest in contributing to Pomodoro Hijack!

## Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/<your-username>/pomodoro-hijack-vscode.git
cd pomodoro-hijack-vscode

# Install dependencies
npm install
```

Open this folder in VSCode and press `F5` to launch the Extension Development Host for debugging.

## Lint

We use [oxlint](https://oxc.rs/).

```bash
npm run lint
```

Please make sure there are no lint errors before submitting a PR.

## Testing

We use [vitest](https://vitest.dev/).

```bash
npm test
```

Please include tests when adding new features.

## Coding Conventions

- Write in TypeScript
- Follow oxlint rules
- Use camelCase for variables/functions, PascalCase for types
- Comments in Japanese or English are both welcome

## How to Submit a PR

1. **Fork** this repository
2. Create a feature branch (`git checkout -b feature/my-change`)
3. Commit your changes
4. Push to your fork (`git push origin feature/my-change`)
5. Create a **Pull Request** on GitHub

- Keep the PR title concise and descriptive
- Link related issues if applicable (`Closes #123`)

## Writing Issues

- **Bug reports**: Include steps to reproduce, expected behavior, and actual behavior
- **Feature requests**: Describe the problem you want to solve and your proposed solution
- Issue templates are provided — please use them

## Release

See [Release Guide](docs/en/RELEASE.md) for the release process.

---

If you have any questions, feel free to open an issue.
