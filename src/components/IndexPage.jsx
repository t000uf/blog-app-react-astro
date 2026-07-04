import { BlogList, Introduction } from '@/components';

const styles = {
  listContainer: 'bg-surface/92 rounded-panel p-5 pb-8 box-border shadow-lg',
};

export const IndexPage = ({ blogs, admin }) => {
  return (
    <>
      <Introduction admin={admin} />
      <main className={styles.listContainer}>
        <h2 className="mb-4 text-2xl">記事一覧</h2>
        <BlogList client:load blogs={blogs} />
      </main>
    </>
  );
};
