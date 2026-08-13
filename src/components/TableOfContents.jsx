import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

// 記事タイトル(ArticleHeroのh1)のid。タイトルもハイライト対象にするため観測する
const TITLE_ID = 'article-title';

// スクロール開始からモバイル目次を閉じるまでの待ち時間(ms)
const CLOSE_DELAY_ON_SCROLL = 300;

/**
 * 記事HTMLからh2/h3を抜き出し、スクロールに応じて現在地(activeId)を返す。
 * モバイル/PCの両ビューで共有するので、IntersectionObserverはここ1本だけ。
 */
const useTocHeadings = (contents) => {
  const [toc, setToc] = useState([]);
  const [activeId, setActiveId] = useState(TITLE_ID);

  useEffect(() => {
    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(contents, 'text/html');

    const headings = Array.from(parsedHTML.querySelectorAll('h2, h3'));
    // h3には直前のh2をparentIdとして持たせる。h3にいる間、親のh2もハイライトするために使う
    let currentH2Id = null;
    const tocData = headings.map((heading) => {
      const level = heading.tagName.toLowerCase();
      if (level === 'h2') currentH2Id = heading.id;
      return {
        text: heading.textContent,
        id: heading.id,
        level,
        parentId: level === 'h3' ? currentH2Id : null,
      };
    });
    setToc(tocData);

    if (tocData.length === 0) return;

    // highlight
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        // 判定の「遊び」を設定
        // 画面上部から「-100px」の位置から、下から「-70%」の位置までを判定エリアに
        rootMargin: '-100px 0px -70% 0px',
      },
    );

    // 記事タイトルも観測対象に加える。最初のh2より上にいる間はタイトルがハイライトされる
    [TITLE_ID, ...tocData.map((item) => item.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [contents]);

  return { toc, activeId };
};

/** 目次リストの見た目。モバイルの展開パネルとPCのサイドバーで共有する */
const TocList = ({ title, toc, activeId, onSelect }) => {
  // 現在いるセクション(h2)のid。h3にいるときはその親h2、h2にいるときは自分自身
  const activeSectionId = toc.find((item) => item.id === activeId)?.parentId ?? activeId;

  return (
    <div className="p-2">
      <h3 className="text-text-sub mb-1 text-lg font-bold md:mb-2 md:text-xl">もくじ</h3>
      <a
        href={`#${TITLE_ID}`}
        onClick={onSelect}
        className={cn(
          'hover:text-teal-strong mb-1 block text-lg underline transition-all duration-300 md:mb-2',
          activeId === TITLE_ID && 'text-teal-strong translate-x-1 font-bold',
        )}
      >
        {activeId === TITLE_ID && <span aria-hidden="true">● </span>}
        {title}
      </a>
      <ul className="flex flex-col gap-1">
        {toc.map((item) => {
          const isActive = activeId === item.id;
          // h3にいるとき、その親h2は「今いるセクション」として控えめにハイライトする
          const isActiveSection = !isActive && item.id === activeSectionId;
          const activeColor = item.level === 'h2' ? 'text-teal-strong' : 'text-pink-strong';
          return (
            <li
              key={item.id}
              className={
                item.level === 'h3' ? 'ml-4 text-sm md:text-base' : 'ml-2 text-base md:text-lg'
              }
            >
              <a
                href={`#${item.id}`}
                onClick={onSelect}
                className={cn(
                  'hover:text-teal-strong underline transition-all duration-300',
                  isActive && `${activeColor} translate-x-1 font-bold`,
                  isActiveSection && 'text-teal-strong font-bold',
                )}
              >
                {isActive && <span aria-hidden="true">● </span>}
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/**
 * スマホ用: 画面上部に貼り付く現在地バー。タップで目次パネルが降りてくる。
 * パネルはabsoluteなので、開閉しても本文が押し下げられない(レイアウトシフトなし)。
 */
const MobileToc = ({ title, toc, activeId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // タイトル位置(記事冒頭)にいるとき、および該当なしのフォールバックはタイトルを出す
  const currentText = toc.find((item) => item.id === activeId)?.text ?? title;

  // 開いている間だけ、Escapeキー・外側タップ・スクロール開始で閉じる
  useEffect(() => {
    if (!isOpen) return;

    let timer;
    const close = () => setIsOpen(false);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };
    const handlePointerDown = (e) => {
      if (!containerRef.current?.contains(e.target)) close();
    };
    // スクロール開始=読み始めた合図とみなして閉じる。即座に消すと指の動きに対して唐突なので少し待つ。
    // onceなので初回のスクロールだけを拾えばよく、以降のイベントは無視される
    const handleScroll = () => {
      timer = setTimeout(close, CLOSE_DELAY_ON_SCROLL);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    // パネル内(overflow-y-auto)のスクロールはwindowまで上がってこないので、目次を辿る操作では閉じない
    window.addEventListener('scroll', handleScroll, { passive: true, once: true });
    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative lg:hidden">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="toc-panel"
        className="bg-surface/60 border-teal-strong rounded-panel flex w-full items-center gap-2 border p-3 text-left shadow-lg backdrop-blur-xl"
      >
        <span className="text-text-sub shrink-0 text-xs font-bold">もくじ：</span>
        <span className="truncate font-bold">{currentText}</span>
        {/* 文字の「▾」はベースライン基準で配置され、グリフの中心とボックス中心がズレる。
            rotate-180するとその差が倍になって浮くので、中心が図形として保証されるSVGを使う */}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            'ml-auto size-5 shrink-0 transition-transform duration-300',
            isOpen && 'rotate-180',
          )}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div
        id="toc-panel"
        inert={!isOpen}
        className={cn(
          'bg-surface/60 border-pink-strong rounded-panel absolute inset-x-0 top-full mt-2 max-h-[60vh] overflow-y-auto border px-4 py-2 shadow-lg backdrop-blur-xl',
          'lg:bg-surface lg:border-none lg:backdrop-blur-none',
          // Tailwind v4のtranslate-*/scale-*は`transform`ではなく個別プロパティ(translate/scale)を
          // 出力する。transition-[...]で列挙すると足すたびに書き漏らすので、allに任せる
          'transition-all duration-200 ease-out',
          isOpen ? 'opacity-100' : 'scale-103 pointer-events-none opacity-0',
        )}
      >
        <TocList title={title} toc={toc} activeId={activeId} onSelect={() => setIsOpen(false)} />
      </div>
    </div>
  );
};

export const TableOfContents = ({ title, contents }) => {
  const { toc, activeId } = useTocHeadings(contents);

  if (toc.length === 0) return null;

  return (
    // stickyは「親の高さの分だけ」動ける。モバイルは中身がバーだけで背が低くなるため、
    // stickyはaside自身に置いて、親(DetailPageの記事全体を包むflex)を可動域にする。
    <aside className="sticky top-2 z-10 w-full lg:top-10 lg:w-4/12">
      <MobileToc title={title} toc={toc} activeId={activeId} />
      <div className="bg-surface rounded-panel sticky top-4 hidden p-4 shadow-lg lg:block">
        <TocList title={title} toc={toc} activeId={activeId} />
      </div>
    </aside>
  );
};
