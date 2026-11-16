// Dev-only stand-in for the Vercel function api/content.js (injected by astro.config.mjs on `astro dev`).
// Saves Studio edits straight to src/content/queue/<slug>.json, through the same cleaning as the live
// function, so the editor can be tried locally. Any non-empty key is accepted here.
import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import lineup from '../data/lineup.json';
// @ts-expect-error plain JS module shared with the Vercel function
import { applyEdit } from '../../api/_content.js';

export const prerender = false;
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
const fileFor = (slug: string) => path.resolve('src/content/queue', `${slug}.json`);
const known = (slug: unknown): slug is string => typeof slug === 'string' && lineup.items.some((i) => i.slug === slug);
const pick = (slug: string, a: any) => ({ slug, title: a.title, description: a.description, html: a.html, edited: a.edited });

export const GET: APIRoute = async ({ request, url }) => {
  if (!request.headers.get('x-review-key')) return json({ error: 'Missing key' }, 401);
  const slug = url.searchParams.get('slug');
  if (!known(slug)) return json({ error: 'Unknown article' }, 400);
  return json({ article: pick(slug, JSON.parse(await fs.readFile(fileFor(slug), 'utf8'))) });
};

export const POST: APIRoute = async ({ request }) => {
  if (!request.headers.get('x-review-key')) return json({ error: 'Missing key' }, 401);
  const body = await request.json();
  if (!known(body.slug)) return json({ error: 'Unknown article' }, 400);
  const current = JSON.parse(await fs.readFile(fileFor(body.slug), 'utf8'));
  const { article, error } = applyEdit(current, body);
  if (error) return json({ error }, 400);
  await fs.writeFile(fileFor(body.slug), JSON.stringify(article, null, 2) + '\n');
  return json({ ok: true, article: pick(body.slug, article) });
};
