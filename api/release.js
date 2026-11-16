// Daily cron (vercel.json): on a lineup day, rebuild the site so approved articles dated today go live.
// The site is static, so a scheduled article only appears after a build that runs on or after its date.
import { createRequire } from 'node:module';
const lineup = createRequire(import.meta.url)('../src/data/lineup.json');
import { readDecisions, ukToday } from './_github.js';

export default async function handler(req, res) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.authorization !== `Bearer ${secret}`) return res.status(401).json({ error: 'Unauthorised' });

  const today = ukToday();
  const due = lineup.items.filter((i) => i.date === today).map((i) => i.slug);
  if (!due.length) return res.status(200).json({ today, released: [], note: 'Nothing scheduled today' });

  const { decisions } = await readDecisions();
  const approved = due.filter((slug) => decisions[slug]?.decision === 'yes');
  if (!approved.length) return res.status(200).json({ today, released: [], note: 'Scheduled articles not approved yet', due });

  if (!process.env.DEPLOY_HOOK_URL) return res.status(500).json({ error: 'DEPLOY_HOOK_URL is not set', approved });
  const hook = await fetch(process.env.DEPLOY_HOOK_URL, { method: 'POST' });
  return res.status(hook.ok ? 200 : 502).json({ today, released: approved, deploy: hook.status });
}
