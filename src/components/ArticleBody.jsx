import { useEffect, useMemo, useRef } from 'react';
import { AmazonCard } from '@/components/AmazonCard';
import { AuthorCard } from '@/components/AuthorCard';
import { resizeMicrocmsImages, splitAmazonShortcodes } from '@/lib/utils';

const headingClass = 'font-heading mb-4 text-lg font-bold text-text-sub md:text-xl';

const proseClass = 'prose max-w-none wrap-break-word';

// クリップボードへコピーする。Clipboard APIはセキュアコンテキスト(https/localhost)限定のため、
// LAN越しのhttpなどで使えないときは旧来のexecCommandにフォールバックする。
const copyToClipboard = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // 画面外に一時的なtextareaを置いて選択→コピー
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, text.length); // iOS Safari向け
  try {
    if (!document.execCommand('copy')) throw new Error('execCommand copy failed');
  } finally {
    document.body.removeChild(textarea);
  }
};

export const ArticleBody = ({ description, content, author, products, associateTag }) => {
  // dangerouslySetInnerHTMLで挿入したコードブロックのコピーボタンを動かす。
  // ボタンHTML自体はビルド時(highlight.ts)に埋め込み済みなので、ここではクリック処理だけを担う。
  const bodyRef = useRef(null);

  // 本文を {{amazon:ASIN}} で区切り、間に商品カードを差し込むためのセグメント配列を作る。
  // 画像リサイズは分割前に全体へ一度かける（ショートコードはimgに影響しないため順序は安全）。
  const segments = useMemo(() => splitAmazonShortcodes(resizeMicrocmsImages(content)), [content]);
  // ショートコードのASINから商品を引くための索引。products未設定でも空Mapで安全に動く。
  const productByAsin = useMemo(() => {
    const map = new Map();
    (products ?? []).forEach((product) => map.set(product.asin, product));
    return map;
  }, [products]);

  // products に無いASINを本文に書くとカードが黙って消えるだけで執筆者が気づけない。
  // 開発時のみタイプミスを警告する（本番バンドルではこのブロックごと落ちる）。
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    segments.forEach((segment) => {
      if (segment.type === 'product' && !productByAsin.has(segment.asin)) {
        console.warn(`[AmazonCard] ASIN "${segment.asin}" が products に見つかりません`);
      }
    });
  }, [segments, productByAsin]);

  useEffect(() => {
    const root = bodyRef.current;
    if (!root) return;

    let timer;
    // ボタンは複数あるので個別に登録せず、親で1回だけ拾う(イベント委譲)
    const handleClick = async (e) => {
      const button = e.target.closest('.copy-button');
      if (!button || !root.contains(button)) return;

      const code = button.parentElement.querySelector('pre')?.textContent ?? '';
      try {
        await copyToClipboard(code);
        button.textContent = '✓ コピーしました';
        button.classList.add('is-copied');
      } catch {
        button.textContent = '✕ コピー失敗';
        button.classList.add('is-failed');
      }
      // 数秒後に元の表示へ戻す
      clearTimeout(timer);
      timer = setTimeout(() => {
        button.textContent = 'コピー';
        button.classList.remove('is-copied', 'is-failed');
      }, 1500);
    };

    root.addEventListener('click', handleClick);
    // アンマウント/内容変化時にリスナーとタイマーを後始末する
    return () => {
      root.removeEventListener('click', handleClick);
      clearTimeout(timer);
    };
  }, [content]);

  return (
    <article className="bg-surface rounded-panel lg:max-w-8/12 box-border w-full min-w-0 p-4 shadow-lg md:p-6">
      {description && (
        <>
          <h2 className={headingClass}>概要</h2>
          <p className="text-text mb-4 leading-relaxed">{description}</p>
        </>
      )}
      <h2 className={headingClass}>本文</h2>
      {/* bodyRefでセグメント全体を覆い、コードブロックのコピーボタン委譲を従来どおり効かせる */}
      <div ref={bodyRef}>
        {segments.map((segment, i) =>
          segment.type === 'html' ? (
            <div
              key={i}
              className={proseClass}
              dangerouslySetInnerHTML={{ __html: segment.html }}
            />
          ) : (
            // 該当商品が無いときは余白だけの空divを残さないよう、ラッパーごと描画しない
            productByAsin.has(segment.asin) && (
              <div key={i} className="my-6">
                <AmazonCard product={productByAsin.get(segment.asin)} associateTag={associateTag} />
              </div>
            )
          ),
        )}
      </div>
      {author && (
        <div className="mt-4">
          <h2 className={headingClass}>書いたひと</h2>
          <AuthorCard author={author} />
        </div>
      )}
      {products?.length > 0 && (
        <div className="mt-4">
          <h2 className={headingClass}>紹介したもの</h2>
          <div className="flex flex-col gap-3">
            {/* 同じASINが2件登録されてもkeyが衝突しないよう位置を混ぜる */}
            {products.map((product, i) => (
              <AmazonCard
                key={`${product.asin}-${i}`}
                product={product}
                associateTag={associateTag}
              />
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
