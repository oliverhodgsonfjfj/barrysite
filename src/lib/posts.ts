import { getCollection, type CollectionEntry } from 'astro:content';

export const TOPICS: Record<string, string> = {
  'small-business': 'Small business',
  taxes: 'Taxes',
  freeagent: 'FreeAgent',
  mtd: 'MTD',
  ir35: 'IR35',
  covid: 'Covid',
  brexit: 'Brexit',
};

// Topics whose category URL 301s to a static hub page (see vercel.json); chips link straight there.
export const TOPIC_HUBS: Record<string, string> = { mtd: '/making-tax-digital' };

export type Post = CollectionEntry<'posts'>;

// Posts folded into a static page. They are not built; vercel.json 301s each one to its page.
export const MERGED_POSTS: Record<string, string> = {
  'understanding-mtd-for-income-tax-key-dates-thresholds-and-filing-rules': '/making-tax-digital',
  'making-tax-digital-for-income-tax': '/making-tax-digital',
  'mtd-for-vat': '/making-tax-digital',
  'how-and-when-to-register-for-mtd-for-vat': '/making-tax-digital',
  'mtd-for-landlords': '/making-tax-digital',
  'changes-to-mtd': '/making-tax-digital',
  'vat-returns-only-digital-now': '/making-tax-digital',
};

export async function allPosts(): Promise<Post[]> {
  const posts = (await getCollection('posts')).filter((p) => !(p.data.slug in MERGED_POSTS));
  return posts.sort((a, b) => (b.data.published || '').localeCompare(a.data.published || ''));
}

export function fmtDate(iso?: string) {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export function readMinutes(words?: number) {
  return Math.max(1, Math.round((words || 0) / 220));
}

export type NewsItem = CollectionEntry<'news'>;
export async function allNews(): Promise<NewsItem[]> {
  const items = await getCollection('news');
  return items.sort((a, b) => (b.data.published || '').localeCompare(a.data.published || '') || b.data.id - a.data.id);
}
