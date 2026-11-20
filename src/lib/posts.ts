import { getCollection, type CollectionEntry } from 'astro:content';
import { releasedQueue, stripReviewMarkers } from './queue';

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
  // Articles Barry approved on the review page whose lineup date has arrived (src/lib/queue.ts).
  // A "new" article is added; an "update" replaces the body of the post with the same slug, keeping its
  // original date and adding an "Updated" date.
  const bySlug = new Map(posts.map((p) => [p.data.slug, p]));
  for (const { item, date } of await releasedQueue()) {
    const q = item.data;
    const html = stripReviewMarkers(q.html);
    const old = bySlug.get(q.slug);
    if (q.kind === 'update' && old) {
      bySlug.set(q.slug, { ...old, data: { ...old.data, title: q.title, description: q.description, author: q.author, topics: q.topics.length ? q.topics : old.data.topics, words: q.words, updated: date, html, legacy: false } });
    } else if (!old) {
      bySlug.set(q.slug, {
        id: `queue-${q.slug}`,
        collection: 'posts',
        data: { slug: q.slug, title: q.title, description: q.description, published: date, author: q.author, topics: q.topics, tags: [], image: q.image ?? null, imageAlt: q.imageAlt, hero: q.hero, imageInline: false, words: q.words, legacy: false, html },
      } as Post);
    }
  }
  for (const p of await editorPosts()) {
    if (bySlug.has(p.data.slug)) console.warn(`[posts] src/content/blog/${p.data.slug}.md has the same web address as an existing post; skipped.`);
    else bySlug.set(p.data.slug, p);
  }
  return [...bySlug.values()].sort((a, b) => (b.data.published || '').localeCompare(a.data.published || ''));
}

// Posts written in the site editor (src/content/blog/*.md), reshaped to match the legacy post entries.
// Drafts show in `npm run dev` only, never in a build.
export async function editorPosts(includeDrafts = import.meta.env.DEV): Promise<Post[]> {
  const entries = await getCollection('blog', (e) => includeDrafts || !e.data.draft);
  return entries.map((e) => {
    const d = e.data;
    return {
      id: `blog/${e.id}`,
      collection: 'posts',
      data: {
        slug: e.id,
        title: d.title,
        description: d.description,
        published: d.published,
        updated: d.updated ?? undefined,
        author: d.author,
        topics: d.topics,
        tags: [],
        image: d.image ?? null,
        imageInline: false,
        words: (e.body ?? '').split(/\s+/).filter(Boolean).length,
        legacy: false,
        html: e.rendered?.html ?? '',
      },
    } as Post;
  });
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
