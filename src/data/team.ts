import type { ImageMetadata } from 'astro';
import barry from '../assets/team/barry-adams.jpg';
import greg from '../assets/team/greg-park.jpg';
import noble from '../assets/team/noble-george.jpg';
import marianna from '../assets/team/marianna-szemes.jpg';
import maria from '../assets/team/maria-sagastume.jpg';
import adam from '../assets/team/adam-imtiaz.jpg';
import lauren from '../assets/team/lauren-ovens.jpg';
import elli from '../assets/team/elli-normansell.jpg';

export interface TeamMember {
  slug: string;
  name: string;
  letters?: string;
  role: string;
  email: string;
  phone?: string;
  calendly?: { video?: string; phone?: string };
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  flag: { code: string; country: string };
  photo: ImageMetadata;
  bio: string[];
}

// Names, titles, qualifications, bios and links exactly as on the old About page.
export const team: TeamMember[] = [
  {
    slug: 'barry-adams',
    name: 'Barry Adams',
    letters: 'FCCA',
    role: 'Managing Director',
    email: 'barry@focusaccountancy.co.uk',
    calendly: { video: 'https://calendly.com/focusaccountancy', phone: 'https://calendly.com/focusaccountancy/telephone-appointment' },
    linkedin: 'https://www.linkedin.com/in/barry-adams-uk/',
    facebook: 'https://www.facebook.com/FocusAccountancy',
    twitter: 'https://twitter.com/FocusBristol',
    flag: { code: 'gb', country: 'United Kingdom' },
    photo: barry,
    bio: [
      'Barry studied at the University of Plymouth where he spent four years completing an HND in Business and Finance and a degree in Accounting and Finance. After completing his degree, in 1992, he moved to Bristol to work in practice. Since then Barry has worked in practices in Bristol and Somerset.',
      'Whilst working, Barry completed the exams for The Association of Chartered Certified Accountants (1997). He went on to set up Focus Accountancy Ltd in 2007.',
      'In his spare time he enjoys cycling, walking, reading and spending time with his family. The Adams family now has two lovely children, bringing entirely different challenges to those of the accounting world!',
    ],
  },
  {
    slug: 'greg-park',
    name: 'Greg Park',
    letters: 'ACCA',
    role: 'Senior Client Manager',
    email: 'greg@focusaccountancy.co.uk',
    phone: '0117 290 0425',
    calendly: { video: 'https://calendly.com/greg-focusaccountancy' },
    flag: { code: 'gb', country: 'United Kingdom' },
    photo: greg,
    bio: [
      'Greg started at Focus in June 2021, following a previous job as a carer, as well as working in another accountancy practice. In early 2022 he finished his studies to become a fully qualified accountant via the ACCA and was promoted to Client Manager after just 6 months.',
      'He has a regular meditation ritual and also spends time reading and practising yoga. He is drawn to modern art and the natural world.',
    ],
  },
  {
    slug: 'noble-george',
    name: 'Noble George',
    role: 'Accountant',
    email: 'team@focusaccountancy.co.uk',
    flag: { code: 'in', country: 'India' },
    photo: noble,
    bio: [
      'Noble moved to the United Kingdom after completing his MBA in Finance in India and joined a post-graduate course in International Business in 2009. After completing his masters, he started to work in a Bristol-based accountancy practice and later joined Focus Accountancy in 2015. Whilst working, Noble started studying for ACCA and achieved MAAT to support his career.',
      "He finds time for badminton, chess, cooking for charity, sea fishing and gardening. Growing organic vegetables is his passion in summer. He is a great piano player and a music teacher too. His wife is a GP trainee and a terrific Indian cook. He holds key roles with his family in kids' and youth activities in the church.",
    ],
  },
  {
    slug: 'marianna-szemes',
    name: 'Marianna Szemes',
    role: 'Payroll & VAT',
    email: 'marianna@focusaccountancy.co.uk',
    calendly: { video: 'https://calendly.com/marianna-focusaccountancy/30min' },
    linkedin: 'https://www.linkedin.com/in/marianna-szemes-phd-9b146113/',
    flag: { code: 'hu', country: 'Hungary' },
    photo: marianna,
    bio: [
      'Marianna joined Focus Accountancy after a PhD and a successful career in science, from which she brought her passion for numbers and critical thinking. She undertook training with the International Association of Bookkeepers and is currently studying towards the Association of Accounting Technicians.',
      'Marianna enjoys spending time with her family, walking and cycling. She has a black belt in aikido.',
    ],
  },
  {
    slug: 'maria-sagastume',
    name: 'Maria Sagastume',
    role: 'Client Manager',
    email: 'maria@focusaccountancy.co.uk',
    calendly: { video: 'https://calendly.com/maria-focusaccountancy/30min' },
    linkedin: 'https://www.linkedin.com/in/maria-s-aa85891a5',
    flag: { code: 'es', country: 'Spain' },
    photo: maria,
    bio: [
      'Maria came to Focus Accountancy in May 2024. She moved to the UK from Spain in 2019 to pursue a degree in Accounting and Management. After graduating with a first-class degree, she recently started working towards the ACCA qualifications. She has also successfully completed her FreeAgent training and will be able to support our clients with any related issues.',
      'Maria enjoys music and nature, so she spends her free time either hiking or at events involving any kind of music. She will also take every opportunity to explore new places by travelling to different countries.',
    ],
  },
  {
    slug: 'adam-imtiaz',
    name: 'Adam Imtiaz',
    role: 'Client Manager',
    email: 'adam@focusaccountancy.co.uk',
    linkedin: 'https://www.linkedin.com/in/adam-imtiaz-30a24a419',
    flag: { code: 'gb-wls', country: 'Wales' },
    photo: adam,
    bio: [
      "Adam joined Focus in July 2026, bringing a strong academic and professional background in accounting and finance. He holds both a Bachelor's degree from Cardiff University and a Master's in Accounting and Finance from the University of the West of England. Before joining our team, Adam gained valuable experience in accounts and tax at other accountancy practices. His professional qualifications were further solidified in early 2026 when he qualified as a Chartered Accountant through the ACCA.",
      'Outside of work, Adam is a sports enthusiast who enjoys playing football and has recently discovered a passion for padel.',
    ],
  },
  {
    slug: 'lauren-ovens',
    name: 'Lauren Ovens',
    role: 'Administration',
    email: 'lauren@focusaccountancy.co.uk',
    flag: { code: 'gb', country: 'United Kingdom' },
    photo: lauren,
    bio: [
      'Lauren has been with Focus Accountancy since the beginning of 2023 following a career as a Studio Manager. Her background is largely in the graphic design and visual effects industry, but she felt that it was time for a change of scenery and a new challenge.',
      'Lauren loves to keep busy with her 3 young children, spending time outdoors and with friends. She enjoys photography and in the summer you will often find her at the beach or in a sunny pub garden.',
    ],
  },
  {
    slug: 'elli-normansell',
    name: 'Elli Normansell',
    role: 'Graduate Trainee Accountant',
    email: 'elli@focusaccountancy.co.uk',
    linkedin: 'https://www.linkedin.com/in/elli-normansell-a37680257/',
    flag: { code: 'gb-wls', country: 'Wales' },
    photo: elli,
    bio: [
      'Elli joined Focus Accountancy in January 2026 after graduating from the University of Bristol with a degree in Accounting & Finance, having previously worked part time at Focus alongside her studies. She has successfully completed her FreeAgent training and will be able to support our clients with any related issues.',
      'Elli enjoys keeping active, going to the gym as well as exploring new places through walks. She is enthusiastic about travelling, having recently returned from 6 months travelling North and South America.',
    ],
  },
];
