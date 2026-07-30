import rss from '@astrojs/rss';
import { client } from '@/lib/microcms';

export async function GET(context) {
  const blogsResponse = await client.get({ endpoint: 'blog', queries: { limit: 100 } });

  return rss({
    title: 'にゃずろぐ',
    description: '東福なずなのブログサイトです。',
    site: context.site,
    items: blogsResponse.contents.map((blog) => ({
      title: blog.title,
      description: blog.description,
      pubDate: blog.publishedAt,
      link: `/blogs/${blog.id}/`,
    })),
  });
}
