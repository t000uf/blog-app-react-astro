import { BlogTile } from "./blogTile";

export default function BlogList({ blogs }) {
  return (
    <main className="bg-slate-100 rounded-2xl p-5 box-border opacity-75">
      <h1 className="text-2xl text mb-7">記事一覧</h1>
      <ul className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
        {blogs.map(blog => (
          <BlogTile blog={blog} key={blog.id}/>
        ))}
      </ul>
    </main>
  );
}
