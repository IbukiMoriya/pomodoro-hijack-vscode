# Pomodoro Hijack — リリース手順

## 配布方式

`.vsix` ファイルを GitHub Releases で配布する。Marketplace には公開しない。

---

## リリースフロー

### Step 1: バージョンを上げる

```bash
# patch (0.0.1 → 0.0.2)
npm version patch

# minor (0.0.2 → 0.1.0)
npm version minor

# major (0.1.0 → 1.0.0)
npm version major
```

> `npm version` はバージョンタグ (`v0.0.2` 等) を自動で作成する。

### Step 2: タグを push して自動リリース

```bash
git push origin main --follow-tags
```

GitHub Actions が自動で以下を実行する:

1. ビルド・lint・テスト
2. `.vsix` パッケージを作成
3. GitHub Release を作成し `.vsix` をアップロード

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
