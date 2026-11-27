import { cn } from '@/lib/utils';

// SVGの座標系(実際の表示サイズとは無関係。preserveAspectRatio="none"で引き伸ばす)
const WIDTH = 1200;
const HEIGHT = 100;
// 塗りをviewBoxの下端より少し先まで伸ばし、帯の中に潜り込ませる量。
// 境目をぴったり接するだけにすると、表示位置が小数pxになった時に
// アンチエイリアスで半透明の細い線が出るため、数pxぶん帯と重ねて隠す。
const OVERLAP = 8;

// シード付きの疑似乱数(mulberry32)。
// Math.random() だとサーバー描画(SSG)とブラウザでの再描画(hydration)で形が食い違うため、
// 同じシードなら必ず同じ数列を返すものを使う。
const createRandom = (seed) => {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

// 横に等間隔の点を置き、高さだけランダムにして、点と点の間を曲線でつなぐ。
// 線より下を塗りつぶすので、下に続く帯と自然につながる。
const buildWavePath = (seed, pointCount) => {
  const random = createRandom(seed);
  const points = Array.from({ length: pointCount }, (_, i) => ({
    x: (WIDTH / (pointCount - 1)) * i,
    y: HEIGHT * (0.1 + random() * 0.8), // 上下10%は余白として残す
  }));
  const mid = (a, b) => `${(a.x + b.x) / 2},${(a.y + b.y) / 2}`;

  // 各点を「制御点」、隣との中点を「通過点」にすると、角のない滑らかな曲線になる
  let d = `M${points[0].x},${points[0].y} L${mid(points[0], points[1])}`;
  for (let i = 1; i < pointCount - 1; i++) {
    d += ` Q${points[i].x},${points[i].y} ${mid(points[i], points[i + 1])}`;
  }
  const last = points[pointCount - 1];
  d += ` L${last.x},${last.y} L${WIDTH},${HEIGHT + OVERLAP} L0,${HEIGHT + OVERLAP} Z`;
  return d;
};

// 帯の上端/下端に付ける波。position="bottom"は上下反転して使う。
export const WaveEdge = ({ seed, position = 'top', pointCount = 5, className = '' }) => (
  <svg
    viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
    preserveAspectRatio="none"
    aria-hidden="true"
    className={cn(
      // overflow-visible: viewBoxの外(OVERLAP分)にはみ出した塗りも描画する
      'absolute left-0 h-16 w-full overflow-visible md:h-20',
      position === 'top' ? 'bottom-full' : 'top-full -scale-y-100',
      className,
    )}
  >
    <path d={buildWavePath(seed, pointCount)} />
  </svg>
);
