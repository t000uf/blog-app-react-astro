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
      'bg-surface rounded-panel group relative flex min-w-0 flex-col overflow-hidden shadow-sm',
      'transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform',
      'hover:-translate-y-1 hover:shadow-xl',
      isActive && '-translate-y-1 shadow-xl',
      isHero
        ? 'border-pink border-2 md:col-span-full md:flex-row'
        : 'border-teal col-span-1 flex-col border',
    ),
    tileImgWrap: cn(
      'rounded-b-panel w-full overflow-hidden',
      isHero && 'md:rounded-r-panel md:w-1/2 md:shrink-0 md:rounded-bl-none',
    ),
    tileImg: cn(
      'bg-surface-2 aspect-3/2 w-full object-cover',
      'ease-[cubic-bezier(0.34, 1.56, 0.64, 1)] transition-transform duration-500 will-change-transform',
      'group-hover:scale-110',
      isActive && 'scale-110',
      // isHeroの横並び時はアスペクト比固定をやめ、カード高さいっぱいに伸ばす
      isHero && 'md:aspect-auto md:h-full md:min-h-60',
    ),
    tileText: cn(
      'flex w-full min-w-0 flex-col justify-center gap-2 p-4',
      isHero && 'justify-center gap-3',
    ),
    tileTitle: cn('wrap-break-word font-body line-clamp-2 text-xl font-bold lg:text-2xl'),
    tileTitleUnderline: cn(
      'block h-0.5 w-0 transition-all duration-300 group-hover:w-full',
      isActive && 'w-full',
      isHero ? 'bg-teal' : 'bg-pink',
    ),
    tileDate: cn('text-text-sub w-full font-mono text-xs'),
    featuredBadge: cn(
      'bg-pink text-pink-strong rounded-chip max-h-content min-w-12 px-3 py-1 text-center text-xs font-bold',
    ),
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
          <h2 className={styles.tileTitle}>{blog.title}</h2>
          <span className={styles.tileTitleUnderline} />
        </div>
        <p className={styles.tileDate}>{date}</p>
        <p className="line-clamp-3 w-full">{blog.description || stripHtml(blog.content)}</p>
        <div className="flex flex-row items-start justify-between">
          <TagList tags={blog.tags} />
          {isHero && <span className={styles.featuredBadge}>注目</span>}
        </div>
        <a href={`/blogs/${blog.id}`} className={styles.tileAnchor}></a>
      </div>
    </li>
  );
};
