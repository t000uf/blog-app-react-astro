import { BlogList } from '@/components/BlogList';
import { Introduction } from '@/components/Introduction';

const styles = {
  listContainer: 'bg-surface/92 rounded-panel p-4 pb-6 md:p-5 md:pb-8 box-border shadow-lg',
};

export const IndexPage = ({ blogs, admin }) => {
  return (
    <>
      <Introduction admin={admin} />
      <main className={styles.listContainer}>
        <h2 className="font-heading text-text-sub mb-4 text-lg font-bold md:text-xl">記事一覧</h2>
        <BlogList blogs={blogs} />
      </main>
    </>
  );
};
