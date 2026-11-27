import { AuthorCard } from '@/components/AuthorCard';
import { BlogList } from '@/components/BlogList';
import { Introduction } from '@/components/Introduction';
import { WaveEdge } from '@/components/WaveEdge';

const styles = {
  // 中身(見出し・カード)はLayoutの列幅のまま、背景だけを画面の端から端まで敷く。
  // isolate で重なりの基準を作り、背景レイヤー(-z-50)がページ背景より奥に潜らないようにする。
  // 上下の波(帯の外側にはみ出す)は、わざとヘッダー/フッターの下に潜り込ませている。
  // ヘッダー/フッター側が relative + z-index を持つので、文字は波より手前に出る。
  listContainer: 'relative isolate mt-10 md:mt-16 mb-6 md:mb-14',
  // 背景専用のレイヤー。中央基準で画面幅いっぱいに広げる。
  // 波と境目で色が重なっても濃くならないよう、帯・波とも不透明色で塗る。
  listBackground:
    'bg-surface fill-surface absolute inset-y-0 left-1/2 -z-50 w-screen -translate-x-1/2',
};

export const IndexPage = ({ blogs, admin }) => {
  return (
    <>
      <main className={styles.listContainer}>
        <div aria-hidden="true" className={styles.listBackground}>
          {/* シードを変えると波の形が変わる */}
          <WaveEdge seed={5} position="top" />
          <WaveEdge seed={2} position="bottom" />
        </div>
        <Introduction />
        <BlogList blogs={blogs} />
        <section className="pt-4 md:pt-6">
          <h2 className="font-brand mb-3 text-xl md:text-2xl">かんりにん</h2>
          <AuthorCard author={admin} />
        </section>
      </main>
    </>
  );
};
