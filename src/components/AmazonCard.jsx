import { cn } from '@/lib/utils';

// アソシエイトリンクを組み立てる純粋関数。ASINだけを受け取り、タグはenv由来の値を渡してもらう。
// 将来PA-API化しても遷移先URLの形は変わらないため、この関数はそのまま使える（Issue #55）。
export const buildAmazonUrl = (asin, associateTag) => {
  const base = `https://www.amazon.co.jp/dp/${encodeURIComponent(asin)}`;
  return associateTag ? `${base}?tag=${encodeURIComponent(associateTag)}` : base;
};

export const AmazonCard = ({ product, associateTag }) => {
  if (!product) return null;
  const url = buildAmazonUrl(product.asin, associateTag);
  // 書影・商品画像はトリミングで崩れるため object-cover ではなく object-contain。
  const imageUrl = product.image?.url ? `${product.image.url}?w=320&fm=webp` : '';

  return (
    <a
      href={url}
      target="_blank"
      // sponsored: アフィリエイトリンクの表明 / nofollow: 評価を渡さない / noopener: opener乗っ取り防止
      rel="sponsored nofollow noopener"
      className={cn(
        'bg-surface rounded-panel group border-teal not-prose flex items-center gap-4 overflow-hidden border p-4 no-underline shadow-sm',
        'transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md',
      )}
    >
      <div className="bg-surface-2 rounded-panel size-24 shrink-0 overflow-hidden md:size-28">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-contain"
          />
        ) : (
          <div className="thumbnail-placeholder size-full" />
        )}
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <p className="text-text wrap-break-word line-clamp-3 font-bold">{product.title}</p>
        <span className="text-pink-strong bg-pink rounded-chip w-fit px-3 py-1 text-xs font-bold">
          Amazonで見る →
        </span>
      </div>
    </a>
  );
};
