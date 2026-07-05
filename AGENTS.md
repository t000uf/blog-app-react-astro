# AGENTS.md

このファイルはAIコーディングエージェント向けのプロジェクト方針です。`CLAUDE.md`はこれを参照します。

## スタック

- Astro 5 + React 19(`@astrojs/react`)+ Tailwind CSS v4(`@tailwindcss/typography`)
- コンテンツ管理はMicroCMS(ヘッドレスCMS)に一任。Content Collectionsなどローカルmarkdown管理は不要。
- 記事・著者の型定義は`src/lib/microcms.ts`(`Blog`/`Author`)。CMSクライアントも同ファイル。

## アーキテクチャ方針

- `.astro`が外側のシェル/Layoutを担当し、Reactは中身のインタラクティブな島(コンポーネント)のみに使う。`Layout.astro`は`.jsx`化せず`.astro`のまま維持する(Astroコンポーネントは Reactの内部から呼び出せないため、この境界を越えると壊れる)。
- データ取得はAstro側の`---`(フロントマター、SSG)で行い、結果をpropsとしてReactに渡す。React側の`useEffect`フェッチは不採用(速度・SEO・APIキー非露出のため)。「実装をReactに寄せる」方針はインタラクティブなロジック(フィルタ・トグル等)の話であり、データ取得層はAstro側に残す。
- ページ遷移はreact-router-domではなくAstro標準の`ClientRouter`(`astro:transitions`)。
- 目次(TOC)は`DOMParser`+`querySelectorAll('h2,h3')`+`IntersectionObserver`でスクロールスパイを実装。記事詳細ページのみ表示し、一覧(index)ページには出さない。

## ツール・コーディング規約

- パッケージマネージャは**pnpm必須**(`preinstall`スクリプトでnpm/yarn実行をブロックしている)。
- ESLint + Prettier(+ `prettier-plugin-astro`, `prettier-plugin-tailwindcss`)。
- クラス名結合は`clsx`+`tailwind-merge`による`cn()`ヘルパー(`src/lib/utils`)を使う。
- Tailwind v4の`@theme`(CSSファースト、`src/styles/global.css`)でデザイントークンを管理。トークンの意味・値やコンポーネント規約は [docs/DESIGN.md](docs/DESIGN.md) を参照。
- フォントは`@fontsource`経由で読み込む(`src/styles/fonts.js`)。

## 検証

- コマンド・セットアップ(`.env`含む)は [README.md](./README.md) を参照。
- `pnpm build`は`getStaticPaths`でMicroCMSに実アクセスするため、`.env`がないとビルド失敗する。
- テストは存在しない。変更の検証は`pnpm build`の成功+dev/previewでの目視確認で行う。
- `lint`/`format`スクリプトは未定義。必要なら`pnpm exec eslint .`/`pnpm exec prettier --check .`を直接実行する。

## 既知の罠

- `src/components/BlogTile.jsx`と`blogTile.jsx`が大文字小文字違いでgitに二重登録されている([Issue #28](https://github.com/t000uf/blog-app-react-astro/issues/28))。macOSでは同一実体のため、編集するとgit status/diffに2ファイル分表示されるが正常。リネームや削除はこのIssueの解決作業以外では行わないこと。
