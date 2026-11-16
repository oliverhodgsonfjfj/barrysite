# Content queue: how Barry reviews and publishes articles

Articles waiting for Barry live in `src/content/queue/<slug>.json`. Barry opens the private review page,
reads each one and presses **Yes** or **No**. A Yes is saved to `src/data/review-decisions.json` in GitHub
by `api/review.js`, which triggers a Vercel deploy. On that deploy the article goes live on its lineup date
(or straight away if the date has passed). A daily cron (`api/release.js`) redeploys on lineup days so
scheduled articles appear without anyone touching anything.

## Links and editing

- **Links for Barry:** `https://www.focusaccountancy.co.uk/studio#k=<REVIEW_KEY>&go=review/<slug>` signs him in
  and opens that article; `go=edit/<slug>` opens it straight in the editor. The key is stored in his browser
  and removed from the address bar, so after the first link plain `/studio#/review/<slug>` works. The
  **Copy link** button on each article builds the signed-in link.
- **Editing:** "Edit this article" lets Barry change the title, the Google description and the body (headings,
  bold, italic, lists, links). Saving posts to `/api/content` (`api/content.js`), which cleans the HTML to
  the allowed tags below (`api/_content.js`) and commits `src/content/queue/<slug>.json` to `main`. The site
  redeploys in a minute or two; until then Studio shows the saved version from his browser. Pasted text
  comes in as plain text. Deleting a `[CONFIRM …]` marker in the editor is how he signs a figure off.
- Live posts (`src/content/posts`) aren't editable in Studio yet.

## Queue file format

```json
{
  "slug": "contractor-take-home-pay",          // becomes /post/<slug>; for kind=update, the slug of the post it replaces
  "title": "…",                                 // no "| Focus" suffix; under 70 characters ideally
  "description": "…",                           // meta description, under 160 characters
  "author": "Barry Adams",                      // one of the team names in keystatic.config / team.ts
  "topics": ["taxes"],                          // small-business | taxes | freeagent | mtd | ir35
  "kind": "new",                                // "new" or "update" (refresh of an existing /post/<slug>)
  "source": "Julio",                            // "Julio" or "Focus SEO team"
  "sourceRef": "…",                             // Julio content_item id, or the old post slug
  "written": "2026-11-13",
  "why": "One or two plain sentences Barry will read: why this piece, why now.",
  "keyword": { "term": "…", "volume": 260, "note": "Where the number came from and when. null volume if not on file. Never invent one." },
  "checks": [ { "status": "ok|fixed|check", "claim": "…", "note": "…", "source": "https://www.gov.uk/…" } ],
  "words": 1750,
  "html": "<p>…</p><h2>…</h2>…"                 // body only: no <h1>, no <html>/<body>, no inline styles or scripts
}
```

The schedule is `src/data/lineup.json` (slug → date). Decisions are `src/data/review-decisions.json`.

## House rules for the HTML body

- UK spelling, second person ("you", "you'll"), short paragraphs, plain words. Helpful neighbour, not corporate.
  Match the brand voice in `~/clients/focus-accountancy/CLAUDE.md`.
- Allowed tags: p, h2, h3, h4, ul, ol, li, strong, em, a, table, thead, tbody, tr, th, td, blockquote.
- Open with a direct answer to the question in the title (two or three sentences), so AI answers can quote it.
- End with a short "Questions people ask" section (h2 + h3 questions + p answers), then one closing paragraph
  that invites a free meeting via `<a href="/book-a-meeting">book a free meeting</a>`.
- Internal links: relative paths to pages that exist (`ls src/pages`, `ls src/content/posts`). Useful ones:
  /contractor-accountants, /it-contractor-accountants, /sole-trader-accountants, /freelancer-accountants,
  /landlord-accountants, /making-tax-digital, /freeagent, /pricing, /ir35, /book-a-meeting, /contact.
- External links: gov.uk first. Add `target="_blank" rel="noopener"`.

## Facts Barry has set (never contradict)

- Focus can't link a client's bank account to FreeAgent. Say "we show you how to connect your bank feed".
- Never link to a single person's Calendly. Meetings go through /book-a-meeting (Barry, Greg or Maria).
- MTD review meetings are with Maria.
- Fees: only quote figures from `src/data/pricing.ts`. Don't invent prices.
- Never invent or reword client reviews.

## Tax figures

Never publish an invented UK tax figure. Every rate, threshold, allowance or deadline must be checked against
gov.uk (or HMRC / HM Treasury documents) as of the date written. The Autumn Budget was delivered on
28 October 2026; `~/clients/focus-accountancy/deliverables/autumn-budget-2026/autumn-budget-2026-article.md`
has a checked fact table (dividend rates, mileage 55p/25p→35p from April 2027, trading allowance, BADR etc).
If a figure can't be verified, keep it but put `[CONFIRM: what to check]` straight after it and add a
`checks` entry with status `check`. The review page highlights these; the live build strips the tags,
so Barry's Yes is his confirmation.
