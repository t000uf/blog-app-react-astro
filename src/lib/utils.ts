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
