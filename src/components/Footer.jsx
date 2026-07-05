import '@/styles/global.css';

const FOOTER_LINKS = [
  { label: 'プロフィール', href: '#' },
  { label: '記事一覧', href: '/' },
  { label: 'お問い合わせ', href: '#' },
];

export const Footer = () => {
  const styles = {
    footer: 'w-full p-5 text-center',
    inner: 'm-auto w-full md:max-w-10/12 lg:max-w-5xl',
    title: 'text-2xl text-text font-brand',
    divider: 'my-4 border-t border-teal',
    nav: 'flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4',
    link: 'text-sm text-text hover:text-teal-strong transition-colors',
    copyright: 'text-xs text-text-sub font-mono',
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.title}>〇〇ぶろぐ</p>
        <hr className={styles.divider} />
        <nav className={styles.nav}>
          {FOOTER_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className={styles.link}>
              {label}
            </a>
          ))}
        </nav>
        <hr className={styles.divider} />
        <p className={styles.copyright}>© 2026 〇〇ぶろぐ</p>
      </div>
    </footer>
  );
};
