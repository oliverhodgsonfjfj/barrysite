// Shared by api/content.js (live) and src/admin/dev-content-api.ts (astro dev): validates an edit Barry
// made in Studio and applies it to a queue article (src/content/queue/<slug>.json).
// The HTML is cut down to the house tags in docs/content-queue.md, so nothing pasted in can carry
// styles, scripts or tracking into the site.
import { transformSync } from 'ultrahtml';
import sanitize from 'ultrahtml/transformers/sanitize';

const ALLOWED = ['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'br', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'blockquote'];
const DROPPED = ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'select', 'textarea', 'svg', 'math', 'template', 'noscript', 'img', 'video', 'audio', 'link', 'meta'];
const LIMITS = { title: 120, description: 320, html: 200_000 };

// Infographics and booking boxes (<figure class="ig …">, see src/styles/infographics.css) are locked in the
// editor. It sends them back as <p>[[ig:N]]</p> markers, and only figures already in the saved article can
// come back, so nothing new can be smuggled in through them. A missing marker means Barry deleted it.
const IG_BLOCK = /<figure class="ig[\s\S]*?<\/figure>/g;
const IG_MARKER = /<p>\s*\[\[ig:(\d+)\]\]\s*<\/p>|\[\[ig:(\d+)\]\]/g;

const RENAME = { b: 'strong', i: 'em', h1: 'h2', h5: 'h4', h6: 'h4' };
const BLOCKS = new Set(['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'table', 'blockquote', 'section', 'article']);

/** Renames presentational tags, strips every attribute except safe link ones, and keeps only safe links:
 *  relative paths, #anchors, http(s), mailto and tel. External links open in a new tab. */
function tidy(node) {
  if (node.type === 1) {
    if (RENAME[node.name]) node.name = RENAME[node.name];
    // A div of plain text (what Enter can leave behind) is a paragraph; a div around blocks is unwrapped.
    if (node.name === 'div' && !(node.children || []).some((c) => c.type === 1 && BLOCKS.has(c.name))) node.name = 'p';
    const href = node.name === 'a' ? (node.attributes.href || '').trim() : '';
    node.attributes = {};
    if (node.name === 'a' && /^(\/(?!\/)|#|https?:\/\/|mailto:|tel:)/i.test(href)) {
      node.attributes.href = href;
      if (/^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?focusaccountancy\.co\.uk/i.test(href)) {
        node.attributes.target = '_blank';
        node.attributes.rel = 'noopener';
      }
    }
  }
  for (const child of node.children || []) tidy(child);
  return node;
}

export function cleanHtml(html) {
  const out = transformSync(String(html), [
    tidy,
    sanitize({
      unblockElements: ALLOWED,
      dropElements: DROPPED,
      allowAttributes: { href: ['a'], target: ['a'], rel: ['a'] },
      allowComments: false,
    }),
  ]);
  return out
    .replace(/<p>(\s|&nbsp;|<br\s*\/?>)*<\/p>/g, '') // empty paragraphs left by Enter presses
    .replace(/ /g, ' ')
    .trim();
}

export function wordCount(html) {
  return String(html).replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
}

/** Returns { article } with the edit applied, or { error } in words Barry can act on. */
export function applyEdit(article, input) {
  const title = String(input.title ?? article.title).replace(/\s+/g, ' ').trim();
  const description = String(input.description ?? article.description).replace(/\s+/g, ' ').trim();
  if (!title) return { error: 'The title can’t be empty.' };
  if (title.length > LIMITS.title) return { error: `The title is too long (${title.length} characters). Please keep it under ${LIMITS.title}.` };
  if (description.length > LIMITS.description) return { error: `The Google description is too long. Please keep it under ${LIMITS.description} characters.` };
  if (String(input.html ?? '').length > LIMITS.html) return { error: 'That article is too long to save in one go.' };
  const figures = String(article.html).match(IG_BLOCK) || [];
  const html = input.html == null ? article.html
    : cleanHtml(input.html).replace(IG_MARKER, (_, a, b) => figures[Number(a ?? b)] ?? '');
  if (wordCount(html) < 50) return { error: 'The article looks almost empty. Nothing was saved, so you can undo and try again.' };
  return {
    article: { ...article, title, description, html, words: wordCount(html), edited: new Date().toISOString() },
  };
}
