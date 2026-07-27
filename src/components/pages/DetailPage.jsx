import { ArticleHero } from '@/components/ArticleHero';
import { ArticleBody } from '@/components/ArticleBody';
import { TableOfContents } from '@/components/TableOfContents';

export const DetailPage = ({ blog, associateTag }) => {
  return (
    <main>
      <a
        href="/"
        className="hover:text-teal-strong mb-3 inline-block underline transition-colors duration-300"
      >
        ← 記事一覧へ
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
        <TableOfContents blogId={blog.id} title={blog.title} contents={blog.content} />
      </div>
    </main>
  );
};
