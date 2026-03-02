import { useState, useEffect } from "react";

export default function TableOfContents({ contents }) {

  const styles = {
    tableOfContents: 'bg-slate-100 rounded-2xl p-6 box-border opacity-75'
  }

  const [toc, setToc] = useState([])

  useEffect(() => {
    const parser = new DOMParser()
    const parsedHTML = parser.parseFromString(contents, 'text/html')

    const headings = Array.from(parsedHTML.querySelectorAll('h2, h3'))
    const tocData = headings.map((heading) => (
      {
        text: heading.textContent,
        id: heading.id,
        level: heading.tagName.toLowerCase(),
      }
    ))
    setToc(tocData)
  }, [])

  if (toc.length === 0) return null

  return (
    <div className={`${styles.tableOfContents} mb-5`}>
      <h3 className="text-xl">もくじ</h3>
      <ul>
        {toc.map((item, index) => (
          <li key={index} className={item.level === 'h3' ? 'ml-4' : 'ml-2'}>
            <a href={`#${item.id}`} className="text-blue-600 hover:underline">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
