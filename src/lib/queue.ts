import { getCollection, type CollectionEntry } from 'astro:content';
import lineup from '../data/lineup.json';
import decisions from '../data/review-decisions.json';

export type QueueItem = CollectionEntry<'queue'>;
export type Decision = { decision: 'yes' | 'no'; at: string; note?: string };
export type LineupEntry = { item: QueueItem; date: string; decision?: Decision; live: boolean };

const DECISIONS = decisions as Record<string, Decision>;

/** Today's date in the UK, as YYYY-MM-DD. Builds run in UTC; the lineup is in UK time. */
export function ukToday(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}

/** Removes the [CONFIRM: …] review markers. Barry's yes is the confirmation. */
export function stripReviewMarkers(html: string): string {
  return html.replace(/\s*\[CONFIRM[^\]]*\]/g, '');
}

/** The whole lineup in date order, with each article's decision and whether it's live on this build. */
export async function getLineup(today = ukToday()): Promise<LineupEntry[]> {
  const items = new Map((await getCollection('queue')).map((q) => [q.data.slug, q]));
  const dates = new Map(lineup.items.map((l) => [l.slug, l.date]));
  // Queue files without a lineup slot go to the end, a week apart, so nothing silently disappears.
  let last = lineup.items.at(-1)?.date ?? today;
  for (const slug of items.keys()) {
    if (!dates.has(slug)) {
      const d = new Date(last + 'T00:00:00Z');
      d.setUTCDate(d.getUTCDate() + 7);
      last = d.toISOString().slice(0, 10);
      dates.set(slug, last);
    }
  }
  return [...items.values()]
    .map((item) => {
      const date = dates.get(item.data.slug)!;
      const decision = DECISIONS[item.data.slug];
      return { item, date, decision, live: decision?.decision === 'yes' && date <= today };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Approved articles whose date has arrived, ready to merge into the blog. */
export async function releasedQueue(today = ukToday()) {
  return (await getLineup(today)).filter((e) => e.live);
}
