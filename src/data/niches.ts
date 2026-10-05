// Niche landing pages, rendered by src/components/NicheLanding.astro.
// Keyword targets per page are in ~/clients/focus-accountancy/research/niche-landing-pages-2026-10.md.
// No tax rates or thresholds are quoted here unless Barry has supplied them: these pages sell the service.
import type { ImageMetadata } from 'astro';
import type { Faq } from './faq';
import heroContractor from '../assets/heroes/contractor-accountants.jpg';
import heroIt from '../assets/heroes/it-contractor-accountants.jpg';
import heroFreelancer from '../assets/heroes/freelancer-accountants.jpg';
import heroSoleTrader from '../assets/heroes/sole-trader-accountants.jpg';
import heroLandlord from '../assets/heroes/landlord-accountants.jpg';

export interface Niche {
  slug: string;
  title: string; // <title>
  description: string; // meta description
  crumb: string;
  serviceName: string;
  audience: string;
  audienceShort: string; // "IT contractors", used in links between the niche pages
  eyebrow: string;
  h1: string;
  intro: string;
  // Full-screen photo hero, generated in Higgsfield (GPT Image 2.5 still, Kling 3.0 loop); originals in old-site/images/named/.
  hero: { image: ImageMetadata; alt: string; text: string; position?: string; video?: string };
  feeButton: string;
  proof: string[];
  why: { eyebrow: string; title: string; points: { title: string; text: string }[] };
  sections: { id: string; eyebrow: string; title: string; paras: string[]; list?: string[]; after?: string[] }[];
  plans: string[]; // plan ids from pricing.ts
  fees: { title: string; lead: string; featured: string; note: string };
  reviews: string[]; // names from reviews.ts
  reviewsTitle: string;
  faqTitle: string;
  faqLead: string;
  faqs: Faq[];
  related: { href: string; label: string }[];
  local: { title: string; text: string };
  contact: { title: string; lead: string };
}

const proofCommon = ['FreeAgent Gold Partner', 'Fixed monthly fees', 'Bristol accountants since 2007'];

export const niches: Niche[] = [
  {
    slug: 'it-contractor-accountants',
    title: 'IT Contractor Accountants in Bristol | Focus Accountancy',
    description:
      'Accountants for IT contractors with a limited company. Fixed fees from £99 a month, FreeAgent included, IR35 support and salary and dividend planning.',
    crumb: 'IT contractor accountants',
    serviceName: 'Accountancy for IT contractors',
    audience: 'IT contractors, software developers and technology consultants',
    audienceShort: 'IT contractors',
    eyebrow: 'IT contractor accountants',
    h1: 'Accountants for IT contractors',
    intro:
      "Developers, engineers, architects, testers and tech consultants working through their own limited company. We look after the accounts, the tax and the deadlines, so you can get on with the contract. Fixed monthly fees, FreeAgent included, and a Bristol team you can actually talk to.",
    hero: { image: heroIt, alt: 'A software developer working at two monitors in a converted warehouse studio overlooking Bristol harbour', text: 'Developers, engineers and tech consultants with their own limited company. Fixed monthly fees, FreeAgent included.', position: '78% 50%', video: '/video/it-contractor-accountants.mp4' },
    feeButton: 'Fees from £99 a month',
    proof: proofCommon,
    why: {
      eyebrow: 'Why IT contractors choose us',
      title: 'Contractors are at the heart of what we do',
      points: [
        {
          title: 'We know how contracting works',
          text: "Day rates, agency and end-client contracts, gaps between contracts, IR35, a home office and a laptop that is the business. You won't have to explain any of it.",
        },
        {
          title: 'Salary and dividends, planned properly',
          text: 'We work out the most tax-efficient way to pay yourself each year and review it when things change, like a new contract, a pay rise or a second income.',
        },
        {
          title: 'Everything in FreeAgent',
          text: "Raise invoices, log timesheets and snap receipts on your phone. We see the same live figures you do, so there's no year-end scramble for paperwork.",
        },
        {
          title: 'IR35 support',
          text: 'Through our partners at Kingsbridge, clients can get an independent IR35 contract review, and we help you understand what an inside or outside determination means for you.',
        },
        {
          title: 'One fixed monthly fee',
          text: 'Company accounts, corporation tax, payroll and phone and email support, all in one fee. No hourly billing for a quick question.',
        },
        {
          title: 'A real person, not a call centre',
          text: "You get a named client manager in our Bristol office. We welcome calls from clients without an appointment.",
        },
      ],
    },
    sections: [
      {
        id: 'set-up',
        eyebrow: 'Getting started',
        title: 'Setting up as an IT contractor',
        paras: [
          "Most IT contractors work through their own limited company. It keeps your business and personal finances separate, limits your liability, and gives you more control over how and when you take money out. Some contractors start through an umbrella company and move to a limited company later; either way, we'll talk you through the options before you commit.",
          'When you join us, we can:',
        ],
        list: [
          'Form your limited company and register it for corporation tax, PAYE and VAT if you need it',
          'Set up FreeAgent and connect your business bank account',
          'Put you on payroll and plan your salary and dividends from day one',
          "Take over from your current accountant, including mid-year. We'll ask them for what we need",
        ],
        after: [
          'Starting out? Read our <a href="/post/tips-for-starting-out-as-a-contractor-with-a-limited-company">tips for starting out as a contractor with a limited company</a> and <a href="/post/limited-company-vs-self-employed-vs-employed">limited company vs self-employed vs employed</a>.',
        ],
      },
      {
        id: 'ir35',
        eyebrow: 'IR35',
        title: 'Inside or outside IR35?',
        paras: [
          'IR35 decides whether HMRC treats your contract as genuine self-employment or as disguised employment. For most private and public sector contracts, the end client now makes the status decision, but it still matters to you: it changes how you are paid and how much you take home.',
          "We'll help you understand a status determination, talk through what it means for your company, and point you to an independent contract review through Kingsbridge when you need one. If a contract is inside IR35, we can look at whether it still makes sense to run it through your company or whether an umbrella suits that contract better.",
        ],
        after: ['More on the rules in our <a href="/ir35">IR35 guide</a>, and on reviews and contractor insurance on our <a href="/insurance">insurance page</a>.'],
      },
      {
        id: 'expenses',
        eyebrow: 'Expenses',
        title: 'What IT contractors can claim',
        paras: [
          "Claiming every allowable expense through your company is one of the simplest ways to keep your tax bill down, and one of the easiest places to make mistakes. We'll tell you what qualifies and what doesn't, typically including:",
        ],
        list: [
          'Laptops, monitors, phones and other equipment used for the business',
          'Software subscriptions, cloud services and hosting',
          'Training and certifications that keep your existing skills current',
          'Travel to a temporary workplace, plus accommodation and subsistence where the rules allow',
          'Use of home as an office',
          'Professional insurance, accountancy fees and business bank charges',
          'Employer pension contributions from your company',
        ],
        after: [
          'The temporary workplace rules trip up a lot of contractors on long contracts. Our guide to <a href="/post/when-is-a-workplace-temporary">when a workplace is temporary</a> explains how they work.',
        ],
      },
    ],
    plans: ['ltd-basic', 'ltd-premium', 'ltd-boost'],
    fees: {
      title: 'Fixed fees for limited company contractors',
      lead: 'If your company is VAT registered, Ltd Premium is usually the right fit: it adds VAT returns, quarterly FreeAgent reviews and salary and dividend planning. Every plan includes FreeAgent and phone and email support.',
      featured: 'ltd-premium',
      note: 'All prices are per month plus VAT. We give you a personal quote in your free meeting.',
    },
    reviews: ['Richard Harrison', 'Alan Gould', 'Simon Cummings'],
    reviewsTitle: 'What contractors say about us',
    faqTitle: 'Questions IT contractors ask us',
    faqLead: "The things that come up in nearly every first meeting with a contractor.",
    faqs: [
      {
        q: 'Do you only work with contractors in Bristol?',
        a: [{ text: "No. Our office is in Bristol, but we work with contractors all over the UK. With FreeAgent, our secure client portal and video calls, where you are makes no difference." }],
      },
      {
        q: 'Should I use a limited company or an umbrella company?',
        a: [{ text: "It depends on your contracts. A limited company usually suits contracts outside IR35 and gives you more control. An umbrella can be simpler for a contract that is inside IR35. We'll look at your contracts and talk you through both in your free meeting." }],
      },
      {
        q: 'Can you help if my contract has been assessed as inside IR35?',
        a: [{ text: 'Yes. We will explain what the determination means for you, help you decide how to run the contract, and point you to an independent contract review through Kingsbridge if you want to check or challenge it.' }],
      },
      {
        q: 'How do I pay myself from my limited company?',
        a: [{ text: 'Usually a mix of a small salary and dividends, sometimes with employer pension contributions too. The right split depends on your other income and the current tax rates, so we plan it with you at the start of each tax year and review it when things change.' }],
      },
      {
        q: 'Can I switch to you from my current accountant part way through the year?',
        a: [{ text: "Yes. Switching is straightforward and you don't have to wait for your year end. We contact your current accountant for the information we need and move your books into FreeAgent." }],
      },
      {
        q: "What's included in the monthly fee?",
        a: [
          {
            text: 'Your company accounts, corporation tax return, Confirmation Statement, payroll, your FreeAgent subscription, an annual review meeting and phone and email support. Ltd Premium adds VAT returns, up to two Self Assessment returns, quarterly reviews and salary and dividend planning.',
            link: { href: '/pricing', label: 'See the full list on our pricing page' },
          },
        ],
      },
    ],
    related: [
      { href: '/contractor-accountants', label: 'Contractor accountants: how we work with contractors in every sector' },
      { href: '/ir35', label: 'IR35 explained' },
      { href: '/post/tips-for-starting-out-as-a-contractor-with-a-limited-company', label: 'Tips for starting out as a contractor with a limited company' },
      { href: '/post/limited-company-vs-self-employed-vs-employed', label: 'Limited company vs self-employed vs employed' },
      { href: '/post/record-keeping-as-a-contractor', label: 'Record keeping as a contractor' },
      { href: '/post/when-is-a-workplace-temporary', label: 'When is a workplace temporary?' },
      { href: '/pensions', label: 'Paying into a pension through your company' },
      { href: '/banking', label: 'Business banking for contractors' },
      { href: '/freeagent', label: 'FreeAgent help and tutorials' },
    ],
    local: {
      title: 'IT contractor accountants in Bristol, and wherever you work',
      text: "Bristol has a big tech scene, and our office is right here in it. But contracts move, and so do contractors: we work with IT contractors all over the UK, with everything handled in FreeAgent, our secure client portal and over video calls.",
    },
    contact: {
      title: 'Talk to a contractor accountant',
      lead: "Tell us about your contract and we'll show you how we'd set things up and what it would cost.",
    },
  },
  {
    slug: 'contractor-accountants',
    title: 'Contractor Accountants from £99 a Month | Focus Accountancy',
    description:
      'Contractor accountants for limited company contractors in every sector. Fixed fees from £99 a month, FreeAgent included, IR35 help. Bristol-based, UK-wide.',
    crumb: 'Contractor accountants',
    serviceName: 'Accountancy for contractors',
    audience: 'Limited company contractors and consultants',
    audienceShort: 'contractors',
    eyebrow: 'Contractor accountants',
    h1: 'Accountants for contractors',
    intro:
      "Whether you're an engineer, a project manager, a consultant or an interim, if you contract through your own limited company we can look after all of it: accounts, corporation tax, payroll, VAT, your tax return and IR35. Fixed monthly fees, FreeAgent included, and a team that knows how contracting works.",
    hero: { image: heroContractor, alt: 'A contractor working on a laptop by a train window at golden hour, with the Clifton Suspension Bridge in the distance', text: 'For limited company contractors in every sector. Fixed fees from £99 a month, FreeAgent included, IR35 help when you need it.', position: '76% 50%', video: '/video/contractor-accountants.mp4' },
    feeButton: 'Fees from £99 a month',
    proof: proofCommon,
    why: {
      eyebrow: 'Why contractors choose us',
      title: 'Everything a limited company contractor needs, for one monthly fee',
      points: [
        {
          title: 'Set up properly from day one',
          text: "We can form your company, register it for the taxes it needs, open the right bank account and get FreeAgent running, so you're ready to invoice from your first week.",
        },
        {
          title: 'Paying yourself tax-efficiently',
          text: 'We plan your salary, dividends and pension contributions together each year, and look at them again when your contract, your rate or your other income changes.',
        },
        {
          title: 'IR35 help when you need it',
          text: 'We help you make sense of status determinations, and clients can get an independent IR35 contract review through our partners at Kingsbridge.',
        },
        {
          title: 'No year-end surprises',
          text: 'With your books in FreeAgent and a quarterly review on our Premium plans, you know what tax is coming and can put it aside as you go.',
        },
        {
          title: 'Between contracts, or switching',
          text: "Gaps between contracts, a move from umbrella to limited company, or a switch from another accountant: we can help with all of it.",
        },
        {
          title: 'People you can talk to',
          text: 'A named client manager, a free review meeting every year, and phone and email support included in your fee.',
        },
      ],
    },
    sections: [
      {
        id: 'who',
        eyebrow: 'Who we work with',
        title: 'Contractors in every sector',
        paras: [
          "Contractors typically provide a professional service through a one-person limited company. We work with contractors across lots of industries, including:",
        ],
        list: [
          'IT and software: developers, engineers, architects, testers, data and security specialists. <a href="/it-contractor-accountants">More for IT contractors</a>',
          'Engineering and architecture',
          'Management and medical consultants',
          'Project and programme managers, interims and change specialists',
          'Advertising, marketing and PR',
          'Contractors working inside and outside IR35',
        ],
      },
      {
        id: 'ltd-or-umbrella',
        eyebrow: 'Limited company or umbrella?',
        title: 'Choosing how to contract',
        paras: [
          "A limited company gives you the most control over how you're paid and what you can claim, and usually suits contracts outside IR35. An umbrella company can be simpler for a contract that sits inside IR35. Some contractors use both at different times.",
          "There's no one answer for everyone. In your free meeting we'll look at your contracts and your plans and tell you which we think suits you, even if that means you don't need us yet.",
        ],
        after: [
          'Read more: <a href="/post/limited-company-vs-self-employed-vs-employed">limited company vs self-employed vs employed</a> and our <a href="/ir35">IR35 guide</a>.',
        ],
      },
      {
        id: 'switching',
        eyebrow: 'Switching accountant',
        title: 'Moving to us is simple',
        paras: ["You don't need to wait for your year end. When you join us, we:"],
        list: [
          'Contact your current accountant for the records and handover information we need',
          'Move your books into FreeAgent, or tidy up the FreeAgent account you already have',
          'Check your salary and dividend set-up and your payroll',
          'Put every deadline in our system, so nothing is missed in the handover',
        ],
      },
    ],
    plans: ['ltd-basic', 'ltd-premium', 'ltd-boost'],
    fees: {
      title: 'Fixed fees for contractors',
      lead: 'If your company is VAT registered, Ltd Premium is usually the right fit: it adds VAT returns, quarterly FreeAgent reviews and salary and dividend planning. Ltd Tax Boost adds help for higher earners, rental and foreign income.',
      featured: 'ltd-premium',
      note: 'All prices are per month plus VAT. We give you a personal quote in your free meeting.',
    },
    reviews: ['Richard Harrison', 'Nicholas Hemley', 'John Wyles'],
    reviewsTitle: 'What our clients say',
    faqTitle: 'Questions contractors ask us',
    faqLead: 'Straight answers to what we hear most from contractors thinking of joining us.',
    faqs: [
      {
        q: 'Do I need a contractor accountant, or will any accountant do?',
        a: [{ text: "Any qualified accountant can prepare your company accounts. What a contractor accountant adds is knowing the things that matter to contractors: IR35, the temporary workplace rules for travel, how to pay yourself from a one-person company, and what to do between contracts. That's where most of the savings and most of the mistakes are." }],
      },
      {
        q: 'How much does a contractor accountant cost?',
        a: [{ text: 'Our limited company plans are £99, £145 and £185 a month plus VAT, depending on your turnover and what you need. FreeAgent is included in all of them, and there are no hourly charges for questions.', link: { href: '/pricing', label: 'See what each plan includes' } }],
      },
      {
        q: 'Do you work with contractors outside Bristol?',
        a: [{ text: 'Yes. We work with contractors all over the UK. Everything runs through FreeAgent, our secure client portal, email, phone and video calls, so you never need to visit the office, although you are welcome to.' }],
      },
      {
        q: 'Can you set up my limited company?',
        a: [{ text: 'Yes. We can form the company, register it for corporation tax, PAYE and VAT, set up payroll and FreeAgent, and help you choose a business bank account.' }],
      },
      {
        q: "What happens if I'm between contracts?",
        a: [{ text: "Your company carries on as normal and your fee stays the same. Talk to us before you take money out during a gap: we'll help you plan it so you're not paying more tax than you need to." }],
      },
      {
        q: 'Can you help with IR35?',
        a: [{ text: 'Yes. We help you understand what a status determination means for you and how to run the contract, and clients can get an independent IR35 contract review through Kingsbridge.', link: { href: '/ir35', label: 'Read our IR35 guide' } }],
      },
    ],
    related: [
      { href: '/it-contractor-accountants', label: 'Accountants for IT contractors' },
      { href: '/ir35', label: 'IR35 explained' },
      { href: '/post/tips-for-starting-out-as-a-contractor-with-a-limited-company', label: 'Tips for starting out as a contractor with a limited company' },
      { href: '/post/record-keeping-as-a-contractor', label: 'Record keeping as a contractor' },
      { href: '/post/when-is-a-workplace-temporary', label: 'When is a workplace temporary?' },
      { href: '/insurance', label: 'Contractor insurance and IR35 reviews' },
      { href: '/pensions', label: 'Pension contributions through your company' },
      { href: '/banking', label: 'Business banking for contractors' },
    ],
    local: {
      title: 'Contractor accountants in Bristol, working UK-wide',
      text: "We're a Bristol firm, founded here in 2007, and we're happy to meet in person. But you don't need to: we work with contractors right across the UK, online.",
    },
    contact: {
      title: 'Talk to a contractor accountant',
      lead: "Tell us about your contract and we'll show you how we'd set things up and what it would cost.",
    },
  },
  {
    slug: 'sole-trader-accountants',
    title: 'Sole Trader Accountants from £50 a Month | Focus Accountancy',
    description:
      'Accountants for sole traders and the self-employed. Fixed fees from £50 a month, FreeAgent included, tax returns and MTD submissions done for you.',
    crumb: 'Sole trader accountants',
    serviceName: 'Accountancy for sole traders and the self-employed',
    audience: 'Sole traders and self-employed individuals',
    audienceShort: 'sole traders',
    eyebrow: 'Sole trader accountants',
    h1: 'Accountants for sole traders and the self-employed',
    intro:
      "If you work for yourself, we'll take the tax return, the deadlines and Making Tax Digital off your hands, and help you keep more of what you earn. Fixed monthly fees from £50, with FreeAgent included so your records keep themselves up to date.",
    hero: { image: heroSoleTrader, alt: 'A self-employed carpenter checking his accounts on a laptop at the workbench of his Bristol workshop', text: 'Your tax return and Making Tax Digital handled, from £50 a month with FreeAgent included.', position: '72% 50%', video: '/video/sole-trader-accountants.mp4' },
    feeButton: 'Fees from £50 a month',
    proof: proofCommon,
    why: {
      eyebrow: 'Why the self-employed choose us',
      title: 'Less admin, fewer surprises, no missed deadlines',
      points: [
        {
          title: 'Your tax return, done for you',
          text: 'We prepare and file your Self Assessment return, tell you what you owe and when, and explain payments on account before they catch you out.',
        },
        {
          title: 'Making Tax Digital, handled',
          text: 'If MTD for Income Tax applies to you, our MTD plans include every quarterly update and the Final Declaration. If it does not apply yet, we will tell you when it will.',
        },
        {
          title: 'FreeAgent included',
          text: 'Bank feeds, invoicing and receipt capture on your phone. Your records stay up to date through the year, not in a shoebox in January.',
        },
        {
          title: 'Claim what you are entitled to',
          text: "We make sure you're claiming every allowable expense, and none that you shouldn't, so your tax bill is right first time.",
        },
        {
          title: 'Advice when you grow',
          text: "When it's worth registering for VAT or moving to a limited company, we'll tell you, and we can handle the move.",
        },
        {
          title: 'One fixed fee',
          text: 'A set monthly fee with phone and email support included, and an annual review meeting on Zoom.',
        },
      ],
    },
    sections: [
      {
        id: 'mtd',
        eyebrow: 'Making Tax Digital',
        title: 'Getting ready for Making Tax Digital',
        paras: [
          'From April 2026, sole traders and landlords with qualifying income over £50,000 have to keep digital records and send quarterly updates to HMRC. The threshold drops to £30,000 from April 2027 and £20,000 from April 2028, and it is based on your gross turnover, not your profit.',
          "Our Sole Trader MTD plans include the quarterly submissions, the End of Year Update and the Final Declaration, all done in FreeAgent. You keep working; we keep you compliant.",
        ],
        after: ['Dates, deadlines and penalties are on our <a href="/making-tax-digital">Making Tax Digital page</a>.'],
      },
      {
        id: 'help',
        eyebrow: 'What we do',
        title: 'What we do for sole traders',
        paras: ['Depending on your plan, we:'],
        list: [
          'Register you as self-employed with HMRC if you are just starting out',
          'Set up FreeAgent and connect your bank account',
          'Prepare and file your Self Assessment tax return',
          'Send your MTD quarterly updates and Final Declaration',
          'Review your FreeAgent records each quarter, so problems are fixed early',
          'Do your bookkeeping for you, on our bookkeeping plan',
        ],
      },
      {
        id: 'limited',
        eyebrow: 'Growing',
        title: 'Should you become a limited company?',
        paras: [
          "There comes a point where trading through a limited company can save you tax, but it brings more admin and responsibilities, and it isn't right for everyone. We'll run the numbers for you at your annual review and tell you honestly whether it's worth it.",
        ],
        after: ['Read more: <a href="/post/limited-company-vs-self-employed-vs-employed">limited company vs self-employed vs employed</a>.'],
      },
    ],
    plans: ['st-basic', 'st-mtd', 'st-book'],
    fees: {
      title: 'Fixed fees for sole traders',
      lead: "If MTD doesn't apply to you yet, the Sole Trader plan covers your tax return. Once it does, the MTD plans add the quarterly submissions, and our bookkeeping plan takes the record keeping off you too.",
      featured: 'st-mtd',
      note: 'All prices are per month plus VAT. We give you a personal quote in your free meeting.',
    },
    reviews: ['Claudia Connelly', 'Dean Morris', 'Simon Cummings'],
    reviewsTitle: 'What our clients say',
    faqTitle: 'Questions sole traders ask us',
    faqLead: 'The things self-employed people ask us most before they join.',
    faqs: [
      {
        q: 'Do I need an accountant as a sole trader?',
        a: [{ text: "Not always. Many sole traders do their own tax return. But it takes time, it's easy to miss expenses or claim ones you shouldn't, and Making Tax Digital adds quarterly updates on top. Weigh up what your time is worth against our fee, and the peace of mind of having experts there all year round." }],
      },
      {
        q: 'How much does an accountant for a sole trader cost?',
        a: [{ text: 'Our sole trader plans are £50, £75 and £125 a month plus VAT. The £50 plan covers your tax return if you are not on MTD yet; the £75 plan adds MTD submissions and quarterly reviews; the £125 plan adds bookkeeping.', link: { href: '/pricing', label: 'Compare the plans' } }],
      },
      {
        q: 'Does Making Tax Digital apply to me?',
        a: [{ text: 'It applies from April 2026 if your gross self-employment and rental income is over £50,000, from April 2027 if it is over £30,000, and from April 2028 if it is over £20,000. It is based on turnover, not profit.', link: { href: '/making-tax-digital', label: 'Read our MTD guide' } }],
      },
      {
        q: 'Can you help me register as self-employed?',
        a: [{ text: 'Yes. We can register you with HMRC, set up FreeAgent, and explain what records you need to keep from the start.' }],
      },
      {
        q: 'I also have a rental property. Can you do both?',
        a: [{ text: 'Yes. We can include your rental income in your tax return, and remember that for MTD your self-employment and rental income are added together to see whether you are over the threshold.' }],
      },
      {
        q: 'Do you only work with sole traders in Bristol?',
        a: [{ text: 'No. Our office is in Bristol, but we work with self-employed people all over the UK by phone, email, video call and through FreeAgent.' }],
      },
    ],
    related: [
      { href: '/making-tax-digital', label: 'Making Tax Digital for Income Tax' },
      { href: '/post/payments-on-account-for-self-assessment', label: 'Payments on account for Self Assessment' },
      { href: '/post/limited-company-vs-self-employed-vs-employed', label: 'Limited company vs self-employed vs employed' },
      { href: '/post/navigating-the-government-gateway', label: 'Navigating the Government Gateway' },
      { href: '/post/invoicing-guide', label: 'Invoicing guide: getting paid on time' },
      { href: '/post/smart-capture-saves-time', label: 'Smart Capture: get data from receipts automatically' },
      { href: '/taxes', label: 'Paying your taxes' },
      { href: '/freeagent', label: 'FreeAgent help and tutorials' },
    ],
    local: {
      title: 'Self-employed accountants in Bristol, and across the UK',
      text: 'We have been helping self-employed people in Bristol since 2007, and we are happy to meet you here. If you are further away, we can do everything online.',
    },
    contact: {
      title: 'Talk to us about your tax return',
      lead: "Tell us what you do and we'll tell you which plan fits, and whether MTD applies to you yet.",
    },
  },
  {
    slug: 'landlord-accountants',
    title: 'Landlord Accountants, £25 per Property | Focus Accountancy',
    description:
      'Landlord and property accountants: rental accounts, tax return and MTD submissions for £25 per property a month, FreeAgent included. Bristol, UK-wide.',
    crumb: 'Landlord accountants',
    serviceName: 'Accountancy for landlords',
    audience: 'Residential landlords and property investors',
    audienceShort: 'landlords',
    eyebrow: 'Landlord accountants',
    h1: 'Accountants for landlords',
    intro:
      "Whether you have one buy-to-let or a growing portfolio, we'll prepare your rental accounts and tax return, send your Making Tax Digital updates, and help you pay the right tax and no more. A fixed £25 per property a month, with FreeAgent included.",
    hero: { image: heroLandlord, alt: "A landlord holding keys and a folder in the bay window of an empty Bristol flat, looking out over Totterdown's colourful terraces", text: 'Rental accounts, your tax return and MTD submissions for £25 per property a month.', position: '80% 50%', video: '/video/landlord-accountants.mp4' },
    feeButton: '£25 per property a month',
    proof: proofCommon,
    why: {
      eyebrow: 'Why landlords choose us',
      title: 'Property tax, kept simple',
      points: [
        {
          title: 'A simple per-property fee',
          text: 'Rental accounts, your tax return, MTD submissions and advice, for £25 per property a month plus VAT. You know exactly what it costs as your portfolio grows.',
        },
        {
          title: 'Making Tax Digital for landlords',
          text: 'Landlords are in MTD for Income Tax too. We send your quarterly updates and Final Declaration, so you never have to log in to HMRC.',
        },
        {
          title: 'FreeAgent Rental',
          text: 'A FreeAgent Rental subscription is included, so rent, repairs, agent fees and mortgage statements are all recorded in one place.',
        },
        {
          title: 'Advice on rental income',
          text: 'What you can claim, how jointly owned property is treated, and how mortgage interest is handled. We explain it in plain English.',
        },
        {
          title: 'Selling or restructuring',
          text: 'Capital Gains Tax when you sell, and whether holding property in a company makes sense for you, are available as additional services.',
        },
        {
          title: 'Self-employed too?',
          text: 'If you also run a business, we can look after both. Remember that your rental and self-employed income count together for MTD.',
        },
      ],
    },
    sections: [
      {
        id: 'mtd',
        eyebrow: 'Making Tax Digital',
        title: 'MTD for landlords',
        paras: [
          'From April 2026, landlords with qualifying income over £50,000 must keep digital records, send quarterly updates to HMRC and file a Final Declaration. The threshold falls to £30,000 from April 2027 and £20,000 from April 2028.',
          'Qualifying income is your gross rent (and any self-employed turnover) before expenses, so a portfolio can be in MTD long before its profits look large. We will check where you stand and handle the submissions for you.',
        ],
        after: ['Full dates, deadlines and penalties are on our <a href="/making-tax-digital">Making Tax Digital page</a>.'],
      },
      {
        id: 'included',
        eyebrow: "What's included",
        title: 'What we do for landlords',
        paras: ['For £25 per property a month plus VAT, you get:'],
        list: [
          'A FreeAgent Rental subscription',
          'Your rental accounts and Self Assessment tax return',
          'Making Tax Digital submissions',
          'Advice on tax and rental income',
          'Phone and email support',
        ],
        after: ['Capital Gains Tax, extra tax returns and other work can be added. Price on application.'],
      },
      {
        id: 'growing',
        eyebrow: 'Growing a portfolio',
        title: 'Thinking about your next property?',
        paras: [
          'Before you buy, it is worth talking through how to own it: in your own name, jointly, or through a company. Each has different tax consequences now and when you sell, and the right answer depends on your income and your plans.',
        ],
        after: [
          'Read more: <a href="/post/becoming-a-buy-to-let-landlord">becoming a buy-to-let landlord</a> and <a href="/post/incorporation-relief-a-smart-move-for-business-owners">incorporation relief</a>.',
        ],
      },
    ],
    plans: ['rental', 'st-mtd'],
    fees: {
      title: 'Fixed fees for landlords',
      lead: 'Most landlords only need Rental Accounts, charged per property. If you are also self-employed, our Sole Trader MTD plan covers your business alongside it.',
      featured: 'rental',
      note: 'All prices are per month plus VAT. We give you a personal quote in your free meeting.',
    },
    reviews: ['Ian Cains', 'Robert Fisher', 'Simon Cummings'],
    reviewsTitle: 'What our clients say',
    faqTitle: 'Questions landlords ask us',
    faqLead: 'What we hear most from landlords and property investors.',
    faqs: [
      {
        q: 'How much does a landlord accountant cost?',
        a: [{ text: 'Our Rental Accounts service is £25 per property a month plus VAT. That includes FreeAgent Rental, your tax return, MTD submissions, advice on your rental income and phone and email support.' }],
      },
      {
        q: 'Does Making Tax Digital apply to landlords?',
        a: [{ text: 'Yes. MTD for Income Tax applies to landlords from April 2026 if gross rental and self-employed income is over £50,000, from April 2027 over £30,000, and from April 2028 over £20,000.', link: { href: '/making-tax-digital', label: 'Read our MTD guide' } }],
      },
      {
        q: 'Is the MTD threshold based on rent or profit?',
        a: [{ text: 'Rent. Qualifying income is your gross rental income, plus any self-employed turnover, before expenses are deducted.' }],
      },
      {
        q: 'Can you help when I sell a property?',
        a: [{ text: 'Yes. Capital Gains Tax is one of our additional services: we can work out what is due, and help you report and pay it on time.' }],
      },
      {
        q: 'Should I hold my properties in a limited company?',
        a: [{ text: "It depends on your income, your borrowing and your plans for the properties. There's no one answer for everyone, so we look at your situation before giving advice." }],
      },
      {
        q: 'Do you work with landlords outside Bristol?',
        a: [{ text: 'Yes. Wherever you or your properties are in the UK, we can look after your rental accounts online.' }],
      },
    ],
    related: [
      { href: '/making-tax-digital', label: 'Making Tax Digital for landlords' },
      { href: '/post/becoming-a-buy-to-let-landlord', label: 'Becoming a buy-to-let landlord' },
      { href: '/post/new-rules-for-property-capital-gains-tax', label: 'Capital Gains Tax on property' },
      { href: '/post/incorporation-relief-a-smart-move-for-business-owners', label: 'Incorporation relief explained' },
      { href: '/post/payments-on-account-for-self-assessment', label: 'Payments on account for Self Assessment' },
      { href: '/freeagent', label: 'FreeAgent help, including the landlords webinar' },
    ],
    local: {
      title: 'Property accountants in Bristol, for landlords anywhere',
      text: 'We are based in Bristol and many landlords like to meet in person. Whether your properties are in Bristol or elsewhere in the UK, we can do everything online.',
    },
    contact: {
      title: 'Talk to a landlord accountant',
      lead: "Tell us how many properties you have and we'll confirm your fee and whether MTD applies to you.",
    },
  },
  {
    slug: 'freelancer-accountants',
    title: 'Accountants for Freelancers | Fixed Fees | Focus Accountancy',
    description:
      'Accountants for freelancers and consultants, as a sole trader or limited company. Fixed fees from £50 a month with FreeAgent included. Bristol, UK-wide.',
    crumb: 'Freelancer accountants',
    serviceName: 'Accountancy for freelancers and consultants',
    audience: 'Freelancers and independent consultants',
    audienceShort: 'freelancers',
    eyebrow: 'Freelancer accountants',
    h1: 'Accountants for freelancers and consultants',
    intro:
      "Designers, writers, developers, marketers, coaches and consultants: if you freelance, we'll keep your tax right and your admin light, whether you work as a sole trader or through a limited company. Fixed monthly fees, FreeAgent included.",
    hero: { image: heroFreelancer, alt: 'A freelance designer drawing on a tablet at a café table on Gloucester Road, Bristol', text: 'Sole trader or limited company, we keep your tax right and your admin light. Fixed fees, FreeAgent included.', position: '76% 50%', video: '/video/freelancer-accountants.mp4' },
    feeButton: 'Fees from £50 a month',
    proof: proofCommon,
    why: {
      eyebrow: 'Why freelancers choose us',
      title: 'Built around how freelancers work',
      points: [
        {
          title: 'Sole trader or limited company',
          text: "We look after both, and we'll tell you honestly when it's worth moving from one to the other.",
        },
        {
          title: 'Invoicing and expenses in one place',
          text: 'FreeAgent is included in every plan: send invoices, chase late payers, track time on projects and snap receipts as you go.',
        },
        {
          title: 'Know what tax to put aside',
          text: 'Irregular income makes tax bills hard to predict. FreeAgent shows your running estimate and we review it with you, so January is not a shock.',
        },
        {
          title: 'Making Tax Digital covered',
          text: 'If you are a sole trader over the MTD threshold, our MTD plans include all the quarterly submissions.',
        },
        {
          title: 'Fixed fees, no clock watching',
          text: 'One monthly fee with phone and email support included. Ask us a quick question without worrying about the bill.',
        },
        {
          title: 'Small firm, real people',
          text: 'Being a small firm, we fit our service around your business rather than selling you off-the-shelf packages.',
        },
      ],
    },
    sections: [
      {
        id: 'structure',
        eyebrow: 'Getting started',
        title: 'Sole trader or limited company?',
        paras: [
          "Most freelancers start as sole traders: it's quick to set up and the admin is light. As your income grows, a limited company can become more tax-efficient and can help you win work with clients who prefer to contract with companies. It also brings more responsibilities.",
          "We'll look at your income, your clients and your plans, and tell you which suits you now and when that might change.",
        ],
        after: ['Read more: <a href="/post/limited-company-vs-self-employed-vs-employed">limited company vs self-employed vs employed</a>.'],
      },
      {
        id: 'consultants',
        eyebrow: 'Consultants',
        title: 'Independent consultants',
        paras: [
          'We work with management, marketing, HR and medical consultants. Many work through a limited company and some sit close to IR35, so we bring the same contractor know-how: salary and dividend planning, expenses, VAT and IR35 support.',
        ],
        after: ['Working on longer contracts? See our page for <a href="/contractor-accountants">contractor accountants</a>.'],
      },
      {
        id: 'admin',
        eyebrow: 'Less admin',
        title: 'Getting paid and staying organised',
        paras: ['FreeAgent, included in every plan, takes care of most of the day-to-day:'],
        list: [
          'Professional invoices, automatic reminders and online payments',
          'Bank feeds that pull in every transaction',
          'Smart Capture to read your receipts from a photo',
          'Time tracking and project profitability',
          'A live estimate of the tax you owe',
        ],
        after: ['See our <a href="/post/invoicing-guide">invoicing guide</a> and our <a href="/freeagent">FreeAgent help pages</a>.'],
      },
    ],
    plans: ['st-basic', 'st-mtd', 'ltd-basic'],
    fees: {
      title: 'Fixed fees for freelancers',
      lead: 'Sole trader plans start at £50 a month and limited company plans at £99. FreeAgent is included in all of them.',
      featured: 'st-mtd',
      note: 'All prices are per month plus VAT. Limited companies over £90K turnover or registered for VAT usually need Ltd Premium at £145.',
    },
    reviews: ['Alan Gould', 'Claudia Connelly', 'John Wyles'],
    reviewsTitle: 'What freelancers say about us',
    faqTitle: 'Questions freelancers ask us',
    faqLead: "What we're asked most by freelancers and consultants.",
    faqs: [
      {
        q: 'How much does an accountant for a freelancer cost?',
        a: [{ text: 'As a sole trader, from £50 a month plus VAT, or £75 with Making Tax Digital submissions. As a limited company, from £99 a month plus VAT. FreeAgent is included in every plan.', link: { href: '/pricing', label: 'See all our plans' } }],
      },
      {
        q: 'Should I be a sole trader or a limited company?',
        a: [{ text: "It depends on your income, your clients and how much admin you're happy with. We'll talk it through in your free meeting and can set up either for you." }],
      },
      {
        q: 'My income goes up and down. How do I know how much tax to save?',
        a: [{ text: 'FreeAgent shows a running estimate of the tax you owe as you invoice and record expenses. Our quarterly reviews (on the MTD and Premium plans) check it with you, so you can put the right amount aside.' }],
      },
      {
        q: 'Do I have to use FreeAgent?',
        a: [{ text: "We work with FreeAgent because it saves our clients time and keeps their records up to date, and it's included in every plan. If you're on other software, talk to us and we'll help you move across." }],
      },
      {
        q: 'Do you work with freelancers outside Bristol?',
        a: [{ text: 'Yes. Our office is in Bristol, but we work with freelancers all over the UK, online.' }],
      },
    ],
    related: [
      { href: '/post/limited-company-vs-self-employed-vs-employed', label: 'Limited company vs self-employed vs employed' },
      { href: '/post/invoicing-guide', label: 'Invoicing guide: getting paid on time' },
      { href: '/post/re-billing-expenses', label: 'Re-billing expenses to clients' },
      { href: '/making-tax-digital', label: 'Making Tax Digital for Income Tax' },
      { href: '/post/payments-on-account-for-self-assessment', label: 'Payments on account for Self Assessment' },
      { href: '/post/how-to-re-register-for-vat', label: 'How to re-register for VAT' },
      { href: '/banking', label: 'Business banking' },
      { href: '/freeagent', label: 'FreeAgent help and tutorials' },
    ],
    local: {
      title: 'Freelance accountants in Bristol, working UK-wide',
      text: "Bristol is full of freelancers, and we've been working alongside them since 2007. Wherever you're based, we can work with you online.",
    },
    contact: {
      title: 'Talk to us about your freelance business',
      lead: "Tell us what you do and how you trade, and we'll suggest the right plan.",
    },
  },
];
