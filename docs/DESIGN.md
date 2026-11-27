# デザイン仕様

このドキュメントはコードを正(source of truth)としてデザインシステムをまとめたものです。実装と乖離した場合はコード側が正しいので、都度この文書を更新してください。

トークン定義: [`src/styles/global.css`](../src/styles/global.css)

プロジェクト全体のアーキテクチャ方針・ツール規約は [AGENTS.md](../AGENTS.md) を参照。このドキュメントは見た目(トークン・コンポーネントの意匠パターン)に範囲を絞る。

## デザイントークン

### 色

| トークン              | 値        | 用途                                                |
| --------------------- | --------- | --------------------------------------------------- |
| `--color-bg`          | `#f6f3ee` | ページ背景(白寄り。名刺の白ベースに合わせた)        |
| `--color-bg-deep`     | `#ece6dc` | ブロブ用グラデ下端                                  |
| `--color-surface`     | `#fffdf9` | 面(全ページ共通の WaveBand の帯・目次のバー/パネル) |
| `--color-surface-2`   | `#f1e8da` | コードブロック等の入れ子面                          |
| `--color-border`      | `#e4d9c8` | 面の細い境界線                                      |
| `--color-stripe`      | `#e1d6c2` | サムネのプレースホルダ柄の濃い側                    |
| `--color-teal`        | `#8fbfb7` | ブランドの差し色(薄)・通常カードの画像枠            |
| `--color-teal-strong` | `#57938a` | リンク・TOC h2現在地・タグ文字                      |
| `--color-teal-tint`   | `#dcece8` | 現状未使用(旧タグピルの背景)                        |
| `--color-pink`        | `#e6cdd8` | ブランドの差し色(薄)・ヒーロー画像枠・アイコン枠    |
| `--color-pink-strong` | `#a86e91` | 「新着記事」ラベル・TOC h3現在地・Amazonリンク      |
| `--color-text`        | `#4a423a` | 本文文字色                                          |
| `--color-text-sub`    | `#9c9082` | 補足文字色(日付・キャプション等)                    |

`--color-stripe` は背景を白寄りにする前の `bg-deep` の値。プレースホルダの柄は従来の濃さのまま残すため、別トークンに分けている。

ダークモード用の `*-dark` トークンも定義済みだが、**適用方式は未確定・現状未使用**。

### フォント

| トークン         | フォント            | 用途                                                                                                           |
| ---------------- | ------------------- | -------------------------------------------------------------------------------------------------------------- |
| `--font-brand`   | Zen Kurenaido       | ロゴ(ヘッダー/フッター)のみ                                                                                    |
| `--font-accent`  | Zen Maru Gothic     | 見出し全般(挨拶・「かんりにん」・カードタイトル・記事/aboutのタイトル・本文の構造見出し・`.prose`見出し・目次) |
| `--font-heading` | Noto Sans JP        | 日付(記事カード・記事ヒーロー)・404の見出し                                                                    |
| `--font-body`    | Zen Kaku Gothic New | 本文(デフォルト)・コピーライト                                                                                 |
| `--font-mono`    | Space Mono          | コード・コピーボタン・404の数字                                                                                |

### 形状

| トークン         | 値      | 用途                                                          |
| ---------------- | ------- | ------------------------------------------------------------- |
| `--radius-panel` | `20px`  | 画像・コードブロック・AmazonCard・目次のバー(`rounded-panel`) |
| `--radius-chip`  | `999px` | 現状未使用(ピル形は全廃。トークンは残している)                |

`--color-teal-tint` と `--radius-chip` は使い先がなくなったが、トークン自体は残している。

## 意匠方針

「UIキット感」を避けるため、引き算を基本にしている。全ページ共通で、新しい要素を足すときもこれに従う。

- **ピル形(薄い背景 + 小さい太字 + `rounded-chip`)を使わない。** タグは `#` 付きの文字、ラベルは色と字間、ナビ現在地やボタン的なリンクは下線で示す。
- **箱を入れ子にしない。** 面(背景)を持つのは各ページの全幅の帯(`WaveBand`)だけ。その上の要素(カード・本文・AuthorCard・目次サイドバー)は背景・影を持たない。区切りは余白と文字(フォント・大きさ)で表現する。
  - 例外: 本文に重なって浮くモバイル目次のバー/パネルは、下の文字と混ざらないよう半透明の面を持つ。
- **演出は1要素につき1つ。** 記事カードのホバーは画像の拡大だけ、AmazonCard はリンク文字の下線だけ。

## コンポーネントパターン

### Header (`Header.jsx`)

- 上部固定ではなく通常フロー。背景・区切り線は持たない(ページ背景がそのまま見える)。
- `relative z-50`。どのページでも WaveBand の上側の波がヘッダーの下に潜り込むので、位置指定して z-index を効かせ、文字を波より手前に出している(`position` が static だと z-index は無視される)。
- ナビは `md` 以上で表示(モバイルは非表示、ハンバーガー等は未実装)。
- リンクは色分けしない(全て `text-text`)。現在地は `decoration-2 underline-offset-8` の下線 + `aria-current="page"`、hover は薄い下線(`decoration-text/30`)。
- 太字にすると文字幅が変わってページ移動でナビがずれるため、現在地でも太さは変えない。
- リンクは `ホーム`(`/`)と `このサイトについて`(`/about`)。

### Footer (`Footer.jsx`)

- 最小構成: サイト名(`font-brand`)→ リンク行(ヘッダーと同じ2つ)→ コピーライト(`font-body text-xs text-text-sub`)。区切り線は置かず `gap-2` の余白で分ける。
- `relative z-40`。ヘッダーと同じ理由で、帯の下側の波より手前に出す。
- ロゴ再掲・タグライン・筆者情報は置かない。

### Background (`Background.jsx`)

- 固定・`pointer-events-none` のブロブ2つ(左上=teal/20, 右下=pink/30)を低透明度でぼかし表示。
- 面(`bg-surface`)は不透明なので、ブロブは余白にのみ透けて見える。

### WaveBand (`WaveBand.jsx`, `WaveEdge.jsx`)

- 各ページの中身を載せる全幅の帯。`<main>` として描画するので、ページ側は `<WaveBand topSeed bottomSeed>` で中身を包むだけ。
- 使用箇所とシード: トップ(`IndexPage`)・記事詳細(`DetailPage`)・about はいずれも `5/2`、404 は `7/4`。
- about・404 は `.astro` から `client:` なしで使うので、JS を送らない静的HTMLになる。
- **全幅の帯**: 中身は Layout の列幅のまま、背景レイヤーだけを `absolute left-1/2 w-screen -translate-x-1/2` で画面端まで広げる。
  - WaveBand が描画する `<main>` に `isolate` を付けて重なりの基準を作り、背景レイヤー(`-z-50`)が `Background`(`-z-9`)より奥に潜らないようにしている。
  - `w-screen` はスクロールバー幅を含むため、`Layout.astro` の `.main-wrapper` に `overflow-x-clip` を付けて横スクロールを防ぐ。`hidden` だとスクロールコンテナになり目次の `sticky` が壊れるので `clip` を使う。
- **上下の波(`WaveEdge`)**: 帯の上端/下端の外側に付ける SVG。下端は `-scale-y-100` で上下反転して使う。
  - 形はシード付き乱数(mulberry32)で決める。`Math.random()` だと SSG とハイドレーションで形が食い違うため。シード(`seed`)を変えると形が変わる。
  - 点を横に等間隔で並べて高さだけランダムにし、二次ベジェで滑らかにつなぐ。`preserveAspectRatio="none"` で横幅いっぱいに引き伸ばす。
  - 塗りは viewBox の下端より `OVERLAP` だけ先まで伸ばし(`overflow-visible`)、帯と数px重ねる。ぴったり接するだけだと、表示位置が小数pxになった時にアンチエイリアスで細い線が見えるため。
  - 帯・波とも不透明色(`bg-surface` / `fill-surface`)で塗る。半透明だと重なった部分が濃くなる。
  - 波はわざとヘッダー/フッターの下に潜り込ませている(上記 Header/Footer の z-index を参照)。

### トップページ / IndexPage (`pages/IndexPage.jsx`)

- 並び順: 挨拶(`Introduction`)→ 記事一覧(`BlogList`)→「かんりにん」(`AuthorCard`)。3つとも1枚の WaveBand の上に載る。

### Introduction (`Introduction.jsx`)

- 挨拶文1行のみ(props なし)。パネル・背景は持たず、`font-accent` の見出しとして帯の上に直接置く。

### 記事カード / BlogTile (`blogTile.jsx`)

- カード自体は背景・枠・影を持たない。画像と文字を帯の上に直接置く。文字は左右の余白を取らず、画像の左端に揃える。
- 角丸(`rounded-panel`)と枠線は画像のラッパーが持つ。通常カード: `border-teal` の1px枠。ヒーロー(`isHero`, 先頭記事): `border-pink` の2px枠。ラッパーの `overflow-hidden` が拡大時の画像も切り取る。
- ヒーローは `md` 以上で横並び(画像 `md:w-1/2`)。タイトルの上に「新着記事」の文字ラベル(`text-pink-strong tracking-widest`、背景なし)。
- 文字: タイトル `font-accent font-medium text-lg lg:text-xl`(2行まで)、日付 `font-heading text-sm text-text-sub`、概要とタグは同じ `text-base` で揃える。
- タグは共通の `TagList`(下記)を使用。
- ホバー演出は画像の拡大(`scale-105`)だけ。スマホ(hoverなし端末)では `useCenterActive` で画面の判定帯に入ったカードに同じ拡大を付ける。
- サムネ欠損時は `thumbnail-placeholder`(`--color-stripe` のストライプ柄)にフォールバック。
- 一覧の間隔は `BlogList` の `gap-x-5 gap-y-6`。

### Tag / TagList (`Tag.jsx`)

- 背景・角丸を持たない `#` 付きテキスト(`#日記`)。既定は `text-teal-strong text-sm`、`max-w-32` を超える名前は省略表示。
- 色やサイズは `tagClassName` で上書きする(記事カードは `text-base`、記事ヒーローは黒スクリム上なので `text-white/80`)。
- `TagList` は `tags` が空/未定義なら何も描画しない。カード一覧・記事ヒーロー両方で共用。

### ArticleHero (`ArticleHero.jsx`)

- サムネ画像(欠損時は `thumbnail-placeholder`)の上に、下部固定のグラデーションスクリム(`from-black/70`)でタグ・タイトル・日付を重ね表示。
- 外枠はトップのヒーローカードの画像と同じ `border-pink` の2px枠。`rounded-panel overflow-hidden` で画像とスクリムも角丸に収める。
- タイトルは白文字 `font-accent font-medium`(`text-xl md:text-3xl`)、タグと日付(`font-heading`)は `text-white/80`。

### ArticleBody (`ArticleBody.jsx`)

- 記事詳細の本文。自身は面・角丸・影を持たず、WaveBand の帯の上に直接置く(`lg:max-w-8/12 px-2`)。
- 構造見出し(`概要` / `本文` / `書いたひと` / `紹介したもの`)は `headingClass`(`font-accent font-medium text-text`、`text-lg md:text-xl`)で統一。`書いたひと` は `author`、`紹介したもの` は `products` がある場合のみ表示。
- CMS本文(`dangerouslySetInnerHTML`)は `.prose` クラスでラップし、見出し階層スタイルは **`global.css` のレイヤー外(`@layer base` の外)で `.prose h2/h3/h4` として一括定義**(コンポーネント側に `@apply`/CSSファイルを持たない)。
  - **注意**: typographyプラグインは`.prose`セレクタ自身に`--tw-prose-*`のデフォルト値一式(body/headings/bold/links/bullets/counters/hr/code/pre-bg/pre-code等)を`utilities`レイヤーで宣言している。`@layer base`内に同じ上書きを書くと詳細度に関係なく負ける(カスケードレイヤーは後のレイヤー優先)ため、`.prose`の上書きは必ずレイヤー外に置くこと。
  - 色の上書きは生プロパティ(`.prose pre { background-color: ... }`等)ではなく、対応する`--tw-prose-*`変数(`--tw-prose-bullets`/`--tw-prose-counters`/`--tw-prose-code`/`--tw-prose-pre-bg`/`--tw-prose-pre-code`等)を`.prose {}`ブロックで設定するのが第一選択。margin/font-size/border等(変数を持たないプロパティ)のみ`h2`/`h3`等への直接上書きでよい。
  - blockquote/table/kbdは現状CMS本文に出てこないため未設定。将来使う場合は同様に`--tw-prose-quotes`/`--tw-prose-th-borders`/`--tw-prose-kbd`等の変数で対応する。

### 本文中の見出し階層(`.prose`, `global.css`)

見出しはすべて `font-accent font-medium`。ボーダー色はTOCの現在地カラーと対応させている:

| 要素        | ボーダー                       | サイズ      |
| ----------- | ------------------------------ | ----------- |
| `.prose h2` | `border-teal`(下線 2px)        | `text-xl`   |
| `.prose h3` | `border-pink-strong`(下線 2px) | `text-lg`   |
| `.prose h4` | なし                           | `text-base` |

構造見出し(概要/本文など)は下線を持たないことで、本文中の見出しと区別している。

### AuthorCard (`AuthorCard.jsx`)

- 自身は背景・枠・影を持たない。置かれる面(各ページの WaveBand の帯)の上に直接乗る。
- 円形アイコン(`size-20 md:size-24`、`border-pink border-2`)と、名前・プロフィールの横並び(`flex items-center gap-4 md:gap-5`)。
- トップでは記事一覧の下に「かんりにん」(`font-accent`)見出しとセットで表示。`ArticleBody`では`author`がある場合のみ「書いたひと」見出しとセットで表示。

### TableOfContents (`TableOfContents.jsx`)

- 見出し(「もくじ」)・モバイルのミニバーの文字は `font-accent`。リンクは下線なしで、hover 時だけ下線。
- 現在地ハイライト色: 記事タイトル / `h2` → `text-teal-strong`、`h3` → `text-pink-strong`。`.prose h2/h3` のボーダー色と対応。
- 記事タイトルもハイライト対象。`ArticleHero`の`<h1 id="article-title">`を観測し、最初の`h2`より上にいる間はタイトルが現在地になる(初期値もこれ)。目次のタイトル行は`#article-title`へのアンカー。
- 現在地そのものは色 + `font-bold` + `translate-x-1`。`h3` にいるときは、その親の `h2` も「今いるセクション」として色だけ(`text-teal-strong`、太字・字下げなし)でハイライトし、現在地と見分けられるようにする。親子関係は見出し抽出時に `parentId` として持たせている。
- `h3` は `ml-4` でインデント。
- 見出しゼロ件なら非表示(`toc.length === 0` で `null` 返却)。タイトル行だけを出すことはしない。
- リスト部分(`TocList`)はモバイル/PCで共有。見出し抽出とスクロールスパイも`useTocHeadings`に集約しており、`IntersectionObserver`は1本だけ。
- `sticky`は`<aside>`自身に置く(`sticky top-2 z-10 lg:top-10`)。内側のラッパーに置くと、モバイルでは中身がミニバーだけで背が低く、可動域がゼロになって効かない。可動域は`DetailPage`の記事全体を包むflexコンテナ。
- PC(`lg`以上): サイドバー(`lg:w-4/12`)。面を持たず帯の上に直接置く。常時展開で、閉じる操作はない。
- モバイル(`lg`未満): 画面上部に貼り付くミニバー。バーには現在地の見出しテキストを表示し、タップで目次パネルが降りてくる。閉じる契機は「リンク選択」「Escapeキー」「パネル外タップ」「ページのスクロール開始(300ms後)」の4つ。
  - スクロールでの自動クローズは`window`の`scroll`を`{ once: true }`で拾う。パネル内(`overflow-y-auto`)のスクロールは`window`まで上がらないので、長い目次を辿る操作では閉じない。
  - パネルは`absolute`配置なので、開閉しても本文が押し下げられない(レイアウトシフトなし)。`max-h-[60vh] overflow-y-auto`で画面を埋めないようにしている。
  - ミニバーは`DetailPage`の`flex-col-reverse`によりDOM上は本文の後ろにあるため、`ArticleBody`の上に描画される。

### AmazonCard (`AmazonCard.jsx`)

- 外部リンクのまとまりだと分かるよう、`border-teal` の1px枠と `rounded-panel` だけを持つ。面・影・浮き上がりはなし。
- 「Amazonで見る →」はピルではなく `text-pink-strong` の文字。ホバー演出はこの文字の下線だけ。
- 商品画像はトリミングで崩れないよう `object-contain`。

### コードブロックのコピーボタン (`.prose .copy-button`, `global.css`)

- 枠なしの文字ボタン(`font-mono text-xs text-text-sub`)。横スクロールしたコードに重なっても読めるよう、背景は `bg-surface/80 backdrop-blur`、角は `rounded-md`。
- hover で文字色を濃く + 下線。コピー成功は `text-teal-strong`、失敗は `text-pink-strong` と、文字色だけで状態を伝える。

### about / 404 (`pages/about.astro`, `pages/404.astro`)

- どちらも WaveBand の上に直接置き、面・角丸・影を持たない。
- about: タイトルは `font-accent font-medium text-xl`、本文は記事と同じ `.prose`。
- 404: 数字は `font-mono text-text-sub`、見出しは `font-heading`。戻りリンク「← ホームへ戻る」は記事詳細の「← ホームへ」と同じ下線の文字リンク。

## スコープ外・未実装

- ダークモード適用(トークンのみ定義済み。切替方式・トリガーは未設計)。
- タグによる絞り込み・タグ一覧ページ(microCMS APIは`tags`を返すため表示自体は実装済み。フィルタ機能のみ未実装)。
- モバイル向けヘッダーナビ(ハンバーガーメニュー等)。
- `feature/sso`ブランチ(会員限定コンテンツ等と思われるが用途未確認)。
