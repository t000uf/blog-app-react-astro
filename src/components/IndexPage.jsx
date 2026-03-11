import { BlogList } from '@/components/BlogList';

const styles = {
  listContainer: 'bg-slate-100/75 rounded-2xl p-5 box-border shadow-lg',
};

export const IndexPage = ({ blogs }) => {
  return (
    <>
      <div>
        {/* 仮 */}
        <h1 className="mb-7 text-2xl">aa</h1>
      </div>
      <main className={styles.listContainer}>
        <h2 className="mb-7 text-2xl">記事一覧</h2>
        <BlogList client:load blogs={blogs} />
      </main>
    </>
  );
};
