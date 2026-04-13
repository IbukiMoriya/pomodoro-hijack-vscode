# CLAUDE.md

## コマンド

### テスト

```bash
npm test               # vitest でユニットテスト実行
```

### リント・フォーマット

```bash
# 一括実行
npx lint-staged        # staged files に oxlint + biome を実行

# 個別実行
npm run lint           # oxlint でリント
npm run format         # biome でフォーマット（自動修正）
npm run format:check   # biome でフォーマットチェック（修正なし）
```

### ビルド

```bash
npm run compile        # TypeScript コンパイル
```

## 禁止事項

- リンター・フォーマッター設定ファイル（`.oxlintrc.json`, `biome.json`）を変更しない（コードを直すこと）
- `git push --force` を使わない
- `git commit --no-verify` を使わない
- `.env` や credentials を含むファイルをコミットしない
- 既存のテストを削除・スキップしない

## 規約

- PR のベースブランチ: `main`
- PR テンプレート: `.github/PULL_REQUEST_TEMPLATE.md`
- ブランチ命名: `feature/xxx`, `fix/xxx`, `release/vX.X.X`
- コミットメッセージ: 英語、簡潔に変更内容を記述
- コーディング規約: 変数・関数は camelCase、型は PascalCase
- 新機能追加時はテストを書くこと
- コメントは日本語・英語どちらでも OK
