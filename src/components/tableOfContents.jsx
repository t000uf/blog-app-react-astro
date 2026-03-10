import { useState, useEffect, useCallback } from 'react';

export default function TableOfContents({ contents }) {
  const styles = {
    tableOfContents: 'w-full h-full lg:w-4/12 lg:sticky top-20',
  };

  const [toc, setToc] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

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
  }, []);

  if (toc.length === 0) return null;

  return (
    <>
      <aside className={styles.tableOfContents}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-5 w-full rounded-2xl bg-slate-100 p-4 opacity-75"
        >
          {!isOpen ? 'もくじを表示する' : 'もくじを隠す'}
        </button>
        {isOpen && (
          <div className="rounded-2xl bg-slate-100 p-4 opacity-75">
            <h3 className="text-xl">もくじ</h3>
            <ul>
              <a href="">{contents.title}</a>
              {toc.map((item, index) => (
                <li key={index} className={item.level === 'h3' ? 'ml-4' : 'ml-2'}>
                  <a href={`#${item.id}`} className="text-blue-600 hover:underline">
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
