# Configuration Reference

## User Settings

You can change the following via the VSCode settings UI or `settings.json`.
All settings are under the `pomodoroHijack.*` namespace.

| Setting Key | Type | Default | Range | Description |
|-------------|------|---------|-------|-------------|
| `workMinutes` | number | 25 | 1–120 | Work session duration (minutes) |
| `breakMinutes` | number | 5 | 1–30 | Short break duration (minutes) |
| `longBreakMinutes` | number | 15 | 1–60 | Long break duration (minutes) |
| `cyclesBeforeLongBreak` | number | 4 | 2–10 | Cycles before a long break |
| `autoStart` | boolean | true | — | Auto-start when VSCode launches |
| `enforceFullBreak` | boolean | true | — | Prevent early dismiss during breaks |

## settings.json Example

```json
{
  "pomodoroHijack.workMinutes": 50,
  "pomodoroHijack.breakMinutes": 10,
  "pomodoroHijack.longBreakMinutes": 30,
  "pomodoroHijack.cyclesBeforeLongBreak": 3,
  "pomodoroHijack.autoStart": false,
  "pomodoroHijack.enforceFullBreak": false
}
```

## How Settings Take Effect

Settings are applied in real time (via the `onDidChangeConfiguration` event which calls `reloadSettings()`).
However, the remaining time of the current phase is not affected. New settings apply from the next phase onward.

## Development Tool Settings

### oxlint (`.oxlintrc.json`)

```json
{
  "plugins": ["typescript"],
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "off",
    "typescript/no-explicit-any": "warn",
    "typescript/only-throw-error": "error"
  },
  "ignorePatterns": ["out/", "node_modules/", "*.js"]
}
```

### TypeScript (`tsconfig.json`)

Strict mode enabled, ES2022 target, CommonJS modules.
See [out.md](./out.md) for details.

### npm Scripts

| Command | Description |
|---------|-------------|
| `npm run compile` | TypeScript compilation |
| `npm run watch` | File watch + auto-compile |
| `npm run lint` | Code linting with oxlint |
