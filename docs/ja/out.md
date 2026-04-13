# out/ コンパイル出力ディレクトリ

## 概要

`out/` は TypeScript コンパイラ（`tsc`）によって `src/` から自動生成されるディレクトリ。
**手動で編集してはいけない。**

## 生成方法

```bash
# 一回限りのビルド
npm run compile

# ファイル変更を監視して自動ビルド
npm run watch
```

## 生成されるファイル

`src/` の各 `.ts` ファイルに対応して以下が生成される:

| 生成ファイル | 元ファイル | 説明 |
|-------------|-----------|------|
| `*.js` | `src/*.ts` | CommonJS 形式にコンパイルされた JavaScript |
| `*.js.map` | `src/*.ts` | ソースマップ（デバッグ用） |

現在のファイル一覧:
- `extension.js` / `.map`
- `pomodoroTimer.js` / `.map`
- `hijackPanel.js` / `.map`
- `breakTemplate.js` / `.map`
- `settings.js` / `.map`
- `types.js` / `.map`
- `constants.js` / `.map`
- `utils.js` / `.map`

## コンパイラ設定

`tsconfig.json` での主要設定:

| 設定 | 値 | 説明 |
|------|-----|------|
| `target` | ES2022 | 出力の JS バージョン |
| `module` | commonjs | モジュールシステム |
| `outDir` | `out` | 出力先ディレクトリ |
| `rootDir` | `src` | ソースディレクトリ |
| `sourceMap` | true | デバッグ用ソースマップ生成 |
| `strict` | true | TypeScript strict モード |

## 注意事項

- `.gitignore` で `out/` はバージョン管理から除外されている
- VSCode の `package.json` で `"main": "./out/extension.js"` として参照される
- `vscode:prepublish` スクリプトがパブリッシュ前に自動コンパイルを実行する
