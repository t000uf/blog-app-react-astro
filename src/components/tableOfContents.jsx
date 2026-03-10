import { useState, useEffect, useCallback } from 'react';

export default function TableOfContents({ blogId, title, contents }) {
  const [toc, setToc] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [activeId, setActiveId] = useState('');

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
    tableOfContents: 'w-full h-full lg:w-4/12 lg:sticky top-20',
  };

  return (
    <>
      <aside className={styles.tableOfContents}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-2.5 w-full rounded-2xl bg-slate-100/75 p-4 font-bold lg:mb-5"
        >
          {!isOpen ? 'もくじを表示する' : 'もくじを隠す'}
        </button>
        {isOpen && (
          <div className="rounded-2xl bg-slate-100/75 p-4">
            <h3 className="mb-2 text-lg font-bold">もくじ</h3>
            <ul>
              <a href={`/blogs/${blogId}`} className="text-xl">
                {title}
              </a>
              {toc.map((item, index) => (
                <li key={index} className={item.level === 'h3' ? 'ml-2' : 'text-lg'}>
                  <a
                    href={`#${item.id}`}
                    className={`underline transition-all duration-300 hover:text-cyan-600 ${
                      activeId === item.id ? 'translate-x-1 font-bold text-cyan-600' : ''
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </>
  );
}
