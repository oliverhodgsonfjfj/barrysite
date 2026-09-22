import type { APIRoute } from 'astro';
import { allPosts } from '../lib/posts';
import { site } from '../data/site';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async () => {
  const posts = (await allPosts()).slice(0, 30);
  const items = posts
    .map(
      (p) => `<item><title>${esc(p.data.title)}</title><link>${site.url}/post/${p.data.slug}</link><guid isPermaLink="true">${site.url}/post/${p.data.slug}</guid><pubDate>${new Date(p.data.published + 'T09:00:00Z').toUTCString()}</pubDate><description>${esc(p.data.description)}</description></item>`,
    )
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(site.shortName)} articles</title><link>${site.url}/resources</link><description>Articles on tax, FreeAgent and running a small business from Focus Accountancy, Bristol.</description><language>en-gb</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
