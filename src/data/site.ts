export const site = {
  name: 'Focus Accountancy Ltd',
  shortName: 'Focus Accountancy',
  url: 'https://www.focusaccountancy.co.uk',
  phone: '0117 290 0007',
  phoneHref: 'tel:+441172900007',
  email: 'team@focusaccountancy.co.uk',
  hours: '8am to 6pm, Monday to Friday',
  portal: 'https://manager.brightsg.com/signin',
  calendly: {
    barry: 'https://calendly.com/focusaccountancy',
    barryPhone: 'https://calendly.com/focusaccountancy/telephone-appointment',
    greg: 'https://calendly.com/greg-focusaccountancy',
    maria: 'https://calendly.com/maria-focusaccountancy/30min',
    marianna: 'https://calendly.com/marianna-focusaccountancy/30min',
  },
  news: '/news',
  factsheets: 'https://news.focusaccountancy.co.uk/factsheets',
  infozone: 'https://news.focusaccountancy.co.uk/component/infozone/?view=infozone&Itemid=119',
  social: {
    facebook: 'https://www.facebook.com/FocusAccountancy',
    linkedin: 'https://www.linkedin.com/in/barry-adams-uk/',
    twitter: 'https://twitter.com/FocusBristol',
  },
  crn: '06377770',
  registeredOffice: { line1: '1 Lindsay Road', town: 'Bristol', postcode: 'BS7 9NP' },
  // Both addresses appear on the old site's contact section. Which one is the visiting office is still to be confirmed.
  offices: [
    { line1: '1 Park Road', town: 'Bristol', postcode: 'BS16 1AZ' },
    { line1: '1 Lindsay Road', town: 'Bristol', postcode: 'BS7 9NP' },
  ],
  formAction: 'https://formspree.io/f/REPLACE_ME',
  freeindex: 'https://www.freeindex.co.uk/profile(focus-accountancy-ltd)_66093.htm',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.taxapps.focusaccountancy&gl=GB',
  founded: 2007,
};

export type NavItem = { href: string; label: string; external?: boolean; children?: NavItem[] };

// Same structure as the live Wix site's menu (About us, Pricing, Reviews, Resources, Contact, FreeAgent).
export const nav: NavItem[] = [
  { href: '/about', label: 'About us', children: [
    { href: '/vacancies', label: 'Vacancies' },
    { href: '/we-care', label: 'We care' },
  ] },
  { href: '/pricing', label: 'Pricing' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/resources', label: 'Resources', children: [
    { href: '/pensions', label: 'Pensions' },
    { href: '/news', label: 'News' },
    { href: 'https://news.focusaccountancy.co.uk/factsheets', label: 'Factsheets', external: true },
    { href: 'https://news.focusaccountancy.co.uk/component/infozone/?view=infozone&Itemid=119', label: 'Infozone', external: true },
    { href: '/ir35', label: 'IR35' },
    { href: '/insurance', label: 'Insurance' },
    { href: '/taxes', label: 'Taxes' },
    { href: '/banking', label: 'Banking' },
    { href: '/legal', label: 'Legal' },
    { href: '/jargon-buster', label: 'Jargon buster' },
    { href: '/faq', label: "FAQ's" },
    { href: '/client-portal', label: 'Client Portal' },
  ] },
  { href: '/contact', label: 'Contact' },
  { href: '/freeagent', label: 'FreeAgent', children: [
    { href: '/freeagent', label: 'FreeAgent Gold Partner' },
  ] },
];
