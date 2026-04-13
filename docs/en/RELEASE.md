# Pomodoro Hijack — Release Guide

## Distribution

Distributed as `.vsix` files via GitHub Releases. Not published to the VS Code Marketplace.

---

## Release Flow

### Step 1: Bump the version

```bash
# patch (0.0.1 → 0.0.2)
npm version patch

# minor (0.0.2 → 0.1.0)
npm version minor

# major (0.1.0 → 1.0.0)
npm version major
```

> `npm version` automatically creates a version tag (e.g. `v0.0.2`).

### Step 2: Push the tag to trigger an automatic release

```bash
git push origin main --follow-tags
```

GitHub Actions will automatically:

1. Build, lint, and test
2. Create a `.vsix` package
3. Create a GitHub Release and upload the `.vsix`

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
