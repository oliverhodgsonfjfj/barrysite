import type { ImageMetadata } from 'astro';
import robert from '../assets/reviews/robert-fisher.jpg';
import ian from '../assets/reviews/ian-cains.jpg';
import alan from '../assets/reviews/alan-gould.jpg';
import john from '../assets/reviews/john-wyles.jpg';
import dean from '../assets/reviews/dean-morris.jpg';
import richard from '../assets/reviews/richard-harrison.jpg';
import nick from '../assets/reviews/nicholas-hemley.jpg';
import claudia from '../assets/reviews/claudia-connelly.jpg';
import simon from '../assets/reviews/simon-cummings.jpg';

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

export const reviews: Review[] = [
  {
    name: 'Robert Fisher',
    title: 'Overwhelmingly positive',
    quote:
      "I was previously with a large Bristol based firm, but found them unresponsive, and unhelpful in assisting me with my small business. The team at Focus couldn't be better. Barry helped me resolve a number of historical issues, then set me up on FreeAgent which has made life moving forward much easier.",
    photo: robert,
  },
  {
    name: 'Dean Morris',
    title: 'At the top of their game!',
    quote:
      'Barry and his team at Focus Accountancy have been my accountants since I started my business over 10 years ago and have provided expert advice and guidance every step of the way. Whenever I have a challenge or question the response is very swift and simple to understand.',
    photo: dean,
  },
  {
    name: 'Richard Harrison',
    title: 'Nothing but praise',
    quote:
      "I'm a software contractor and they offer the type of service I like: there when you need them, but efficiently taking care of things behind the scenes when you don't. Price-competitive and run by a lovely bloke, I've nothing but praise for them.",
    photo: richard,
  },
  {
    name: 'Claudia Connelly',
    title: 'Friendly and efficient',
    quote:
      "I couldn't be happier with Barry and the team. They have provided a friendly and efficient service and getting my books on FreeAgent has transformed the way I run my business.",
    photo: claudia,
  },
  {
    name: 'Alan Gould',
    title: 'They understand my needs',
    quote:
      "As freelance specialists they understand my needs, and provide solid advice. Whenever I've had a question, my calls and emails are returned promptly, and the FreeAgent software is brilliant!",
    photo: alan,
  },
  {
    name: 'John Wyles',
    title: 'Highly recommended!',
    quote:
      'Prior to commissioning Focus my understanding of how my business accounts worked was patchy at best. Barry and the team have not only helped me gain a much clearer picture of how my business accounts stack up but they have also made a raft of suggestions that have improved my personal and tax liabilities.',
    photo: john,
  },
  {
    name: 'Ian Cains',
    title: 'Extremely helpful',
    quote:
      'Barry and the team have been extremely helpful with the management of our personal and business finances over the past year. They always offer great advice and are quick to respond to any query, no matter how small.',
    photo: ian,
  },
  {
    name: 'Nicholas Hemley',
    title: 'Clear communication',
    quote:
      'Not only are they professional, diligent and organised, but crucially for me they also communicate clearly and frequently, which is essential for timely and efficient interventions and a strong supplier-client relationship.',
    photo: nick,
  },
  {
    name: 'Simon Cummings',
    title: 'Professional and reliable',
    quote:
      'Barry offers a proactive approach to his services, and is accessible when you have questions or need assistance. Along with traditional accountancy, he also incorporates tax planning and looking at ways of simplifying record keeping.',
    photo: simon,
  },
];

export const homeReviews = reviews.slice(0, 3);
