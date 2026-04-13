# 設定リファレンス

## ユーザー設定

VSCode の設定画面または `settings.json` で以下を変更できる。
すべて `pomodoroHijack.*` namespace 配下。

| 設定キー | 型 | デフォルト | 範囲 | 説明 |
|---------|-----|----------|------|------|
| `workMinutes` | number | 25 | 1–120 | 作業時間（分） |
| `breakMinutes` | number | 5 | 1–30 | 短い休憩時間（分） |
| `longBreakMinutes` | number | 15 | 1–60 | 長い休憩時間（分） |
| `cyclesBeforeLongBreak` | number | 4 | 2–10 | 長い休憩までのサイクル数 |
| `autoStart` | boolean | true | — | VSCode 起動時に自動開始 |
| `enforceFullBreak` | boolean | true | — | 休憩中の早期dismiss を禁止 |

## settings.json での設定例

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

## 設定変更の反映

設定はリアルタイムで反映される（`onDidChangeConfiguration` イベントで `reloadSettings()` が呼ばれる）。
ただし、現在進行中のフェーズの残り時間は変更されない。次のフェーズから新しい設定が適用される。

## 開発ツール設定

### oxlint（`.oxlintrc.json`）

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

### TypeScript（`tsconfig.json`）

strict モード有効、ES2022 ターゲット、CommonJS モジュール。
詳細は [out.md](./out.md) を参照。

### npm scripts

| コマンド | 説明 |
|----------|------|
| `npm run compile` | TypeScript コンパイル |
| `npm run watch` | ファイル監視 + 自動コンパイル |
| `npm run lint` | oxlint によるコード検査 |
