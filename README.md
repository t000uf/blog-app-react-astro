# blog-app-astro

![Node.js](https://img.shields.io/badge/Node.js-24.14.1-339933?logo=nodedotjs&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-10.33.0-F69220?logo=pnpm&logoColor=white)
![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9.x-4B32C3?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-3.x-F7B93E?logo=prettier&logoColor=black)

Astro + React 製の個人ブログ。記事は [microCMS](https://microcms.io/) で管理しています。

## Setup

このプロジェクトは **pnpm** を使用しています。npm・yarn は使用できません。

### 必要条件

- [Volta](https://volta.sh/)（Node.js / pnpm のバージョン管理）
- microCMS の API キー（記事取得に必要）

Volta をインストールすると、`node` と `pnpm` のバージョンが自動的に固定されます。

### インストール

```bash
pnpm install
```

### 環境変数

プロジェクトルートに `.env` を作成します。値は microCMS の管理画面（サービス設定 → API キー）から取得してください。

```bash
MICROCMS_SERVICE_DOMAIN=<サービスドメイン>
MICROCMS_API_KEY=<APIキー>
```

## コマンド

| コマンド       | 説明                                  |
| -------------- | ------------------------------------- |
| `pnpm dev`     | 開発サーバー起動                      |
| `pnpm build`   | 静的ビルド（microCMS への接続が必要） |
| `pnpm preview` | ビルド結果のプレビュー                |

## ドキュメント

- [AGENTS.md](./AGENTS.md) — アーキテクチャ方針・コーディング規約（AIエージェント向け、人間にも有用）
- [docs/DESIGN.md](./docs/DESIGN.md) — デザイン仕様（トークン・コンポーネント規約）
