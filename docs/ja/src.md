# src/ ソースコード詳細

## ファイル一覧と責務

### types.ts — 共有型定義

プロジェクト全体で使用する型を一元管理する。

| 型名 | 種類 | 説明 |
|------|------|------|
| `Phase` | type | タイマーの状態 (`'work' \| 'break' \| 'longBreak' \| 'idle'`) |
| `PomodoroSettings` | interface | ユーザー設定の構造体 |
| `HijackOptions` | interface | 休憩パネル表示時のオプション |

### constants.ts — 定数定義

ロジックから分離されたマジックナンバーや表示文字列。

| 定数名 | 用途 |
|--------|------|
| `PHASE_LABELS` | Phase に対応する表示ラベル（"Work", "Break" 等） |
| `PHASE_ICONS` | Phase に対応する VS Code アイコン（`$(flame)` 等） |
| `PHASE_TOOLTIPS` | ステータスバーのツールチップ文字列 |
| `WELLNESS_TIPS` | 休憩中に表示するウェルネスヒント（日本語） |
| `TIMER_INTERVAL_MS` | タイマーの tick 間隔（1000ms） |
| `STAR_COUNT` | 休憩画面の星エフェクト数（60） |
| `STATUS_BAR_PRIORITY` | ステータスバーの表示優先度（100） |

### utils.ts — ユーティリティ関数

| 関数名 | 引数 | 戻り値 | 説明 |
|--------|------|--------|------|
| `formatTime(totalSeconds)` | `number` | `string` | 秒数を `M:SS` 形式にフォーマット |
| `minutesToSeconds(minutes)` | `number` | `number` | 分 → 秒変換 |
| `minutesToMs(minutes)` | `number` | `number` | 分 → ミリ秒変換 |
| `escapeHtml(s)` | `string` | `string` | HTML 特殊文字のエスケープ |

### settings.ts — 設定管理

VSCode の `workspace.getConfiguration()` を使って設定値を読み込む。

- `CONFIG_SECTION`: 設定の namespace（`"pomodoroHijack"`）
- `DEFAULTS`: 各設定のデフォルト値を一元定義
- `loadSettings()`: 設定値を読み込んで `PomodoroSettings` を返す

### extension.ts — エントリーポイント

VSCode 拡張のライフサイクルを管理する。

- `activate(context)`: コマンド登録、設定変更監視、autoStart 処理
- `deactivate()`: タイマー停止

登録コマンド:
- `pomodoroHijack.start` — タイマー開始
- `pomodoroHijack.stop` — タイマー停止
- `pomodoroHijack.status` — 現在のステータス表示

### pomodoroTimer.ts — タイマーコアロジック

`PomodoroTimer` クラスがポモドーロサイクル全体を管理する。

**公開メソッド:**
| メソッド | 説明 |
|----------|------|
| `start()` | サイクル開始（idle 時のみ） |
| `stop()` | タイマー停止、ステータスバー非表示 |
| `showStatus()` | 現在のフェーズと残り時間を通知 |
| `reloadSettings()` | 設定の再読み込み |

**内部メソッド:**
| メソッド | 説明 |
|----------|------|
| `startWorkPhase()` | 作業フェーズ開始 |
| `startBreakPhase()` | 休憩フェーズ開始（長短判定含む） |
| `onWorkComplete()` | 作業完了時のハンドラ |
| `onBreakComplete()` | 休憩完了時のハンドラ |
| `startCountdown(onComplete)` | カウントダウン開始 |
| `clearTimer()` | interval クリア |
| `updateStatusBar()` | ステータスバー更新 |
| `log(message)` | OutputChannel へのログ出力 |

### hijackPanel.ts — Webview パネル管理

`HijackPanel` クラスが休憩画面の表示/非表示を管理する。

- `show(context, options)`: パネル生成、メッセージリスナー設定、自動dismiss タイマー設定
- `dismiss()`: パネルを手動で閉じる

### breakTemplate.ts — 休憩画面テンプレート

HTML/CSS/JS のテンプレートを生成する。ロジックから完全に分離。

| 関数名 | 説明 |
|--------|------|
| `renderBreakHtml(options)` | 休憩画面の完全な HTML を生成（公開） |
| `getStyles()` | CSS 文字列を返す（内部） |
| `getScript(totalSeconds, enforceFullBreak)` | JS 文字列を返す（内部） |

## 設計方針

1. **型の一元管理**: `types.ts` に集約し、各モジュールは re-export で公開
2. **定数の分離**: マジックナンバーや表示文字列を `constants.ts` に分離
3. **テンプレートの分離**: HTML 生成を `breakTemplate.ts` に分離し、パネル管理ロジックと混在させない
4. **ユーティリティの共有**: 重複ロジック（時間フォーマット等）を `utils.ts` に抽出
