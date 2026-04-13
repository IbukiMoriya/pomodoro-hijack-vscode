# Architecture Overview

## Directory Structure

```
pomodoro-hijack-vscode/
├── src/                    # TypeScript source code
│   ├── extension.ts        # Entry point (activate / deactivate)
│   ├── pomodoroTimer.ts    # Core timer logic
│   ├── hijackPanel.ts      # Webview panel management
│   ├── breakTemplate.ts    # Break screen HTML template
│   ├── settings.ts         # VSCode settings loader
│   ├── types.ts            # Shared type definitions
│   ├── constants.ts        # Constants (labels, icons, tips, etc.)
│   └── utils.ts            # Utility functions
├── out/                    # tsc compiled output (auto-generated)
├── docs/                   # Documentation
├── media/                  # Assets such as icons
├── .vscode/                # VSCode debug/task configuration
├── package.json            # Extension manifest & dependencies
├── tsconfig.json           # TypeScript compiler configuration
└── .oxlintrc.json          # oxlint configuration
```

## Module Dependencies

```
extension.ts
  ├── pomodoroTimer.ts
  │     ├── settings.ts → types.ts
  │     ├── hijackPanel.ts
  │     │     ├── breakTemplate.ts
  │     │     │     ├── types.ts
  │     │     │     ├── constants.ts
  │     │     │     └── utils.ts (escapeHtml)
  │     │     ├── types.ts
  │     │     └── utils.ts (minutesToMs)
  │     ├── types.ts
  │     ├── constants.ts
  │     └── utils.ts (formatTime, minutesToSeconds)
  └── settings.ts → types.ts
```

## Data Flow

1. **Startup**: `activate()` in `extension.ts` is called, creating a `PomodoroTimer`
2. **Load settings**: `settings.ts` retrieves configuration values via the VSCode configuration API
3. **Timer cycle**: `PomodoroTimer` manages the work → break → work cycle
4. **Screen hijack**: `HijackPanel` displays a Webview panel when a break phase begins
5. **HTML generation**: `breakTemplate.ts` assembles the template and passes it to the Webview
6. **User interaction**: The dismiss button inside the Webview sends a `postMessage` to the extension

## Phase State Transitions

```
idle → work → break → work → break → ... → longBreak → work → ...
 ↑                                                          |
 └── stop() ←───────────────────────────────────────────────┘
```

- `idle`: Timer stopped
- `work`: Work session (default 25 min)
- `break`: Short break (default 5 min)
- `longBreak`: Long break (default 15 min, every N cycles)
