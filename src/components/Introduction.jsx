import { AuthorCard } from '@/components';

export const Introduction = ({ admin }) => {
  return (
    <section className="bg-surface/92 mb-7 box-border rounded-2xl p-5 shadow-lg">
      <div className="mb-5">
        <p>ようこそ〇〇のブログへ</p>
      </div>
      <div>
        <h2 className="mb-2 text-xl">かんりにん</h2>
        <div>
          <AuthorCard author={admin} />
        </div>
      </div>
    </section>
  );
};
