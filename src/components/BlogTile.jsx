import '@/styles/global.css';
import { formatDate } from '@/lib/utils';

export const BlogTile = ({ blog }) => {
  const date = formatDate(blog.publishedAt);
  const imageUrl = blog.thumbnail?.url ? `${blog.thumbnail.url}?w=800&fm=webp` : '';

  const styles = {
    blogTile:
      'tile relative bg-sub-pink rounded-2xl opacity-80 shadow-md transition duration-300 hover:opacity-100',
    tileImgWrap: 'w-full rounded-2xl overflow-hidden',
    tileTitle: 'mb-1 text-2xl wrap-break-word line-clamp-1',
    tileAnchor: 'absolute top-0 left-0 size-full text-sm',
  };

  return (
    <div className={styles.blogTile}>
      <div className={styles.tileImgWrap}>
        <img
          src={imageUrl}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-3/2 w-full bg-blue-400 object-cover"
        />
      </div>
      <div className="w-full p-5">
        <h2 className={styles.tileTitle}>{blog.title}</h2>
        <p className="mb-3 w-full text-xs">{date}</p>
        <p className="line-clamp-3">{blog.description}</p>
        <a href={`/blogs/${blog.id}`} className={styles.tileAnchor}></a>
      </div>
    </div>
  );
};
