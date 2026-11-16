// Barry's yes/no on the content review page.
//   GET  /api/review                        → current decisions (live from GitHub, so the page is fresh before a redeploy)
//   POST /api/review {slug, decision, note} → decision is "yes", "no" or "undo"; needs the X-Review-Key header
// A POST commits src/data/review-decisions.json to main, which redeploys the site. Approved articles
// go live on their lineup date (src/data/lineup.json), or on this deploy if the date has passed.
import { createRequire } from 'node:module';
const lineup = createRequire(import.meta.url)('../src/data/lineup.json');
import { keyMatches, readDecisions, writeDecisions } from './_github.js';

const SLUGS = new Set(lineup.items.map((i) => i.slug));

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex');
  const key = req.headers['x-review-key'];
  if (!keyMatches(key)) return res.status(401).json({ error: 'This review link has the wrong key. Ask Ollie for a new link.' });

  try {
    if (req.method === 'GET') {
      const { decisions } = await readDecisions();
      return res.status(200).json({ decisions });
    }
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { slug, decision, note = '' } = req.body || {};
    if (!SLUGS.has(slug)) return res.status(400).json({ error: 'Unknown article' });
    if (!['yes', 'no', 'undo'].includes(decision)) return res.status(400).json({ error: 'Decision must be yes, no or undo' });
    const cleanNote = String(note).slice(0, 2000);

    // Two tries in case another decision landed at the same moment (GitHub rejects a stale sha).
    for (let attempt = 0; attempt < 2; attempt++) {
      const { sha, decisions } = await readDecisions();
      if (decision === 'undo') delete decisions[slug];
      else decisions[slug] = { decision, at: new Date().toISOString(), ...(cleanNote ? { note: cleanNote } : {}) };
      const verb = decision === 'yes' ? 'approved' : decision === 'no' ? 'turned down' : 'reopened';
      const { conflict } = await writeDecisions(decisions, sha, `Content review: Barry ${verb} ${slug}`);
      if (!conflict) return res.status(200).json({ ok: true, decisions });
    }
    return res.status(409).json({ error: 'Someone else saved at the same moment. Please try again.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Couldn’t save just now. Please try again in a minute.' });
  }
}
