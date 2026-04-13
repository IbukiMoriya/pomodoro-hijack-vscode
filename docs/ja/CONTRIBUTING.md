# コントリビューションガイド

> **[English](../../CONTRIBUTING.md)**

Pomodoro Hijack への貢献に興味を持っていただきありがとうございます！

## 開発環境のセットアップ

```bash
# リポジトリをフォークしてクローン
git clone https://github.com/<your-username>/pomodoro-hijack-vscode.git
cd pomodoro-hijack-vscode

# 依存パッケージをインストール
npm install
```

VSCode でこのフォルダを開き、`F5` を押すと Extension Development Host が起動してデバッグ実行できます。

## Lint

[oxlint](https://oxc.rs/) を使用しています。

```bash
npm run lint
```

PR を出す前に lint エラーが無いことを確認してください。

## テスト

[vitest](https://vitest.dev/) を使用しています。

```bash
npm test
```

新しい機能を追加する場合はテストも書いてください。

## コーディング規約

- TypeScript で記述する
- oxlint のルールに準拠する
- 変数・関数名は camelCase、型名は PascalCase
- コメントは日本語・英語どちらでも OK

## PR の出し方

1. このリポジトリを **Fork** する
2. feature ブランチを作成する（`git checkout -b feature/my-change`）
3. 変更をコミットする
4. Fork 先にプッシュする（`git push origin feature/my-change`）
5. GitHub 上で **Pull Request** を作成する

- PR タイトルは変更内容が分かるように簡潔に書いてください
- 関連する Issue があればリンクしてください（`Closes #123`）

## Issue の書き方

- **バグ報告**: 再現手順・期待する動作・実際の動作を明記してください
- **機能要望**: 解決したい課題と提案する解決策を書いてください
- テンプレートが用意されているので活用してください

## リリース

リリース手順は [リリースガイド](RELEASE.md) を参照してください。

---

質問や不明点があれば Issue で気軽に聞いてください。
