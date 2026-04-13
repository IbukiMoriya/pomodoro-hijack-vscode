# Changelog

## [0.0.4] - 2026-04-13

### Changed

- リリース CI を `release/*` ブランチの PR マージで自動発火するように変更
- CI 内で package.json からバージョンを読み取り、タグを自動作成
- リリースガイド（ja/en）を新フローに合わせて更新

## [0.0.3] - 2026-04-13

### Added

- CLAUDE.md（AI 開発ガイドライン）
- Biome によるコードフォーマッター導入
- husky + lint-staged による pre-commit hooks
- .editorconfig（エディタ共通設定）

### Changed

- .gitignore に OS / env / TypeScript 関連パターン追加
- CI に format:check ステップ追加
- PR テンプレートに format チェック項目追加

## [0.0.2] - 2026-04-10

### Added

- ステータスバーにトマトアイコン付き Start/Stop トグルボタン
- GitHub Issue テンプレート（Bug Report / Feature Request）
- Pull Request テンプレート
- CI ワークフロー（build / lint / test / vsce package）
- Release ワークフロー（タグ push で自動リリース）

### Fixed

- 拡張機能アイコンを SVG から PNG に変換（vsce 互換性対応）

## [0.0.1] - 2026-04-10

### Added

- ポモドーロタイマー（作業25分 / 休憩5分 / 長休憩15分）
- 画面ハイジャック型の休憩画面
- ストリクトモード（休憩中は閉じられない）
- ステータスバーにカウントダウン表示
- VSCode 起動時の自動スタート設定
- 各種設定のカスタマイズ対応
