export const AuthorCard = ({ author }) => {
  return (
    <div className="bg-surface border-teal rounded-panel relative flex items-center overflow-hidden border p-4 pl-32 shadow-md md:p-6 md:pl-40">
      <img
        src={author.image.url ? `${author.image.url}?w=256&fm=webp` : ''}
        alt={author.name}
        className="border-pink absolute left-0 top-1/2 size-28 -translate-x-1 -translate-y-1/2 rounded-full border-4 object-cover shadow-md md:size-32"
      />
      <div className="min-w-0">
        <p className="wrap-break-word text-lg md:text-xl">{author.name}</p>
        <p className="text-text-sub wrap-break-word line-clamp-2 text-sm">{author.profile}</p>
      </div>
    </div>
  );
};
