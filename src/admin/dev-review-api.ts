// Dev-only stand-in for the Vercel function api/review.js (injected by astro.config.mjs on `astro dev`).
// Saves Studio decisions straight to src/data/review-decisions.json so the whole flow works locally.
// Any non-empty key is accepted here; the live function checks REVIEW_KEY.
import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import lineup from '../data/lineup.json';

export const prerender = false;
const FILE = path.resolve('src/data/review-decisions.json');
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
const read = async () => JSON.parse((await fs.readFile(FILE, 'utf8')) || '{}');

export const GET: APIRoute = async ({ request }) => {
  if (!request.headers.get('x-review-key')) return json({ error: 'Missing key' }, 401);
  return json({ decisions: await read() });
};

export const POST: APIRoute = async ({ request }) => {
  if (!request.headers.get('x-review-key')) return json({ error: 'Missing key' }, 401);
  const { slug, decision, note = '' } = await request.json();
  if (!lineup.items.some((i) => i.slug === slug)) return json({ error: 'Unknown article' }, 400);
  if (!['yes', 'no', 'undo'].includes(decision)) return json({ error: 'Decision must be yes, no or undo' }, 400);
  const decisions = await read();
  if (decision === 'undo') delete decisions[slug];
  else decisions[slug] = { decision, at: new Date().toISOString(), ...(note ? { note: String(note).slice(0, 2000) } : {}) };
  await fs.writeFile(FILE, JSON.stringify(decisions, null, 2) + '\n');
  return json({ ok: true, decisions });
};
