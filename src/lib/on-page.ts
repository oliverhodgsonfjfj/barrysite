/**
 * Run `fn` for the current page, and again for every page the ClientRouter swaps in.
 *
 * Astro bundles component <script>s as modules, so they execute once per session, not once per
 * page. `astro:page-load` fires after every navigation, but on the very first load it waits for
 * window `load`, which would hold back scroll reveals until the hero photo had finished
 * downloading. So we run immediately as well, and use the <body> element (replaced on every
 * navigation) to make sure a page is only initialised once.
 */
export function onPage(fn: () => void): void {
  let initialised: HTMLElement | null = null;
  const run = () => {
    if (initialised === document.body) return;
    initialised = document.body;
    fn();
  };
  run();
  document.addEventListener('astro:page-load', run);
}
