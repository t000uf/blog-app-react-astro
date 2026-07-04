import { cn } from '@/lib/utils';
import { AuthorCard } from '@/components/AuthorCard';

const headingClass = 'font-heading mb-4 text-xl font-bold text-text-sub';

const proseClass = cn(
  'prose max-w-none',
  '[--tw-prose-body:var(--color-text)] [--tw-prose-headings:var(--color-text)]',
  '[--tw-prose-bold:var(--color-text)] [--tw-prose-links:var(--color-teal-strong)]',
  '[--tw-prose-bullets:var(--color-teal-strong)] [--tw-prose-hr:var(--color-border)]',
  'prose-headings:font-heading',
  'prose-h2:border-teal prose-h2:mb-3 prose-h2:mt-8 prose-h2:border-b prose-h2:pb-2 prose-h2:text-lg prose-h2:font-bold',
  'prose-h3:border-pink-strong prose-h3:mb-2 prose-h3:mt-6 prose-h3:border-b prose-h3:pb-2 prose-h3:text-base prose-h3:font-bold',
  'prose-h4:mb-2 prose-h4:mt-4 prose-h4:font-bold',
  'prose-p:my-2 prose-p:leading-relaxed',
  'prose-pre:bg-surface-2 prose-pre:rounded-panel',
  'prose-code:text-teal-strong prose-code:font-mono',
);

export const ArticleBody = ({ description, content, author }) => {
  return (
    <article className="bg-surface rounded-panel lg:max-w-8/12 box-border p-6 shadow-lg">
      {description && (
        <>
          <h2 className={headingClass}>概要</h2>
          <p className="text-text mb-4 leading-relaxed">{description}</p>
        </>
      )}
      <h2 className={headingClass}>本文</h2>
      <div className={proseClass} dangerouslySetInnerHTML={{ __html: content }} />
      {author && (
        <div className="mt-4">
          <h2 className={headingClass}>書いたひと</h2>
          <AuthorCard author={author} />
        </div>
      )}
    </article>
  );
};
