import { cn } from '@/lib/utils';
import { WaveEdge } from '@/components/WaveEdge';

// ページの中身を載せる「全幅の帯」。上下にランダムな波が付く。
// 中身はLayoutの列幅のまま、背景だけを画面の端から端まで敷く。
// どのページもこの帯1枚の上に直接要素を置き、パネル(箱)は重ねない。
//
// - isolate で重なりの基準を作り、背景レイヤー(-z-50)がページ背景(Background)より奥に潜らないようにする。
// - 上下の波(帯の外側にはみ出す)は、わざとヘッダー/フッターの下に潜り込ませている。
//   ヘッダー/フッター側が relative + z-index を持つので、文字は波より手前に出る。
// - 帯・波とも不透明色で塗る。半透明だと波と帯の重なった部分が濃くなる。
export const WaveBand = ({ topSeed, bottomSeed, className = '', children }) => (
  <main className={cn('relative isolate my-10 md:mb-14 md:mt-16', className)}>
    <div
      aria-hidden="true"
      className="bg-surface fill-surface absolute inset-y-0 left-1/2 -z-50 w-screen -translate-x-1/2"
    >
      {/* シードを変えると波の形が変わる(呼び出し側のページで指定する) */}
      <WaveEdge seed={topSeed} position="top" />
      <WaveEdge seed={bottomSeed} position="bottom" />
    </div>
    {children}
  </main>
);
