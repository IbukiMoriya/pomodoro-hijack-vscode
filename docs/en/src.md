# src/ Source Code Details

## File List and Responsibilities

### types.ts — Shared Type Definitions

Centrally manages types used throughout the project.

| Type Name | Kind | Description |
|-----------|------|-------------|
| `Phase` | type | Timer state (`'work' \| 'break' \| 'longBreak' \| 'idle'`) |
| `PomodoroSettings` | interface | User settings structure |
| `HijackOptions` | interface | Options for displaying the break panel |

### constants.ts — Constant Definitions

Display strings and magic numbers separated from logic.

| Constant Name | Purpose |
|---------------|---------|
| `PHASE_LABELS` | Display labels for each Phase ("Work", "Break", etc.) |
| `PHASE_ICONS` | VS Code icons for each Phase (`$(flame)`, etc.) |
| `PHASE_TOOLTIPS` | Status bar tooltip strings |
| `WELLNESS_TIPS` | Wellness tips shown during breaks (in Japanese) |
| `TIMER_INTERVAL_MS` | Timer tick interval (1000ms) |
| `STAR_COUNT` | Number of star effects on break screen (60) |
| `STATUS_BAR_PRIORITY` | Status bar display priority (100) |

### utils.ts — Utility Functions

| Function Name | Arguments | Return | Description |
|---------------|-----------|--------|-------------|
| `formatTime(totalSeconds)` | `number` | `string` | Format seconds as `M:SS` |
| `minutesToSeconds(minutes)` | `number` | `number` | Convert minutes → seconds |
| `minutesToMs(minutes)` | `number` | `number` | Convert minutes → milliseconds |
| `escapeHtml(s)` | `string` | `string` | Escape HTML special characters |

### settings.ts — Settings Management

Loads configuration values using VSCode's `workspace.getConfiguration()`.

- `CONFIG_SECTION`: Settings namespace (`"pomodoroHijack"`)
- `DEFAULTS`: Centrally defined default values for each setting
- `loadSettings()`: Reads settings and returns a `PomodoroSettings` object

### extension.ts — Entry Point

Manages the VSCode extension lifecycle.

- `activate(context)`: Registers commands, watches for setting changes, handles autoStart
- `deactivate()`: Stops the timer

Registered commands:
- `pomodoroHijack.start` — Start the timer
- `pomodoroHijack.stop` — Stop the timer
- `pomodoroHijack.status` — Show current status

### pomodoroTimer.ts — Core Timer Logic

The `PomodoroTimer` class manages the entire Pomodoro cycle.

**Public methods:**
| Method | Description |
|--------|-------------|
| `start()` | Start the cycle (only when idle) |
| `stop()` | Stop the timer, hide status bar |
| `showStatus()` | Notify current phase and remaining time |
| `reloadSettings()` | Reload settings |

**Internal methods:**
| Method | Description |
|--------|-------------|
| `startWorkPhase()` | Start work phase |
| `startBreakPhase()` | Start break phase (includes long/short determination) |
| `onWorkComplete()` | Handler for work completion |
| `onBreakComplete()` | Handler for break completion |
| `startCountdown(onComplete)` | Start countdown |
| `clearTimer()` | Clear interval |
| `updateStatusBar()` | Update status bar |
| `log(message)` | Log to OutputChannel |

### hijackPanel.ts — Webview Panel Management

The `HijackPanel` class manages the display/dismissal of the break screen.

- `show(context, options)`: Creates the panel, sets up message listener, configures auto-dismiss timer
- `dismiss()`: Manually closes the panel

### breakTemplate.ts — Break Screen Template

Generates HTML/CSS/JS templates. Completely separated from logic.

| Function Name | Description |
|---------------|-------------|
| `renderBreakHtml(options)` | Generate complete break screen HTML (public) |
| `getStyles()` | Return CSS string (internal) |
| `getScript(totalSeconds, enforceFullBreak)` | Return JS string (internal) |

## Design Principles

1. **Centralized types**: Aggregated in `types.ts`; each module re-exports as needed
2. **Separated constants**: Magic numbers and display strings extracted to `constants.ts`
3. **Separated templates**: HTML generation in `breakTemplate.ts`, kept apart from panel management logic
4. **Shared utilities**: Duplicated logic (time formatting, etc.) extracted to `utils.ts`
