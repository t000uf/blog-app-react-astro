import BlogList from './bloglist.jsx';

export default function IndexPage({ blogs }) {
  return (
    <>
      <div>
        <h1 className="mb-7 text-2xl">aa</h1>
      </div>
      <BlogList client:load blogs={blogs} />
    </>
  );
}
