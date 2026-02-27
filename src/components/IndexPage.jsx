import BlogList from './bloglist.jsx';

export default function IndexPage({ blogs }) {
  return(
    <>
      <div>
        <h1 className="text-2xl text mb-7">aa</h1>
      </div>
      <BlogList client:load blogs={ blogs } />
    </>
  )
}
