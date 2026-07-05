# デザイン仕様

このドキュメントはコードを正(source of truth)としてデザインシステムをまとめたものです。実装と乖離した場合はコード側が正しいので、都度この文書を更新してください。

トークン定義: [`src/styles/global.css`](../src/styles/global.css)

プロジェクト全体のアーキテクチャ方針・ツール規約は [AGENTS.md](../AGENTS.md) を参照。このドキュメントは見た目(トークン・コンポーネントの意匠パターン)に範囲を絞る。

## デザイントークン

### 色

| トークン              | 値        | 用途                                     |
| --------------------- | --------- | ---------------------------------------- |
| `--color-bg`          | `#ece3d3` | ページ背景                               |
| `--color-bg-deep`     | `#e1d6c2` | ブロブ用グラデ下端                       |
| `--color-surface`     | `#faf6ee` | カード・パネル面                         |
| `--color-surface-2`   | `#f1e8da` | コードブロック等の入れ子面               |
| `--color-border`      | `#e4d9c8` | 面の細い境界線                           |
| `--color-teal`        | `#8fbfb7` | ブランドの差し色(薄)                     |
| `--color-teal-strong` | `#57938a` | リンク・TOC h2現在地・タグ文字           |
| `--color-teal-tint`   | `#dcece8` | タグの背景                               |
| `--color-pink`        | `#e6cdd8` | ブランドの差し色(薄)                     |
| `--color-pink-strong` | `#a86e91` | 注目バッジ・TOC h3現在地・フッター現在地 |
| `--color-text`        | `#4a423a` | 本文文字色                               |
| `--color-text-sub`    | `#9c9082` | 補足文字色(日付・キャプション等)         |

ダークモード用の `*-dark` トークンも定義済みだが、**適用方式は未確定・現状未使用**。

### フォント

| トークン         | フォント            | 用途                   |
| ---------------- | ------------------- | ---------------------- |
| `--font-brand`   | Zen Kurenaido       | ロゴ・カード見出しのみ |
| `--font-heading` | Noto Sans JP        | 本文中の見出し全般     |
| `--font-body`    | Zen Kaku Gothic New | 本文(デフォルト)       |
| `--font-mono`    | Space Mono          | 日付・コード・数値     |

### 形状

| トークン         | 値      | 用途                                   |
| ---------------- | ------- | -------------------------------------- |
| `--radius-panel` | `20px`  | カード・パネル共通(`rounded-panel`)    |
| `--radius-chip`  | `999px` | タグ・バッジ・ナビピル(`rounded-chip`) |

## コンポーネントパターン

### Header (`Header.jsx`)

- 上部固定ではなく通常フロー、下端に `border-teal` の区切り線。
- ナビは `md` 以上で表示(モバイルは非表示、ハンバーガー等は未実装)。
- 現在地リンクは `bg-pink text-pink-strong` のピル、非アクティブは `text-text` + hover で `bg-bg-deep`。
- `プロフィール`/`お問い合わせ` は実ページ未実装のため `href="#"` プレースホルダ。

### Footer (`Footer.jsx`)

- 最小構成: サイト名(`font-brand`)→ ティール区切り線 → リンク行 → ティール区切り線 → コピーライト(`font-mono`)。
- ロゴ再掲・タグライン・筆者情報は置かない。

### Background (`Background.jsx`)

- 固定・`pointer-events-none` のブロブ2つ(左上=teal/20, 右下=pink/30)を低透明度でぼかし表示。
- カード等の面(`bg-surface`)は不透明なので、ブロブは余白にのみ透けて見える。

### 記事カード / BlogTile (`blogTile.jsx`)

- 通常カード: `border-teal` の細枠。ヒーロー(`isHero`, 先頭記事): `border-pink` の太め枠 + 右上に「注目」ピル(`bg-pink text-pink-strong`)。
- タグは共通の `TagList`(下記)を使用。
- ホバー: カードが軽く浮き上がり(`-translate-y-1` + `shadow-xl`)、タイトル下の下線が伸びる(`tileTitleUnderline`、色はヒーロー=teal / 通常=pink)。
- サムネ欠損時は `bg-surface-2` のプレースホルダ面にフォールバック。

### Tag / TagList (`Tag.jsx`)

- タグピルの共通コンポーネント。`bg-teal-tint text-teal-strong` の小ピル。
- `TagList` は `tags` が空/未定義なら何も描画しない。カード一覧・記事ヒーロー両方で共用。

### ArticleHero (`ArticleHero.jsx`)

- サムネ画像(欠損時は `bg-surface-2` 面)の上に、下部固定のグラデーションスクリム(`from-black/70`)でタグ・タイトル・日付を重ね表示。
- タイトルは白文字 `font-heading`、日付は `font-mono` の白系。

### ArticleBody (`ArticleBody.jsx`)

- 記事詳細の本文パネル(`bg-surface rounded-panel`)。
- 構造見出し(`概要` / `本文` / `書いたひと`)は `headingClass`(`text-text-sub`, レスポンシブサイズ)で統一。`書いたひと` は `author` がある場合のみ表示。
- CMS本文(`dangerouslySetInnerHTML`)は `.prose` クラスでラップし、見出し階層スタイルは **`global.css` のレイヤー外(`@layer base` の外)で `.prose h2/h3/h4` として一括定義**(コンポーネント側に `@apply`/CSSファイルを持たない)。
  - **注意**: typographyプラグインは`.prose`セレクタ自身に`--tw-prose-*`のデフォルト値一式(body/headings/bold/links/bullets/counters/hr/code/pre-bg/pre-code等)を`utilities`レイヤーで宣言している。`@layer base`内に同じ上書きを書くと詳細度に関係なく負ける(カスケードレイヤーは後のレイヤー優先)ため、`.prose`の上書きは必ずレイヤー外に置くこと。
  - 色の上書きは生プロパティ(`.prose pre { background-color: ... }`等)ではなく、対応する`--tw-prose-*`変数(`--tw-prose-bullets`/`--tw-prose-counters`/`--tw-prose-code`/`--tw-prose-pre-bg`/`--tw-prose-pre-code`等)を`.prose {}`ブロックで設定するのが第一選択。margin/font-size/border等(変数を持たないプロパティ)のみ`h2`/`h3`等への直接上書きでよい。
  - blockquote/table/kbdは現状CMS本文に出てこないため未設定。将来使う場合は同様に`--tw-prose-quotes`/`--tw-prose-th-borders`/`--tw-prose-kbd`等の変数で対応する。

### 本文中の見出し階層(`.prose`, `global.css`)

TOCの現在地カラーと対応させている:

| 要素        | ボーダー                   | サイズ         |
| ----------- | -------------------------- | -------------- |
| `.prose h2` | `border-teal`(下線)        | `text-lg`      |
| `.prose h3` | `border-pink-strong`(下線) | `text-base`    |
| `.prose h4` | なし                       | 継承(太字のみ) |

構造見出し(概要/本文/書いたひと)とはサイズ・色・太さの強弱で階層を分けている(構造見出しは `text-text-sub` で統一、本文中見出しは `text-text` 相当)。

### AuthorCard (`AuthorCard.jsx`)

- カード共通規約(`bg-surface` + `border-teal` + `rounded-panel` + `overflow-hidden`)を踏襲。
- アイコンは円形で左端に絶対配置し、コンテナの上下左をはみ出させて縁でクロップ(`absolute left-0 top-1/2 -translate-x-1/4 -translate-y-1/2`)。アイコン自体に`border-pink`。
- テキスト(名前・プロフィール)は右側・縦中央寄せ。アイコン分の余白は`pl-24 md:pl-32`で確保。
- `ArticleBody`から`author`がある場合のみ「書いたひと」見出しとセットで表示。

### TableOfContents (`TableOfContents.jsx`)

- 現在地ハイライト色: `h2` → `text-teal-strong` / `h3` → `text-pink-strong`。`.prose h2/h3` のボーダー色と対応。
- `h3` は `ml-4` でインデント。
- 見出しゼロ件なら非表示(`toc.length === 0` で `null` 返却)。
- 開閉トグルボタン(「もくじを表示する」/「もくじを隠す」)、`lg:sticky top-20`。

## スコープ外・未実装

- ダークモード適用(トークンのみ定義済み。切替方式・トリガーは未設計)。
- `プロフィール` / `お問い合わせ` の実ページ(現状 `#` プレースホルダ)。
- タグによる絞り込み・タグ一覧ページ(microCMS APIは`tags`を返すため表示自体は実装済み。フィルタ機能のみ未実装)。
- モバイル向けヘッダーナビ(ハンバーガーメニュー等)。
- `feature/sso`ブランチ(会員限定コンテンツ等と思われるが用途未確認)。
