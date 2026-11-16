// Turn a reviewed markdown article (the agency's deliverable format) into a review-queue file.
// Usage: node scripts/stage-markdown-article.mjs <article.md> <slug> <author> <topics,comma> <why> [keywordTerm]
// Takes the body from the first "## " heading up to "## For Barry", drops that first heading (the post
// template prints the title), promotes ### to ##, and turns the fact-check table into review checks.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';

const [file, slug, author, topics, why, term] = process.argv.slice(2);
const md = fs.readFileSync(file, 'utf8');
const meta = (label) => (md.match(new RegExp(`^\\*\\*${label}:\\*\\*\\s*(.+)$`, 'm')) || [])[1]?.trim() ?? '';

const start = md.search(/^## /m);
const end = md.search(/^## For Barry/m);
const lines = md.slice(start, end > 0 ? end : undefined).split('\n');
const title = lines.shift().replace(/^##\s*/, '').trim();
let body = lines.join('\n')
  .replace(/^---\s*$/gm, '')
  .replace(/^###\s/gm, '## ')
  .replace(/`(\[CONFIRM[^\]]*\])`/g, '$1');
let html = micromark(body, { extensions: [gfm()], htmlExtensions: [gfmHtml()], allowDangerousHtml: false });
html = html.replace(/<a href="(https?:[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener"');

// Fact-check table rows: | Claim | Figure | Source | Status |
const checks = [];
if (end > 0) {
  for (const row of md.slice(end).split('\n')) {
    const cells = row.split('|').slice(1, -1).map((c) => c.trim());
    if (cells.length !== 4 || cells[0] === 'Claim' || /^-+$/.test(cells[0])) continue;
    const [claim, figure, source, status] = cells;
    checks.push({
      status: status.includes('CONFIRM') || status.includes('⚠') ? 'check' : 'ok',
      claim: figure && figure !== 'n/a' ? `${claim}: ${figure}` : claim,
      note: status.replace(/`/g, '').replace(/✅|⚠️/g, '').trim(),
      source,
    });
  }
}

const text = html.replace(/<[^>]+>/g, ' ');
const description = meta('Meta description');
const out = {
  slug,
  title,
  description,
  author,
  topics: topics.split(',').filter(Boolean),
  kind: 'new',
  source: 'Focus SEO team',
  sourceRef: path.basename(file),
  written: fs.statSync(file).mtime.toISOString().slice(0, 10),
  why,
  keyword: { term: term || meta('Primary keyword').split('(')[0].trim(), volume: null, note: (meta('Primary keyword').match(/\((.*)\)/) || [])[1] || '' },
  checks,
  words: text.split(/\s+/).filter(Boolean).length,
  html: html.trim(),
};
const dest = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/content/queue', `${slug}.json`);
fs.writeFileSync(dest, JSON.stringify(out, null, 2) + '\n');
console.log(`${slug}: ${out.words} words, ${checks.length} checks (${checks.filter((c) => c.status === 'check').length} to confirm)`);
