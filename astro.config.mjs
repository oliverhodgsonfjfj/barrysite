import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// Focus Studio (/studio) is the content hub; the Keystatic editor at /keystatic does the editing.
// Focus site editor (Keystatic) at /keystatic. Dev only for now: the editor needs server routes, and the
// live site stays fully static until hosting is settled and an adapter is added. This mirrors
// @keystatic/astro's own integration but serves our branded shell (src/admin/editor.astro).
function focusEditor() {
  return {
    name: 'focus-editor',
    hooks: {
      'astro:config:setup': ({ command, injectRoute, updateConfig }) => {
        if (command !== 'dev') return;
        updateConfig({
          vite: {
            plugins: [{
              name: 'keystatic-config',
              resolveId(id) {
                return id === 'virtual:keystatic-config' ? this.resolve('./keystatic.config', './a') : null;
              },
            }],
            optimizeDeps: { entries: ['keystatic.config.*', 'src/admin/Editor.tsx'] },
            // Studio saves decisions to this file locally; don't reload the page every time it changes.
            server: { watch: { ignored: ['**/src/data/review-decisions.json', '**/src/content/queue/**'] } },
          },
        });
        injectRoute({ pattern: '/keystatic/[...params]', entrypoint: './src/admin/editor.astro', prerender: false });
        injectRoute({ pattern: '/api/keystatic/[...params]', entrypoint: '@keystatic/astro/internal/keystatic-api.js', prerender: false });
        // Local stand-in for the Vercel function api/review.js: saves Studio decisions to the local file.
        injectRoute({ pattern: '/api/review', entrypoint: './src/admin/dev-review-api.ts', prerender: false });
        // Local stand-in for api/content.js: saves Studio edits to src/content/queue/<slug>.json.
        injectRoute({ pattern: '/api/content', entrypoint: './src/admin/dev-content-api.ts', prerender: false });
      },
    },
  };
}

export default defineConfig({
  site: 'https://www.focusaccountancy.co.uk',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [react(), sitemap({ filter: (page) => !page.includes('/infozone/') && !/\/(review|studio)$/.test(page) }), focusEditor()],

  vite: {
    plugins: [tailwindcss()],
  },
});