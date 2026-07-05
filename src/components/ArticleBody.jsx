import { AuthorCard } from '@/components/AuthorCard';
import { resizeMicrocmsImages } from '@/lib/utils';

const headingClass = 'font-heading mb-4 text-lg font-bold text-text-sub md:text-xl';

const proseClass = 'prose max-w-none wrap-break-word';

export const ArticleBody = ({ description, content, author }) => {
  return (
    <article className="bg-surface rounded-panel lg:max-w-8/12 box-border min-w-0 p-4 shadow-lg md:p-6">
      {description && (
        <>
          <h2 className={headingClass}>概要</h2>
          <p className="text-text mb-4 leading-relaxed">{description}</p>
        </>
      )}
      <h2 className={headingClass}>本文</h2>
      <div className={proseClass} dangerouslySetInnerHTML={{ __html: resizeMicrocmsImages(content) }} />
      {author && (
        <div className="mt-4">
          <h2 className={headingClass}>書いたひと</h2>
          <AuthorCard author={author} />
        </div>
      )}
    </article>
  );
};
