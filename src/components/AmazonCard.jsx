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
      // 外部リンクのまとまりだと分かるよう枠線だけ残し、影・浮き上がりは付けない。
      // ホバー演出は「Amazonで見る」の下線1つに絞る。
      className="rounded-panel border-teal not-prose group flex flex-col items-center gap-4 overflow-hidden border p-4 no-underline md:flex-row"
    >
      <div className="bg-surface-2 rounded-panel size-48 shrink-0 overflow-hidden p-1 md:size-28">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-contain"
          />
        ) : (
          <div className="thumbnail-placeholder rounded-panel size-full" />
        )}
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <p className="text-text wrap-break-word line-clamp-3 text-sm font-bold">{product.title}</p>
        {/* ピル(背景+角丸)ではなく文字リンクにする */}
        <span className="text-pink-strong w-fit text-sm font-medium decoration-2 underline-offset-4 group-hover:underline">
          Amazonで見る →
        </span>
      </div>
    </a>
  );
};
