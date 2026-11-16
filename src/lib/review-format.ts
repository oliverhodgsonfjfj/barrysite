// Formatting helpers for Focus Studio (src/pages/studio.astro).

const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(iso.slice(0, 10) + 'T12:00:00Z').toLocaleDateString('en-GB', { timeZone: 'UTC', ...opts });

export const dayShort = (iso: string) => fmt(iso, { weekday: 'short', day: 'numeric', month: 'short' });
export const dayLong = (iso: string) => fmt(iso, { weekday: 'long', day: 'numeric', month: 'long' });
export const dateShort = (iso: string) => fmt(iso, { day: 'numeric', month: 'short', year: 'numeric' });
export const monthLabel = (iso: string) => fmt(iso, { month: 'long', year: 'numeric' });
export const weekday = (iso: string) => fmt(iso, { weekday: 'short' });
export const dayNum = (iso: string) => fmt(iso, { day: 'numeric' });
export const monthShort = (iso: string) => fmt(iso, { month: 'short' });
export const readMins = (words?: number) => Math.max(1, Math.round((words || 0) / 220));

// Every figure in the text (never inside tags) gets highlighted, so Barry can check each number at a glance.
const FIGURE = new RegExp(
  [
    String.raw`£\s?\d[\d,]*(?:\.\d+)?(?:\s?(?:k|m|bn|million|billion))?`,
    String.raw`\b\d+(?:\.\d+)?\s?%`,
    String.raw`\b\d+(?:\.\d+)?p\b`,
    String.raw`\b(?:19|20)\d\d\/\d\d\b`,
    String.raw`\b\d{1,2}(?:st|nd|rd|th)?\s(?:January|February|March|April|May|June|July|August|September|October|November|December)(?:\s(?:19|20)\d\d)?\b`,
  ].join('|'),
  'g',
);

/** The same pattern, for Studio's client script (re-highlights an article after Barry edits it). */
export const FIGURE_SOURCE = FIGURE.source;

export function annotate(html: string) {
  return html
    .split(/(<[^>]+>)/)
    .map((part) => {
      if (part.startsWith('<')) return part;
      return part
        .replace(FIGURE, (m) => `<mark class="fig">${m}</mark>`)
        .replace(/\[CONFIRM:?\s*([^\]]*)\]/g, (_, note: string) => `<mark class="confirm">Please check${note ? ': ' + note.replace(/<\/?mark[^>]*>/g, '') : ''}</mark>`);
    })
    .join('');
}
