import { config, collection, singleton, fields } from '@keystatic/core';

// Focus Accountancy site editor. Runs at /keystatic while `npm run dev` is running (see astro.config.mjs).
// Storage is local for now: edits write straight into this repo. Switch to GitHub (or Keystatic Cloud)
// once the hosting decision is made and the site has a server adapter.

const AUTHORS = [
  'Focus Accountancy',
  'Barry Adams',
  'Greg Park',
  'Noble George',
  'Marianna Szemes',
  'Maria Sagastume',
  'Adam Imtiaz',
  'Lauren Ovens',
  'Elli Normansell',
];

// Keep in step with TOPICS in src/lib/posts.ts.
const TOPICS = [
  { label: 'Small business', value: 'small-business' },
  { label: 'Taxes', value: 'taxes' },
  { label: 'FreeAgent', value: 'freeagent' },
  { label: 'MTD', value: 'mtd' },
  { label: 'IR35', value: 'ir35' },
];

function Mark() {
  return <img src="/favicon.png" alt="" height={26} width={26} style={{ display: 'block', borderRadius: 6 }} />;
}

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'Focus Accountancy', mark: Mark },
    navigation: {
      Content: ['blog'],
      Website: ['promotion', 'contact', 'reviews'],
    },
  },
  collections: {
    blog: collection({
      label: 'Blog posts',
      path: 'src/content/blog/*',
      slugField: 'title',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'published'],
      schema: {
        title: fields.slug({
          name: { label: 'Title', validation: { isRequired: true, length: { max: 90 } } },
          slug: {
            label: 'Web address',
            description: 'The end of the page link, e.g. /post/your-title-here. Don’t change it once the post is live.',
          },
        }),
        description: fields.text({
          label: 'Summary',
          description: 'One or two sentences. Shown in Google results and on the Resources page. Aim for under 160 characters.',
          multiline: true,
          validation: { length: { max: 200 } },
        }),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Tick to keep this post off the live site while you work on it.',
          defaultValue: true,
        }),
        published: fields.date({ label: 'Publish date', defaultValue: { kind: 'today' }, validation: { isRequired: true } }),
        updated: fields.date({ label: 'Last updated', description: 'Only set this when you make a real change to an older post.' }),
        author: fields.select({
          label: 'Author',
          options: AUTHORS.map((a) => ({ label: a, value: a })),
          defaultValue: 'Focus Accountancy',
        }),
        topics: fields.multiselect({ label: 'Topics', options: TOPICS }),
        image: fields.image({
          label: 'Cover image',
          description: 'Wide landscape photo, at least 1600px across.',
          directory: 'public/blog/posts',
          publicPath: '/blog/posts/',
        }),
        content: fields.markdoc({
          label: 'Post',
          extension: 'md',
          options: {
            heading: [2, 3, 4],
            image: { directory: 'public/blog/posts', publicPath: '/blog/posts/' },
            codeBlock: false,
            code: false,
          },
        }),
      },
    }),
    reviews: collection({
      label: 'Client reviews',
      path: 'src/content/reviews/*',
      slugField: 'name',
      format: { data: 'json' },
      columns: ['name', 'order'],
      schema: {
        name: fields.slug({ name: { label: 'Client name', validation: { isRequired: true } } }),
        title: fields.text({ label: 'Headline', description: 'A short heading, e.g. “Clear communication”.' }),
        quote: fields.text({
          label: 'Review',
          description: 'Copy the client’s words exactly. Shorten only at the end of a sentence.',
          multiline: true,
          validation: { isRequired: true },
        }),
        photo: fields.image({ label: 'Photo', description: 'Square headshot.', directory: 'src/assets/reviews', publicPath: '../../assets/reviews/' }),
        order: fields.integer({
          label: 'Order',
          description: 'Lower numbers show first. The first three appear on the home page.',
          defaultValue: 100,
        }),
      },
    }),
  },
  singletons: {
    promotion: singleton({
      label: 'Promotion bar',
      path: 'src/data/promotion',
      format: { data: 'json' },
      schema: {
        enabled: fields.checkbox({ label: 'Show on the website', defaultValue: false }),
        message: fields.text({
          label: 'Message',
          description: 'One short line, e.g. “Self Assessment deadline is 31 January. Get your return in early.”',
          validation: { length: { max: 120 } },
        }),
        linkLabel: fields.text({ label: 'Button text', defaultValue: 'Find out more' }),
        link: fields.text({ label: 'Button link', description: 'A page on the site, e.g. /making-tax-digital, or a full web address.' }),
        endDate: fields.date({ label: 'Hide after', description: 'Optional. The bar disappears after this date.' }),
      },
    }),
    contact: singleton({
      label: 'Contact details',
      path: 'src/data/contact',
      format: { data: 'json' },
      schema: {
        phone: fields.text({ label: 'Phone number', validation: { isRequired: true } }),
        email: fields.text({ label: 'Email address', validation: { isRequired: true } }),
        hours: fields.text({ label: 'Opening hours', validation: { isRequired: true } }),
      },
    }),
  },
});
