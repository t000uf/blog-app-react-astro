import { formatDate } from '@/lib/utils';
import { TagList } from '@/components/Tag';

export const ArticleHero = ({ blog }) => {
  const imageUrl = blog.thumbnail?.url ? `${blog.thumbnail.url}?w=800&fm=webp` : '';

  return (
    // 枠はトップのヒーローカードの画像と同じピンク太枠。overflow-hiddenで画像とスクリムも角丸に収める
    <div className="bg-surface-2 rounded-panel border-pink relative mb-4 box-border overflow-hidden border-2 md:mb-6">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          loading="lazy"
          decoding="async"
          className="bg-surface-2 aspect-video w-full object-cover"
        />
      ) : (
        <div className="thumbnail-placeholder aspect-video w-full" />
      )}
      <div className="bg-linear-to-t absolute inset-x-0 bottom-0 flex flex-col gap-2 from-black/70 to-transparent p-4 pt-12 md:p-5 md:pt-16">
        <TagList tags={blog.tags} tagClassName="text-white/80" />
        {/* idはTableOfContentsのスクロールスパイ/リンク先として参照している */}
        <h1 id="article-title" className="font-accent text-xl font-medium text-white md:text-3xl">
          {blog.title}
        </h1>
        <p className="font-heading text-xs text-white/80 md:text-base">
          {formatDate(blog.updatedAt ?? blog.publishedAt)}
        </p>
      </div>
    </div>
  );
};
