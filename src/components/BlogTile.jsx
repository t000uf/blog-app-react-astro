import { cn, formatDate } from '@/lib/utils';
import { TagList } from '@/components/Tag';

export const BlogTile = ({ blog, isHero = false }) => {
  const date = formatDate(blog.updatedAt);
  const imageUrl = blog.thumbnail?.url ? `${blog.thumbnail.url}?w=800&fm=webp` : '';

  const styles = {
    blogTile: cn(
      'bg-surface rounded-panel group relative flex min-w-0 flex-col shadow-sm',
      'transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform',
      'hover:-translate-y-1 hover:shadow-xl',
      isHero
        ? 'border-pink border-2 md:col-span-full md:flex-row'
        : 'border-teal col-span-1 flex-col border',
    ),
    tileImgWrap: cn('rounded-panel w-full overflow-hidden', isHero && 'md:w-2/5 md:shrink-0'),
    tileImg: cn(
      'bg-surface-2 aspect-3/2 w-full object-cover',
      'ease-[cubic-bezier(0.34, 1.56, 0.64, 1)] transition-transform duration-500 will-change-transform',
      'group-hover:scale-110',
    ),
    tileText: cn('w-full p-4 md:p-5'),
    tileTitle: cn('wrap-break-word font-brand truncate text-xl md:text-2xl'),
    tileTitleUnderline: cn(
      'mb-2 block h-0.5 w-0 transition-all duration-300 group-hover:w-full',
      isHero ? 'bg-teal' : 'bg-pink',
    ),
    tileDate: cn('text-text-sub mb-3 w-full font-mono text-xs'),
    featuredBadge: cn(
      'bg-pink text-pink-strong rounded-chip absolute right-4 top-4 px-3 py-1 text-xs font-bold',
    ),
    tileAnchor: cn('absolute left-0 top-0 size-full text-sm'),
  };

  return (
    <li className={styles.blogTile}>
      {isHero && <span className={styles.featuredBadge}>注目</span>}
      <div className={styles.tileImgWrap}>
        {imageUrl ? (
          <img src={imageUrl} alt="" loading="lazy" decoding="async" className={styles.tileImg} />
        ) : (
          <div className={styles.tileImg} />
        )}
      </div>
      <div className={styles.tileText}>
        <TagList tags={blog.tags} className="mb-2" />
        <h2 className={styles.tileTitle}>{blog.title}</h2>
        <span className={styles.tileTitleUnderline} />
        <p className={styles.tileDate}>{date}</p>
        {blog.description && <p className="line-clamp-3 w-full">{blog.description}</p>}
        <a href={`/blogs/${blog.id}`} className={styles.tileAnchor}></a>
      </div>
    </li>
  );
};
