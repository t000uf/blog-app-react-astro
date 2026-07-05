import '@/styles/global.css';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: '記事一覧', href: '/' },
  { label: 'このブログについて', href: '/about' },
];

export const Header = ({ currentPath = '/', siteName }) => {
  const styles = {
    header: 'w-full border-b border-teal bg-bg/75 p-3 z-50',
    headerInner:
      'flex items-center justify-between m-auto w-full px-2 md:px-0 md:max-w-11/12 lg:max-w-5xl md:h-16',
    headerText: 'w-fit text-3xl text-text font-brand',
    nav: 'hidden md:flex gap-1',
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a href="/" className={styles.headerText}>
          {siteName}
        </a>
        <nav className={styles.nav}>
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={cn(
                'rounded-chip hover:bg-bg-deep px-4 py-1.5 transition-colors',
                currentPath === href ? 'bg-pink text-pink-strong font-bold' : 'text-text',
              )}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};
