import { BlogTile } from './blogTile';

export default function BlogList({ blogs }) {
  const styles = {
    listContainer: 'bg-slate-100 rounded-2xl p-5 box-border opacity-75',
    blogList: 'grid lg:grid-cols-3 md:grid-cols-2 gap-5',
  };

  return (
    <main className={styles.listContainer}>
      <h1 className="mb-7 text-2xl">記事一覧</h1>
      <ul className={styles.blogList}>
        {blogs.map((blog) => (
          <BlogTile blog={blog} key={blog.id} />
        ))}
      </ul>
    </main>
  );
}
