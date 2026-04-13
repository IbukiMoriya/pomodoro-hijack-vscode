# Pomodoro Hijack

> **[English](../../README.md)**

画面をハイジャックして強制的に休憩を取らせる VSCode 拡張機能。

通知を無視しがちなあなたのために、休憩時間になったら画面全体を乗っ取って作業を中断させます。

## 特徴

- **画面ハイジャック** — 休憩時間になると全画面の休憩画面が出現
- **強制休息モード** — 休憩時間が過ぎるまでボタンが押せない
- **ステータスバー表示** — 残り時間をリアルタイム表示
- **ロング休憩** — 4サイクルごとに長めの休憩（カスタマイズ可能）
- **自動スタート** — VSCode 起動時に自動でタイマー開始
- **メッセージカスタマイズ** — 休憩タイトルやウェルネスTIPSを自由に変更

## 使い方

1. コマンドパレット (`Ctrl+Shift+P`) を開く
2. `Pomodoro Hijack: Start` を実行
3. 25分後に画面がハイジャックされる！

## コマンド

| コマンド | 説明 |
|---------|------|
| `Pomodoro Hijack: Start` | タイマーを開始 |
| `Pomodoro Hijack: Stop` | タイマーを停止 |
| `Pomodoro Hijack: Show Status` | 現在の状態を表示 |

## 設定

| 設定 | デフォルト | 説明 |
|------|-----------|------|
| `pomodoroHijack.workMinutes` | `25` | 作業時間（分） |
| `pomodoroHijack.breakMinutes` | `5` | 休憩時間（分） |
| `pomodoroHijack.longBreakMinutes` | `15` | 長い休憩時間（分） |
| `pomodoroHijack.cyclesBeforeLongBreak` | `4` | 長い休憩までのサイクル数 |
| `pomodoroHijack.autoStart` | `true` | VSCode 起動時に自動スタート |
| `pomodoroHijack.enforceFullBreak` | `true` | 休憩終了まで閉じられないモード |
| `pomodoroHijack.language` | `ja` | UI言語（`ja` / `en`） |

## コントリビュート

開発環境の構築やガイドラインは [CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。

## ライセンス

MIT
