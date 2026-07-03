import '@/styles/global.css';

export const Header = () => {
  const styles = {
    header: 'fixed bg-teal/75 w-full p-3 z-50 backdrop-blur-xs',
    headerInner: 'flex m-auto max-w-10/12 lg:max-w-5xl',
    headerText: 'w-fit text-3xl color-text-main font-(family-name:--font-title)',
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a href="/" className={styles.headerText}>
          〇〇ぶろぐ
        </a>
      </div>
    </header>
  );
};
