import { AuthorCard } from '@/components/AuthorCard';

export const Introduction = ({ admin }) => {
  return (
    <section className="bg-surface/92 mb-7 box-border rounded-2xl p-4 shadow-lg md:p-5">
      <div className="mb-5">
        <p>ようこそ〇〇のブログへ</p>
      </div>
      <div>
        <h2 className="mb-2 text-lg md:text-xl">かんりにん</h2>
        <div>
          <AuthorCard author={admin} />
        </div>
      </div>
    </section>
  );
};
