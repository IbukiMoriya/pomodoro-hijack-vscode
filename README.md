# Pomodoro Hijack

> **[日本語](docs/ja/README.md)**

A VSCode extension that hijacks your screen to force you to take a break.

For those who tend to ignore notifications — when it's break time, the entire screen gets taken over to interrupt your work.

## Features

- **Screen Hijack** — A full-screen break overlay appears when it's time to rest
- **Enforced Break Mode** — The dismiss button is disabled until the break is over
- **Status Bar Timer** — Real-time countdown display in the status bar
- **Long Breaks** — Extended breaks every 4 cycles (customizable)
- **Auto Start** — Timer starts automatically when VSCode opens
- **Customizable Messages** — Change break titles, button labels, and wellness tips

## Usage

1. Open the Command Palette (`Ctrl+Shift+P`)
2. Run `Pomodoro Hijack: Start`
3. After 25 minutes, your screen gets hijacked!

## Commands

| Command | Description |
|---------|-------------|
| `Pomodoro Hijack: Start` | Start the timer |
| `Pomodoro Hijack: Stop` | Stop the timer |
| `Pomodoro Hijack: Show Status` | Show current status |

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `pomodoroHijack.workMinutes` | `25` | Work duration in minutes |
| `pomodoroHijack.breakMinutes` | `5` | Short break duration in minutes |
| `pomodoroHijack.longBreakMinutes` | `15` | Long break duration in minutes |
| `pomodoroHijack.cyclesBeforeLongBreak` | `4` | Cycles before a long break |
| `pomodoroHijack.autoStart` | `true` | Auto-start timer on VSCode launch |
| `pomodoroHijack.enforceFullBreak` | `true` | Prevent dismissing break early |
| `pomodoroHijack.language` | `ja` | UI language (`ja` / `en`) |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## License

MIT
