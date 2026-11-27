const FOOTER_LINKS = [
  { label: 'ホーム', href: '/' },
  { label: 'このサイトについて', href: '/about' },
];

export const Footer = ({ siteName }) => {
  const styles = {
    footer: 'relative w-full p-5 text-center z-40',
    inner: 'm-auto w-full md:max-w-10/12 lg:max-w-5xl gap-2 flex flex-col',
    title: 'text-2xl text-text font-brand',
    nav: 'flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4',
    link: 'text-sm text-text hover:text-teal-strong transition-colors',
    copyright: 'text-xs text-text-sub font-body',
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <a className={styles.title} href="/">
          {siteName}
        </a>
        <nav className={styles.nav}>
          {FOOTER_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className={styles.link}>
              {label}
            </a>
          ))}
        </nav>
        <p className={styles.copyright}>&copy; 2026 {siteName}</p>
      </div>
    </footer>
  );
};
