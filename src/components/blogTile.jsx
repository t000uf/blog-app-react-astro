import '@/styles/global.css';
import { cn, formatDate } from '@/lib/utils';

export const BlogTile = ({ blog, isHero = 'false' }) => {
  const date = formatDate(blog.publishedAt);
  const imageUrl = blog.thumbnail?.url ? `${blog.thumbnail.url}?w=800&fm=webp` : '';

  const styles = {
    blogTile: cn(
      'bg-sub-pink group relative flex flex-col rounded-2xl shadow-md',
      'transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform',
      'hover:-translate-y-2 hover:shadow-xl hover:outline hover:outline-dashed hover:outline-2 hover:outline-offset-4 hover:outline-stone-300/60',
      isHero ? 'md:col-span-full md:flex-row' : 'col-span-1 flex-col',
    ),
    tileImgWrap: cn('w-full overflow-hidden rounded-2xl', isHero && 'lg:w-2/5 lg:shrink-0'),
    tileImg: cn(
      'aspect-3/2 w-full bg-blue-400 object-cover',
      'ease-[cubic-bezier(0.34, 1.56, 0.64, 1)] scale-110 transition-transform duration-500 will-change-transform',
      'group-hover:scale-100',
    ),
    tileText: cn('w-full p-5'),
    tileTitle: cn('wrap-break-word mb-1 line-clamp-1 text-2xl'),
    tileAnchor: cn('absolute left-0 top-0 size-full text-sm'),
  };

  return (
    <li className={styles.blogTile}>
      <div className={styles.tileImgWrap}>
        <img src={imageUrl} alt="" loading="lazy" decoding="async" className={styles.tileImg} />
      </div>
      <div className={styles.tileText}>
        <h2 className={styles.tileTitle}>{blog.title}</h2>
        <p className="mb-3 w-full text-xs">{date}</p>
        <p className={`line-clamp-3 ${isHero ?? 'w-full'}`}>{blog.description}</p>
        <a href={`/blogs/${blog.id}`} className={styles.tileAnchor}></a>
      </div>
    </li>
  );
};
