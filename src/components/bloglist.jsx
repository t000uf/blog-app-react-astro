import { BlogTile } from '@components/BlogTile';

const styles = {
  blogList: 'grid lg:grid-cols-3 md:grid-cols-2 gap-5',
};

export const BlogList = ({ blogs }) => {
  return (
    <ul className={styles.blogList}>
      {blogs.map((blog) => (
        <BlogTile blog={blog} key={blog.id} />
      ))}
    </ul>
  );
};
