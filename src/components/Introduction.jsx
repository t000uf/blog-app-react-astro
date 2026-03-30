import { AuthorCard } from '@/components';

export const Introduction = ({ admin }) => {
  return (
    <section className="mb-7 box-border rounded-2xl bg-slate-100/75 p-5 shadow-lg">
      <div className="mb-5">
        <h1 className="text-3xl">〇〇ぶろぐ</h1>
        <p>ようこそ〇〇のブログへ</p>
      </div>
      <div>
        <h2 className="mb-2 text-2xl">かんりにん</h2>
        <AuthorCard author={admin} />
      </div>
    </section>
  );
};
