# アーキテクチャ概要

## ディレクトリ構成

```
pomodoro-hijack-vscode/
├── src/                    # TypeScript ソースコード
│   ├── extension.ts        # エントリーポイント（activate / deactivate）
│   ├── pomodoroTimer.ts    # タイマーのコアロジック
│   ├── hijackPanel.ts      # Webview パネル管理
│   ├── breakTemplate.ts    # 休憩画面の HTML テンプレート
│   ├── settings.ts         # VSCode 設定の読み込み
│   ├── types.ts            # 共有型定義
│   ├── constants.ts        # 定数（ラベル、アイコン、tips 等）
│   └── utils.ts            # ユーティリティ関数
├── out/                    # tsc コンパイル出力（自動生成）
├── docs/                   # ドキュメント
├── media/                  # アイコン等のアセット
├── .vscode/                # VSCode デバッグ/タスク設定
├── package.json            # 拡張マニフェスト＆依存関係
├── tsconfig.json           # TypeScript コンパイラ設定
└── .oxlintrc.json          # oxlint 設定
```

## モジュール依存関係

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

## データフロー

1. **起動**: `extension.ts` の `activate()` が呼ばれ、`PomodoroTimer` を生成
2. **設定読み込み**: `settings.ts` が VSCode の configuration API 経由で設定値を取得
3. **タイマーサイクル**: `PomodoroTimer` が work → break → work のサイクルを管理
4. **画面ハイジャック**: break フェーズ開始時に `HijackPanel` が Webview パネルを表示
5. **HTML 生成**: `breakTemplate.ts` がテンプレートを組み立て、Webview に渡す
6. **ユーザー操作**: Webview 内の dismiss ボタンから `postMessage` でエクステンション側に通知

## フェーズ状態遷移

```
idle → work → break → work → break → ... → longBreak → work → ...
 ↑                                                          |
 └── stop() ←───────────────────────────────────────────────┘
```

- `idle`: タイマー停止中
- `work`: 作業時間（デフォルト 25 分）
- `break`: 短い休憩（デフォルト 5 分）
- `longBreak`: 長い休憩（デフォルト 15 分、N サイクルごと）
