import { useState, useEffect } from 'react';

export const TableOfContents = ({ blogId, title, contents }) => {
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
          className="bg-surface rounded-panel w-full p-4 font-bold shadow-lg"
        >
          {!isOpen ? 'もくじを表示する' : 'もくじを隠す'}
        </button>
        {isOpen && (
          <div className="bg-surface rounded-panel mt-4 p-4 shadow-lg">
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
        )}
      </aside>
    </>
  );
};
