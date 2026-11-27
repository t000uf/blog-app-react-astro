import { AuthorCard } from '@/components/AuthorCard';
import { BlogList } from '@/components/BlogList';
import { Introduction } from '@/components/Introduction';
import { WaveBand } from '@/components/WaveBand';

export const IndexPage = ({ blogs, admin }) => {
  return (
    <WaveBand topSeed={5} bottomSeed={2}>
      <Introduction />
      <BlogList blogs={blogs} />
      <section className="pt-4 md:pt-6">
        <h2 className="font-brand mb-3 text-xl md:text-2xl">かんりにん</h2>
        <AuthorCard author={admin} />
      </section>
    </WaveBand>
  );
};
