export const AuthorCard = ({ author }) => {
  return (
    <div className="bg-surface ring-teal rounded-panel relative flex flex-row overflow-hidden p-6 shadow-md ring">
      <img
        src={author.image.url ? `${author.image.url}?w=256&fm=webp` : ''}
        alt={author.name}
        className="w-30 border-pink absolute -left-4 -top-1 aspect-square rounded-full border-4"
      />
      <div className="ml-25">
        <p className="text-xl">{author.name}</p>
        <p>{author.profile}</p>
      </div>
    </div>
  );
};
