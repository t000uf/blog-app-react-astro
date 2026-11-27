import { ArticleHero } from '@/components/ArticleHero';
import { ArticleBody } from '@/components/ArticleBody';
import { TableOfContents } from '@/components/TableOfContents';
import { WaveBand } from '@/components/WaveBand';

export const DetailPage = ({ blog, associateTag }) => {
  return (
    <WaveBand topSeed={5} bottomSeed={2}>
      <a
        href="/"
        className="hover:text-teal-strong mb-3 inline-block underline transition-colors duration-300"
      >
        ← ホームへ
      </a>
      <ArticleHero blog={blog} />
      <div className="flex w-full flex-col-reverse justify-between gap-4 lg:flex-row">
        <ArticleBody
          description={blog.description}
          content={blog.content}
          author={blog.author}
          products={blog.products}
          associateTag={associateTag}
        />
        <TableOfContents title={blog.title} contents={blog.content} />
      </div>
    </WaveBand>
  );
};
