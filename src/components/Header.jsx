import '@/styles/global.css';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'ホーム', href: '/' },
  { label: 'このサイトについて', href: '/about' },
];

export const Header = ({ currentPath = '/', siteName }) => {
  const styles = {
    header: 'relative w-full pt-3 px-3 z-50',
    headerInner:
      'flex items-center justify-between m-auto w-full md:px-0 md:max-w-11/12 lg:max-w-5xl md:h-16',
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
              aria-current={currentPath === href ? 'page' : undefined}
              // 現在地は色分けせず、下線だけで示す(ホバーは薄い下線)。
              // 太字にすると文字幅が変わりページ移動でナビがずれるため、太さは変えない。
              className={cn(
                'text-text px-3 py-1.5 underline decoration-2 underline-offset-8 transition-colors',
                currentPath === href
                  ? 'decoration-text'
                  : 'hover:decoration-text/30 decoration-transparent',
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
