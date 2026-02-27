import "../styles/global.css";
import { formatDate } from '../lib/utils';

export const BlogTile = ({ blog }) => {
  const date = formatDate(blog.publishedAt) 
  const imageUrl = blog.thumbnail?.url 
  ? `${blog.thumbnail.url}?w=800&fm=webp` 
  : "";
  return (
      <div className="tile relative bg-sub-pink rounded-2xl opacity-80 shadow-md transition duration-300 hover:opacity-100">
        <div className="w-full rounded-2xl overflow-hidden">
          <img src={imageUrl} alt="" loading="lazy" decoding="async" className="w-full aspect-3/2 bg-blue-400 object-cover" />
        </div>
        <div className="w-full p-5">
          <h2 className="mb-1 text-2xl wrap-break-word line-clamp-1">{blog.title}</h2>
          <p className="text-xs mb-3 w-full">{date}</p>
          <p className="line-clamp-3">{blog.description}</p>
          <a href={`/blogs/${blog.id}`} className=" absolute top-0 left-0 size-full text-sm"></a>
        </div>
      </div>
  );
};
