# Pomodoro Hijack — Release Guide

## Distribution

Distributed as `.vsix` files via GitHub Releases. Not published to the VS Code Marketplace.

---

## Release Flow

### Step 1: Create a release branch and bump the version

```bash
git checkout -b release/vX.X.X

# patch (0.0.2 → 0.0.3)
npm version patch

# minor (0.0.3 → 0.1.0)
npm version minor

# major (0.1.0 → 1.0.0)
npm version major
```

Also update CHANGELOG.md.

### Step 2: Create a PR and merge

```bash
git push origin release/vX.X.X
```

Create a PR on GitHub, review, and merge.

After merging, GitHub Actions will automatically:

1. Build, lint, format check, and test
2. Read the version from `package.json` and create a git tag
3. Create a `.vsix` package
4. Create a GitHub Release and upload the `.vsix`

### Step 3: Verify

Check the [Releases page](https://github.com/ibukimoriya/pomodoro-hijack-vscode/releases) to confirm the release was created and the `.vsix` is available for download.

---

## Building .vsix manually

```bash
# Install vsce
npm install -g @vscode/vsce

# Create the package
vsce package --no-dependencies

# → pomodoro-hijack-x.x.x.vsix will be generated
```

---

## Installation (for users)

Download the `.vsix` file from GitHub Releases and install using one of the following methods:

```bash
# From the command line
code --install-extension pomodoro-hijack-x.x.x.vsix
```

Or from within VSCode:

1. `Ctrl+Shift+P` → `Extensions: Install from VSIX...`
2. Select the downloaded `.vsix` file

---

## Pre-release checklist

- [ ] `npm run compile` passes without errors
- [ ] `npm run lint` passes without errors
- [ ] `npm run format:check` passes without errors
- [ ] `npm test` passes
- [ ] Verified via F5 debug launch
- [ ] Version in `package.json` has been updated
- [ ] `CHANGELOG.md` has been updated

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `vsce: command not found` | Run `npm install -g @vscode/vsce` |
| `npm version` fails | Ensure working tree is clean (`git status`) |
| GitHub Actions fails | Check the Actions log and fix any lint or test errors |
