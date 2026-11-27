import { cn } from '@/lib/utils';

// 背景・角丸を持たない「#付きテキスト」のタグ。
// 色を変えたい場所(例: 画像上のスクリム)では className で上書きする。
export const Tag = ({ name, className = '' }) => (
  <span className={cn('text-teal-strong max-w-32 truncate text-xs', className)}>#{name}</span>
);

export const TagList = ({ tags, className = '', tagClassName = '' }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={cn('flex min-w-0 flex-wrap gap-x-3 gap-y-1', className)}>
      {tags.map((tag) => (
        <Tag key={tag.id} name={tag.name} className={tagClassName} />
      ))}
    </div>
  );
};
