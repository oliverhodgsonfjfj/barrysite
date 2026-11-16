import type { ImageMetadata } from 'astro';

// Reviews are edited in the site editor (/keystatic): one JSON file per review in src/content/reviews,
// photos in src/assets/reviews/<slug>/. Photo paths are relative to the JSON file. Order comes from each file's "order" field.
const files = import.meta.glob<ReviewFile>('../content/reviews/*.json', { eager: true, import: 'default' });
const photos = import.meta.glob<ImageMetadata>('../assets/reviews/**/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });

interface ReviewFile { name: string; title: string; quote: string; photo: string | null; order: number | null }

export interface Review {
  name: string;
  title: string; // the short headline the old site gave each review
  quote: string; // verbatim from the old Reviews page, shortened only at sentence boundaries
  photo?: ImageMetadata;
}

export const leadQuote = {
  quote: 'Helpful, knowledgeable team that make time to provide jargon-free planning and advice.',
  name: 'Christian',
};

export const reviews: Review[] = Object.values(files)
  .sort((a, b) => (a.order ?? 100) - (b.order ?? 100) || a.name.localeCompare(b.name))
  .map((r) => ({
    name: r.name,
    title: r.title,
    quote: r.quote,
    photo: r.photo ? photos[r.photo.replace(/^\.\.\/\.\.\//, '../')] : undefined,
  }));

export const homeReviews = reviews.slice(0, 3);
