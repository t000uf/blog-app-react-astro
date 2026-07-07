import { codeToHtml } from 'shiki';

// MicroCMSのリッチエディタが吐くコードブロックにShikiでシンタックスハイライトを当てる。
// shikiのimportはこのモジュールに閉じ込め、Astroのフロントマター(ビルド時/SSG)からのみ呼ぶ。
// これによりクライアントバンドルにshikiが載らない(記事詳細ページはprerender)。

const THEME = 'github-light';

// MicroCMSの出力パターン:
//   ファイル名あり: <div data-filename="foo.ts"><pre><code class="language-ts">...</code></pre></div>
//   ファイル名なし: <pre><code class="language-ts">...</code></pre>
// どちらも1つの正規表現で拾い、ファイル名の有無で分岐する。
const CODE_BLOCK_RE =
  /<div data-filename="([^"]*)">\s*<pre><code class="language-([^"]+)">([\s\S]*?)<\/code><\/pre>\s*<\/div>|<pre><code class="language-([^"]+)">([\s\S]*?)<\/code><\/pre>/g;

// <code>内のコードはHTMLエスケープされているため、Shikiに渡す前に元の文字へ戻す。
// &amp; を最後に処理しないと "&amp;lt;" のような二重エスケープを誤って展開してしまう。
const decodeHtmlEntities = (s: string): string =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'") // MicroCMSはシングルクォートを &apos; で出力する
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');

// ファイル名バーに差し込む前にHTML特殊文字を無害化する
const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const highlight = async (rawCode: string, lang: string): Promise<string> => {
  try {
    return await codeToHtml(rawCode, { lang, theme: THEME });
  } catch {
    // バンドルに無い言語などはプレーンテキストとして色は付けずに枠だけ揃える
    return codeToHtml(rawCode, { lang: 'text', theme: THEME });
  }
};

const renderBlock = async (filename: string, lang: string, escapedCode: string): Promise<string> => {
  const codeHtml = await highlight(decodeHtmlEntities(escapedCode).replace(/\n+$/, ''), lang);
  const filenameBar = filename
    ? `<div class="code-filename">${escapeHtml(filename)}</div>`
    : '';
  // コピーボタンは静的HTMLとして埋め込み、クリック処理はクライアント側(ArticleBody)で委譲する。
  // .code-body は非スクロールの相対配置。中の<pre>だけ横スクロールさせ、ボタンは流れないよう固定する。
  const copyButton = `<button type="button" class="copy-button" aria-label="コードをコピー">コピー</button>`;
  return `<div class="code-block">${filenameBar}<div class="code-body">${copyButton}${codeHtml}</div></div>`;
};

export const highlightCodeBlocks = async (html: string): Promise<string> => {
  if (!html) return html;

  const matches = [...html.matchAll(CODE_BLOCK_RE)];
  if (matches.length === 0) return html;

  const rendered = await Promise.all(
    matches.map((m) => {
      // 前半の選択肢(ファイル名あり)にマッチしたかどうかは m[2] の有無で判定する
      const isWrapped = m[2] !== undefined;
      const filename = isWrapped ? m[1] : '';
      const lang = isWrapped ? m[2] : m[4];
      const code = isWrapped ? m[3] : m[5];
      return renderBlock(filename, lang, code);
    }),
  );

  // 同一内容のコードブロックが複数あっても取り違えないよう、マッチ位置で厳密に再構築する
  let result = '';
  let lastIndex = 0;
  matches.forEach((m, i) => {
    result += html.slice(lastIndex, m.index) + rendered[i];
    lastIndex = m.index! + m[0].length;
  });
  result += html.slice(lastIndex);

  return result;
};
