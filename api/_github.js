// Shared helpers for the review API (files starting with "_" are not deployed as their own functions).
// Decisions live in src/data/review-decisions.json on the main branch. Writing that file is a commit,
// and the commit triggers Vercel's normal production deploy.

const REPO = process.env.GITHUB_REPO || 'oliverhodgsonfjfj/barrysite';
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const FILE = 'src/data/review-decisions.json';
const API = `https://api.github.com/repos/${REPO}/contents/${FILE}`;

function headers() {
  if (!process.env.GITHUB_TOKEN) throw new Error('GITHUB_TOKEN is not set');
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'focus-content-review',
  };
}

export async function readDecisions() {
  const res = await fetch(`${API}?ref=${BRANCH}`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`GitHub read failed: ${res.status}`);
  const body = await res.json();
  return { sha: body.sha, decisions: JSON.parse(Buffer.from(body.content, 'base64').toString('utf8') || '{}') };
}

export async function writeDecisions(decisions, sha, message) {
  const content = Buffer.from(JSON.stringify(decisions, null, 2) + '\n').toString('base64');
  const res = await fetch(API, {
    method: 'PUT',
    headers: { ...headers(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, content, sha, branch: BRANCH, committer: { name: 'Focus content review', email: 'team@focusaccountancy.co.uk' } }),
  });
  if (res.status === 409 || res.status === 422) return { conflict: true };
  if (!res.ok) throw new Error(`GitHub write failed: ${res.status}`);
  return { conflict: false };
}

/** Constant-time compare so the key can't be guessed a character at a time. */
export function keyMatches(given) {
  const want = process.env.REVIEW_KEY || '';
  if (!want || typeof given !== 'string' || given.length !== want.length) return false;
  let diff = 0;
  for (let i = 0; i < want.length; i++) diff |= want.charCodeAt(i) ^ given.charCodeAt(i);
  return diff === 0;
}

export function ukToday(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}
