export const AuthorCard = ({ author }) => {
  return (
    <div className="bg-surface ring-teal rounded-panel flex items-center gap-4 p-4 shadow-md ring md:p-6">
      <img
        src={author.image.url ? `${author.image.url}?w=256&fm=webp` : ''}
        alt={author.name}
        className="border-pink aspect-square w-16 shrink-0 rounded-full border-4 md:w-24"
      />
      <div className="min-w-0">
        <p className="text-lg md:text-xl">{author.name}</p>
        <p className="text-sm">{author.profile}</p>
      </div>
    </div>
  );
};
