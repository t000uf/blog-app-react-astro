import { BlogTile } from '@/components/BlogTile';

const styles = {
  blogList: 'grid lg:grid-cols-3 md:grid-cols-2 gap-x-5 gap-y-6',
};

export const BlogList = ({ blogs }) => {
  return (
    <ul className={styles.blogList}>
      {blogs.map((blog, index) => (
        <BlogTile blog={blog} key={blog.id} isHero={index === 0} />
      ))}
    </ul>
  );
};
