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

export type Post = CollectionEntry<'posts'>;

export async function allPosts(): Promise<Post[]> {
  const posts = await getCollection('posts');
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
