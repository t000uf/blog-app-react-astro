export const AuthorCard = ({ author }) => {
  return (
    <div className="ml-13 mr-13 bg-linear-to-b relative flex flex-row overflow-hidden rounded-xl from-sky-100 to-sky-50 p-6 shadow-[0_8px_20px_rgba(0,0,0,0.06)] ring-1 ring-sky-200/60">
      <img
        src={author.image.url ? `${author.image.url}?w=256&fm=webp` : ''}
        alt={author.name}
        className="w-30 absolute -left-4 -top-1 aspect-square rounded-full border-4 border-slate-100"
      />
      <div className="ml-25">
        <p className="text-xl">{author.name}</p>
        <p>{author.profile}</p>
      </div>
    </div>
  );
};
