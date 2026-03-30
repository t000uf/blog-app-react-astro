import { BlogList, Introduction } from '@/components';

const styles = {
  listContainer: 'bg-slate-100/75 rounded-2xl p-5 box-border shadow-lg',
};

export const IndexPage = ({ blogs, admin }) => {
  return (
    <>
      <Introduction admin={admin} />
      <main className={styles.listContainer}>
        <h2 className="mb-5 text-2xl">記事一覧</h2>
        <BlogList client:load blogs={blogs} />
      </main>
    </>
  );
};
