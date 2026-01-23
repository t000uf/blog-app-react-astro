import { formatDate } from "../lib/utils";

export default function BlogList({ blogs }) {
  return (
    <ul>
      {blogs.map(blog => (
        <li key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{formatDate(blog.publishedAt)}</p>
          <p>{blog.description}</p>
          <a href={`/blogs/${blog.id}`}>Read more</a>
        </li>
      ))}
    </ul>
  );
}