# Pomodoro Hijack — リリース手順

## 配布方式

`.vsix` ファイルを GitHub Releases で配布する。Marketplace には公開しない。

---

## リリースフロー

### Step 1: リリースブランチを作成し、バージョンを上げる

```bash
git checkout -b release/vX.X.X

# patch (0.0.2 → 0.0.3)
npm version patch

# minor (0.0.3 → 0.1.0)
npm version minor

# major (0.1.0 → 1.0.0)
npm version major
```

CHANGELOG.md も更新すること。

### Step 2: PR を作成してマージ

```bash
git push origin release/vX.X.X
```

GitHub 上で PR を作成し、レビュー・マージする。

マージ後、GitHub Actions が自動で以下を実行する:

1. ビルド・lint・フォーマットチェック・テスト
2. `package.json` からバージョンを読み取り、タグを自動作成
3. `.vsix` パッケージを作成
4. GitHub Release を作成し `.vsix` をアップロード

### Step 3: 確認

[Releases ページ](https://github.com/ibukimoriya/pomodoro-hijack-vscode/releases) にリリースが作成され、`.vsix` がダウンロードできることを確認する。

---

## 手動で .vsix を作成する場合

```bash
# vsce のインストール
npm install -g @vscode/vsce

# パッケージ作成
vsce package --no-dependencies

# → pomodoro-hijack-x.x.x.vsix が生成される
```

---

## インストール方法（利用者向け）

GitHub Releases から `.vsix` ファイルをダウンロードし、以下のいずれかの方法でインストール:

```bash
# コマンドラインから
code --install-extension pomodoro-hijack-x.x.x.vsix
```

または VSCode 上で:

1. `Ctrl+Shift+P` → `Extensions: Install from VSIX...`
2. ダウンロードした `.vsix` ファイルを選択

---

## リリース前チェックリスト

- [ ] `npm run compile` がエラーなく通る
- [ ] `npm run lint` がエラーなく通る
- [ ] `npm run format:check` がエラーなく通る
- [ ] `npm test` が通る
- [ ] F5 デバッグで動作確認済み
- [ ] `package.json` のバージョンが更新されている
- [ ] `CHANGELOG.md` を更新した

---

## トラブルシューティング

| 問題 | 対処 |
|------|------|
| `vsce: command not found` | `npm install -g @vscode/vsce` を実行 |
| `npm version` でエラー | ワーキングツリーがクリーンか確認 (`git status`) |
| GitHub Actions が失敗 | Actions ログを確認。lint やテストのエラーを修正する |
