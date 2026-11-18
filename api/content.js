// Barry's edits to an article waiting in the review lineup.
//   GET  /api/content?slug=…                       → the article as it stands on GitHub now (fresher than the last deploy)
//   POST /api/content {slug, title, description, html} → saves it; needs the X-Review-Key header
// A save commits src/content/queue/<slug>.json to main, which redeploys the site (the article itself
// still only goes live once approved and its lineup date arrives). The HTML is cleaned in _content.js.
import { readFileSync } from 'node:fs';
// Read at runtime from a static path, so Vercel bundles the file with the function (see vercel.json).
const lineup = JSON.parse(readFileSync(new URL('../src/data/lineup.json', import.meta.url), 'utf8'));
import { keyMatches, readJson, writeJson } from './_github.js';
import { applyEdit } from './_content.js';

const SLUGS = new Set(lineup.items.map((i) => i.slug));
const fileFor = (slug) => `src/content/queue/${slug}.json`;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex');
  if (!keyMatches(req.headers['x-review-key'])) return res.status(401).json({ error: 'This link has the wrong key. Ask Ollie for a new one.' });

  try {
    const slug = req.method === 'GET' ? req.query.slug : req.body?.slug;
    if (!SLUGS.has(slug)) return res.status(400).json({ error: 'Unknown article' });

    if (req.method === 'GET') {
      const { data } = await readJson(fileFor(slug));
      if (!data) return res.status(404).json({ error: 'Article not found' });
      const { title, description, html, edited } = data;
      return res.status(200).json({ article: { slug, title, description, html, edited } });
    }
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    for (let attempt = 0; attempt < 2; attempt++) {
      const { sha, data } = await readJson(fileFor(slug));
      if (!data) return res.status(404).json({ error: 'Article not found' });
      const { article, error } = applyEdit(data, req.body);
      if (error) return res.status(400).json({ error });
      const { conflict } = await writeJson(fileFor(slug), article, sha, `Studio: Barry edited ${slug}`);
      if (!conflict) {
        const { title, description, html, edited } = article;
        return res.status(200).json({ ok: true, article: { slug, title, description, html, edited } });
      }
    }
    return res.status(409).json({ error: 'Someone else saved this article at the same moment. Please reload and try again.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Couldn’t save just now. Your changes are still on screen, so please try again in a minute.' });
  }
}
