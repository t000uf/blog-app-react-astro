export default function BlogList({ blogs }) {
  return (
    <ul>
      {blogs.map(blog => (
        <li key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.description}</p>
          <a href={`/blogs/${blog.id}`}>Read more</a>
        </li>
      ))}
    </ul>
  );
}