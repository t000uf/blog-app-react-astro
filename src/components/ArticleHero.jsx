import { formatDate } from '@/lib/utils';
import { TagList } from '@/components/Tag';

export const ArticleHero = ({ blog }) => {
  const imageUrl = blog.thumbnail?.url ? `${blog.thumbnail.url}?w=800&fm=webp` : '';

  return (
    <div className="bg-surface-2 rounded-panel relative mb-5 box-border overflow-hidden">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          loading="lazy"
          decoding="async"
          className="bg-surface-2 aspect-video w-full object-cover"
        />
      ) : (
        <div className="bg-surface-2 aspect-video w-full" />
      )}
      <div className="bg-linear-to-t absolute inset-x-0 bottom-0 flex flex-col gap-2 from-black/70 to-transparent p-5 pt-16">
        <TagList tags={blog.tags} />
        <h1 className="font-heading text-3xl font-bold text-white">{blog.title}</h1>
        <p className="font-mono text-sm text-white/80">{formatDate(blog.publishedAt)}</p>
      </div>
    </div>
  );
};
