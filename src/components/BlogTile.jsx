import { useEffect, useRef, useState } from 'react';
import { cn, formatDate, stripHtml } from '@/lib/utils';
import { TagList } from '@/components/Tag';

// ビューポートの60%〜65%を判定の帯とする。
// 上下の削り量の合計は必ず100%未満にすること(超えると帯の高さが負になり、
// 要素がどこにあっても永久に交差しなくなる)。
// 画面中央(40%付近)ではなく少し下に置いているのは、記事数が少なくページが短いと
// 最下部までスクロールしても最終タイルが画面中央まで上がりきらず、発火できないため。
const ACTIVE_BAND = '-60% 0px -35% 0px';

// hoverを持たない端末(スマホ)で、要素が上記の帯に入ったらtrueを返す。
// PC(hoverあり)では常にfalseのままにして、従来のCSS :hover に任せる。
const useCenterActive = () => {
  const ref = useRef(null);
  const [inBand, setInBand] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(hover: none)').matches) return;

    const observer = new IntersectionObserver(([entry]) => setInBand(entry.isIntersecting), {
      rootMargin: ACTIVE_BAND,
    });
    observer.observe(el);

    // 読み込み直後に光らせないためのガード。一度スクロールするまで発火させない。
    const onScroll = () => setHasScrolled(true);
    window.addEventListener('scroll', onScroll, { passive: true, once: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // hasScrolledはstateにする。ただのローカル変数だと、IntersectionObserverは
  // 交差状態が変化した時しかコールバックしないため、スクロール開始時に再評価されない。
  return { ref, isActive: hasScrolled && inBand };
};

export const BlogTile = ({ blog, isHero = false }) => {
  const { ref, isActive } = useCenterActive();
  const date = formatDate(blog.updatedAt);
  const imageUrl = blog.thumbnail?.url ? `${blog.thumbnail.url}?w=800&fm=webp` : '';

  const styles = {
    blogTile: cn(
      // カード自体は背景・枠・影を持たない。画像と文字だけを帯の上に直接置く。
      // ホバー演出は画像の拡大1つに絞る。
      'group relative flex min-w-0 flex-col',
      isHero ? 'md:col-span-full md:flex-row' : 'col-span-1',
    ),
    // 角丸と枠線は画像のラッパーが持つ(拡大時のはみ出しもここでクリップ)。
    // 通常=ティール1px枠 / ヒーロー=ピンク2px枠
    tileImgWrap: cn(
      'rounded-panel w-full overflow-hidden',
      isHero ? 'border-pink border-2 md:w-1/2 md:shrink-0' : 'border-teal border',
    ),
    tileImg: cn(
      'bg-surface-2 aspect-3/2 w-full object-cover',
      'transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform',
      'group-hover:scale-105',
      isActive && 'scale-105',
      // isHeroの横並び時は16:9を基本に、カードの高さに合わせて伸ばす(最低min-h-60)
      isHero && 'md:aspect-16/9 md:h-full md:min-h-60',
    ),
    tileText: cn(
      // 箱がないので左右の余白は取らず、文字の左端を画像の左端に揃える。
      // ヒーローの横並び時だけ、画像との間を空ける。
      'flex w-full min-w-0 flex-col justify-center gap-2 py-3',
      isHero && 'gap-3 md:py-4 md:pl-6',
    ),
    tileTitle: cn('wrap-break-word font-accent line-clamp-2 text-lg font-medium lg:text-xl'),
    // 概要とタグは同じ文字サイズで揃える
    tileDescription: cn('line-clamp-3 w-full text-base'),
    tileTag: cn('text-base'),
    tileDate: cn('text-text-sub font-heading w-full text-sm'),
    // ピル(背景+角丸)ではなく、ピンクの字間を空けた文字ラベルで「特別」を示す
    featuredLabel: cn('font-body text-pink-strong mb-1 text-sm tracking-widest'),
    tileAnchor: cn('absolute left-0 top-0 size-full text-sm'),
  };

  return (
    <li ref={ref} className={styles.blogTile}>
      <div className={styles.tileImgWrap}>
        {imageUrl ? (
          <img src={imageUrl} alt="" loading="lazy" decoding="async" className={styles.tileImg} />
        ) : (
          <div className={cn(styles.tileImg, 'thumbnail-placeholder')} />
        )}
      </div>
      <div className={styles.tileText}>
        <div>
          {isHero && <p className={styles.featuredLabel}>新着記事</p>}
          <h3 className={styles.tileTitle}>{blog.title}</h3>
        </div>
        <p className={styles.tileDate}>{date}</p>
        <p className={styles.tileDescription}>{blog.description || stripHtml(blog.content)}</p>
        <TagList tags={blog.tags} tagClassName={styles.tileTag} />
        <a href={`/blogs/${blog.id}`} className={styles.tileAnchor}></a>
      </div>
    </li>
  );
};
