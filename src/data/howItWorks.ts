// Condensed from the old FAQ answer "What would working with Focus be like?"
export interface Step {
  title: string;
  heading: string;
  body: string[];
}

export const steps: Step[] = [
  {
    title: 'Signing up',
    heading: 'It starts with a free, no-obligation meeting',
    body: [
      "Ideally the sign-up process starts with getting in touch and arranging a free, no-obligation meeting with Barry, by video call or in person. By the end of the meeting we're usually in a position to offer our services along with a quote, or to give you some advice on what to do next if working with us isn't the best way forward.",
      "If we agree a package and a fee, we'll get you set up on our secure online client portal, where you sign an agreement between us and can view important documents. We get authorised to talk to HMRC about your affairs, register you for any taxes, set up a company or a FreeAgent account, and anything else that helps get the business running.",
    ],
  },
  {
    title: 'Through the year',
    heading: 'Unlimited support, not a once-a-year visit',
    body: [
      "We offer unlimited support through the year, so we're usually in regular contact with clients for at least the first few months to clear up any initial queries. After that we might be in touch 5 to 10 times a year to talk about important legislation changes, tax planning or your accounts.",
      "We'll never be the type of accountant that does a set of accounts for you and then you don't hear from for a year. We try our best to respond to every email within one working day, and we can usually be reached on the phone during office hours for anything urgent.",
    ],
  },
  {
    title: 'Accounts and tax',
    heading: 'We like to get things done early',
    body: [
      "If you're used to scrambling around in January to get your records together, you might be in for a shock. We tend to request records within a month of your year end and usually complete accounts within a month of receiving them. With our clients using FreeAgent, we already have most of the information we need, so it's not unusual to be submitting accounts within a few weeks of the year end.",
      "Working this way means you know exactly how much tax you need to pay months before the deadline. There's less pressure, less stress, less chance of mistakes, and because we're working with recent data we can give you better advice to help your business thrive. Everything can be signed electronically in the client portal.",
    ],
  },
  {
    title: 'If you leave',
    heading: 'No contracts, so you can leave at any point',
    body: [
      "Whether you take a PAYE job, retire or simply want to switch accountants, we'll help you as much as we can, maintain our service levels and assist with the transition.",
      "If you're closing a company down or temporarily ceasing to trade, we try to offer a reduced fee so you can still take advantage of our support and advice without spending too much money while the business isn't earning.",
    ],
  },
];
