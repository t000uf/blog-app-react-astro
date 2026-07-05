export const Tag = ({ name }) => (
  <span className="bg-teal-tint text-teal-strong rounded-chip max-w-24 truncate px-3 py-1 text-xs font-bold">
    {name}
  </span>
);

export const TagList = ({ tags, className = '' }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {tags.map((tag) => (
        <Tag key={tag.id} name={tag.name} />
      ))}
    </div>
  );
};
