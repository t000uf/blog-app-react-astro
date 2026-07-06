import { useState, useEffect, useRef } from 'react';

export const TableOfContents = ({ blogId, title, contents }) => {
  const [toc, setToc] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [height, setHeight] = useState('auto'); // 数値(px)なら開閉アニメーション中、'auto'なら静止状態
  const [activeId, setActiveId] = useState('');
  const contentRef = useRef(null);

  useEffect(() => {
    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(contents, 'text/html');

    const headings = Array.from(parsedHTML.querySelectorAll('h2, h3'));
    const tocData = headings.map((heading) => ({
      text: heading.textContent,
      id: heading.id,
      level: heading.tagName.toLowerCase(),
    }));
    setToc(tocData);

    if (tocData.length === 0) return;

    // highlight
    setActiveId(tocData[0].id);
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

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [contents]);

  if (toc.length === 0) return null;

  const styles = {
    tableOfContents: 'w-full h-full lg:w-4/12 lg:sticky lg:top-10',
  };

  const toggle = () => {
    const node = contentRef.current;
    if (!node) return;

    if (isOpen) {
      // 開いている→閉じる: 現在の実測pxを一度セットしてから次フレームで0にし、transitionを発火させる
      setHeight(node.scrollHeight);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setHeight(0));
      });
    } else {
      // 閉じている→開く: 0 → 実測した高さへtransition
      setHeight(node.scrollHeight);
    }
    setIsOpen((prev) => !prev);
  };

  const handleTransitionEnd = (e) => {
    if (e.propertyName !== 'height') return;
    // 開き切った時だけautoに戻す。影のクリップもここで解除される
    if (isOpen) setHeight('auto');
  };

  return (
    <>
      <aside className={styles.tableOfContents}>
        <button
          onClick={toggle}
          aria-expanded={isOpen}
          className="bg-surface rounded-panel w-full p-4 font-bold shadow-lg lg:hidden"
        >
          {!isOpen ? 'もくじを表示する' : 'もくじを隠す'}
        </button>
        <div
          onTransitionEnd={handleTransitionEnd}
          style={{ height: height === 'auto' ? 'auto' : `${height}px` }}
          className={`transition-[height,margin-top] duration-300 ease-in-out ${
            isOpen ? 'mt-4 lg:mt-0' : 'mt-0'
          } ${height === 'auto' ? '' : 'overflow-hidden'}`}
        >
          <div ref={contentRef}>
            <div className="bg-surface rounded-panel p-4 shadow-lg">
              <h3 className="mb-2 text-xl font-bold">もくじ</h3>
              <ul>
                <a href={`/blogs/${blogId}`} className="mb-2 text-xl font-bold">
                  {title}
                </a>
                {toc.map((item, index) => {
                  const isActive = activeId === item.id;
                  const activeColor = item.level === 'h2' ? 'text-teal-strong' : 'text-pink-strong';
                  return (
                    <li key={index} className={item.level === 'h3' ? 'ml-4' : 'text-lg'}>
                      <a
                        href={`#${item.id}`}
                        className={`hover:text-teal-strong underline transition-all duration-300 ${
                          isActive ? `${activeColor} translate-x-1 font-bold` : ''
                        }`}
                      >
                        {isActive && <span aria-hidden="true">● </span>}
                        {item.text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
