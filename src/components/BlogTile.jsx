import { cn, formatDate, stripHtml } from '@/lib/utils';
import { TagList } from '@/components/Tag';

export const BlogTile = ({ blog, isHero = false }) => {
  const date = formatDate(blog.updatedAt);
  const imageUrl = blog.thumbnail?.url ? `${blog.thumbnail.url}?w=800&fm=webp` : '';

  const styles = {
    blogTile: cn(
      'bg-surface rounded-panel group relative flex min-w-0 flex-col overflow-hidden shadow-sm',
      'transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform',
      'hover:-translate-y-1 hover:shadow-xl',
      isHero
        ? 'border-pink border-2 md:col-span-full md:flex-row'
        : 'border-teal col-span-1 flex-col border',
    ),
    tileImgWrap: cn('rounded-r-panel w-full overflow-hidden', isHero && 'md:w-1/2 md:shrink-0'),
    tileImg: cn(
      'bg-surface-2 aspect-3/2 w-full object-cover',
      'ease-[cubic-bezier(0.34, 1.56, 0.64, 1)] transition-transform duration-500 will-change-transform',
      'group-hover:scale-110',
      // isHeroの横並び時はアスペクト比固定をやめ、カード高さいっぱいに伸ばす
      isHero && 'md:aspect-auto md:h-full md:min-h-60',
    ),
    tileText: cn('flex w-full flex-col justify-center gap-2 p-4', isHero && 'justify-center gap-3'),
    tileTitle: cn('wrap-break-word font-brand truncate text-xl md:text-2xl'),
    tileTitleUnderline: cn(
      'block h-0.5 w-0 transition-all duration-300 group-hover:w-full',
      isHero ? 'bg-teal' : 'bg-pink',
    ),
    tileDate: cn('text-text-sub w-full font-mono text-xs'),
    featuredBadge: cn(
      'bg-pink text-pink-strong rounded-chip max-h-content min-w-12 px-3 py-1 text-center text-xs font-bold',
    ),
    tileAnchor: cn('absolute left-0 top-0 size-full text-sm'),
  };

  return (
    <li className={styles.blogTile}>
      <div className={styles.tileImgWrap}>
        {imageUrl ? (
          <img src={imageUrl} alt="" loading="lazy" decoding="async" className={styles.tileImg} />
        ) : (
          <div className={styles.tileImg} />
        )}
      </div>
      <div className={styles.tileText}>
        <div>
          <h2 className={styles.tileTitle}>{blog.title}</h2>
          <span className={styles.tileTitleUnderline} />
        </div>
        <p className={styles.tileDate}>{date}</p>
        <p className="line-clamp-3 w-full">{blog.description || stripHtml(blog.content)}</p>
        <div className="flex flex-row items-start justify-between">
          <TagList tags={blog.tags} />
          {isHero && <span className={styles.featuredBadge}>注目</span>}
        </div>
        <a href={`/blogs/${blog.id}`} className={styles.tileAnchor}></a>
      </div>
    </li>
  );
};
