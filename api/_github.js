// Shared helpers for the review API (files starting with "_" are not deployed as their own functions).
// Decisions live in src/data/review-decisions.json on the main branch. Writing that file is a commit,
// and the commit triggers Vercel's normal production deploy.

const REPO = process.env.GITHUB_REPO || 'oliverhodgsonfjfj/barrysite';
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const DECISIONS = 'src/data/review-decisions.json';
const contentsUrl = (file) => `https://api.github.com/repos/${REPO}/contents/${file}`;

function headers() {
  if (!process.env.GITHUB_TOKEN) throw new Error('GITHUB_TOKEN is not set');
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'focus-content-review',
  };
}

/** Reads a JSON file from the branch. Returns its sha too, so a write can't overwrite a newer version. */
export async function readJson(file) {
  const res = await fetch(`${contentsUrl(file)}?ref=${BRANCH}`, { headers: headers(), cache: 'no-store' });
  if (res.status === 404) return { sha: undefined, data: null };
  if (!res.ok) throw new Error(`GitHub read failed: ${res.status}`);
  const body = await res.json();
  return { sha: body.sha, data: JSON.parse(Buffer.from(body.content, 'base64').toString('utf8') || 'null') };
}

/** Commits a JSON file. { conflict: true } means someone saved in between: read again and retry. */
export async function writeJson(file, data, sha, message) {
  const content = Buffer.from(JSON.stringify(data, null, 2) + '\n').toString('base64');
  const res = await fetch(contentsUrl(file), {
    method: 'PUT',
    headers: { ...headers(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, content, sha, branch: BRANCH, committer: { name: 'Focus Studio', email: 'team@focusaccountancy.co.uk' } }),
  });
  if (res.status === 409 || res.status === 422) return { conflict: true };
  if (!res.ok) throw new Error(`GitHub write failed: ${res.status}`);
  return { conflict: false };
}

export async function readDecisions() {
  const { sha, data } = await readJson(DECISIONS);
  return { sha, decisions: data || {} };
}

export async function writeDecisions(decisions, sha, message) {
  return writeJson(DECISIONS, decisions, sha, message);
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
