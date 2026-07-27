import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  // 未公開の下書きは publishedAt を持たないなど、日付が欠落/不正なケースがある。
  // Intl.DateTimeFormat は Invalid Date で例外を投げSSRごと落とすため、事前に弾く。
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

// リッチエディタのHTMLからタグを除いたプレーンテキストを取り出す。
// 概要が無い記事カードの抜粋などに使う。SSG(Node)・クライアント両対応のため正規表現ベース。
export const stripHtml = (html: string): string => {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ') // タグ除去（ブロック境界で単語が繋がらないよう空白に）
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ') // 連続する空白を1つに畳む
    .trim();
};

// 本文中の {{amazon:ASIN}} ショートコードで本文HTMLを分割した1区画。
// html 区画は dangerouslySetInnerHTML で、product 区画は <AmazonCard> で描画する（Issue #55）。
export type ArticleSegment = { type: 'html'; html: string } | { type: 'product'; asin: string };

// リッチエディタはショートコードを <p>{{amazon:X}}</p> と段落で包むため、まず段落ごと除去する
// 分岐を優先する（<p> が片割れで残ると後続のHTMLが壊れる）。段落に包まれない裸の記述も拾う。
const AMAZON_SHORTCODE_RE =
  /<p>\s*\{\{\s*amazon\s*:\s*([A-Za-z0-9]+)\s*\}\}\s*<\/p>|\{\{\s*amazon\s*:\s*([A-Za-z0-9]+)\s*\}\}/g;

// 本文HTMLを {{amazon:ASIN}} の位置で区切り、間に商品区画を挟んだセグメント配列にする。
// ショートコードが無ければ html 区画1つだけを返す（従来と同じ描画になる）。
export const splitAmazonShortcodes = (html: string): ArticleSegment[] => {
  if (!html) return [];
  const segments: ArticleSegment[] = [];
  let lastIndex = 0;
  for (const m of html.matchAll(AMAZON_SHORTCODE_RE)) {
    const asin = m[1] ?? m[2];
    const before = html.slice(lastIndex, m.index);
    if (before) segments.push({ type: 'html', html: before });
    segments.push({ type: 'product', asin });
    lastIndex = m.index! + m[0].length;
  }
  const rest = html.slice(lastIndex);
  if (rest) segments.push({ type: 'html', html: rest });
  return segments;
};

const MICROCMS_IMAGE_HOST = 'images.microcms-assets.io';

// 記事本文(リッチエディタのHTML)内のMicroCMS画像にリサイズ用クエリを付与する
export const resizeMicrocmsImages = (html: string): string => {
  if (!html) return html;
  return html.replace(/<img([^>]*?)src="([^"]+)"([^>]*)>/g, (match, before, src, after) => {
    let url: URL;
    try {
      url = new URL(src);
    } catch {
      return match;
    }
    if (url.hostname !== MICROCMS_IMAGE_HOST) return match;
    if (!url.searchParams.has('w')) url.searchParams.set('w', '800');
    if (!url.searchParams.has('fm')) url.searchParams.set('fm', 'webp');
    return `<img${before}src="${url.toString()}"${after}>`;
  });
};
