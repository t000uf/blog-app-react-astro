import '../styles/global.css';

export default function Header() {
  const styles = {
    header: 'fixed bg-main-blue w-full p-3 z-50',
    headerInner: 'm-auto max-w-10/12 lg:max-w-5xl',
    headerText: 'text-3xl color-text-main font-(family-name:--font-title)',
  };

  return (
    <header class={styles.header}>
      <div class={styles.headerInner}>
        <a href="/" class="">
          <h1 class={styles.headerText}>〇〇ぶろぐ</h1>
        </a>
      </div>
    </header>
  );
}
