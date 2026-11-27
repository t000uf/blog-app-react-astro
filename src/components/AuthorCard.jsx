// 置かれる面(トップの記事一覧の帯/記事本文パネル)の上に直接乗せるので、自身は枠・影・背景を持たない。
// 箱の入れ子をやめ、アイコンと文字の横並びだけで構成する。
export const AuthorCard = ({ author }) => {
  return (
    <div className="flex items-center gap-4 md:gap-5">
      <img
        src={author.image.url ? `${author.image.url}?w=256&fm=webp` : ''}
        alt={author.name}
        className="border-pink size-20 shrink-0 rounded-full border-2 object-cover md:size-24"
      />
      <div className="min-w-0">
        <p className="wrap-break-word text-lg md:text-xl">{author.name}</p>
        <p className="text-text-sub wrap-break-word line-clamp-2 text-sm">{author.profile}</p>
      </div>
    </div>
  );
};
