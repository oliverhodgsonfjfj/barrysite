// From the old FAQ page. Wording kept; the fees quoted in the answers were stale (£80 / £40)
// and have been updated to the current pricing page (£99 / £50).
export interface FaqParagraph {
  lead?: string;
  text: string;
  link?: { href: string; label: string };
}

export interface Faq {
  q: string;
  a: FaqParagraph[];
}

export const faqs: Faq[] = [
  {
    q: 'Do I need an accountant?',
    a: [
      {
        text: "You may think you can't afford an accountant, or you're simply comfortable that you can do it all yourself, but before deciding to take care of the finances yourself, look at how long it would take you and how much new information you'd have to acquire.",
      },
      {
        text: 'If you have a limited company then you should have an accountant in some capacity, as the legislation governing small business accounts is always changing and the cost to keep up with these changes alone will likely be more than an average accountant would charge. All ACCA members need to do a minimum of 40 hours of CPD per year. Our limited company packages start at £99 a month plus VAT.',
      },
      {
        text: "For sole traders it's a different scenario, and many people do it themselves with few repercussions other than some lost time. However, they may be missing opportunities to reduce tax, making mistakes, missing deadlines or claiming for things that they shouldn't be. Our sole trader packages start at £50 a month plus VAT.",
      },
      {
        text: "Even if your situation is fairly simple and you've done a tax return before, it's still going to take you several hours at a minimum to gather your information, check it and submit it to HMRC. So weigh up how much your time is worth and compare that to what an accountant would charge. When you add in the peace of mind that you've got experts doing it for you, and that those experts are there year-round if you're unsure of anything, getting an accountant might be a great investment.",
      },
    ],
  },
  {
    q: 'How does the fixed monthly fee work?',
    a: [
      {
        text: "Our fixed monthly fee is not just a standard annual fee for all the services charged on a monthly basis, it's for the work we do in each month. Some months we might not do much and some months we might do a lot, but the fee usually stays the same unless you ask us for extra services.",
      },
      {
        text: "There is no contract, so you're not tied in and you don't have to agree to a minimum of 12 months or anything like that. If it's not working after a few months, we can simply part ways.",
      },
      {
        text: "Our fees rarely increase unless you add more services to our agreement, but in occasional cases we might have underquoted for a job that appeared much simpler. In these circumstances we will propose a new fee along with the reasons for it, so you have the option to proceed or not. We'll never give you an unexpected bill or retrospectively increase our fees.",
      },
      {
        text: "Our fees are based on a client coming to us with no outstanding accounts, so if you have accounts outstanding for a period that has already ended, we might need to charge a 'catch-up fee'. This depends on the circumstances, usually works out at £500 to £1,000, and is charged as a one-off fee when the accounts are completed.",
      },
    ],
  },
  {
    q: 'What makes Focus different from other accountants?',
    a: [
      {
        text: "In a nutshell, we deliver high levels of customer service, employ innovative technology to help automate as much of your bookkeeping as possible, and we're small enough to develop real relationships with our clients.",
      },
      {
        lead: 'Service.',
        text: "We are fully aware that we're not the cheapest accountant around and we never want to be. The 'pile it high, sell it cheap' style of accountant sometimes works well for people with very simple circumstances who just want to keep the taxman at bay. We focus on high-quality customer service and we like to really get to know our clients in order to take advantage of every possibility to minimise unnecessary tax.",
      },
      {
        lead: 'Size.',
        text: "We don't hide the fact that we're a small firm. It means that if you call us, you'll probably recognise the voice on the other end of the phone and they'll know your circumstances, so issues can be resolved quickly and without the hassle of giving a secretary your life story first.",
      },
      {
        lead: 'Technology.',
        text: 'Cloud accountancy, e-signatures and bank feeds are now commonplace, but we were early adopters. We started using FreeAgent back in 2014 when they were still a fairly small team, so we have a great relationship with them and know the software back to front. That lets us deal with any software queries ourselves rather than sending you to a support team.',
      },
    ],
  },
  {
    q: 'Should I operate as a sole trader or through a limited company?',
    a: [
      {
        text: "There are many benefits to operating through a limited company, but most of them won't make any difference if your business is very simple and you're only making £15K profit each year.",
      },
      {
        text: "If your profit goes over £20K, you will likely be able to reduce your tax bill by becoming a limited company, but the added complication and the cost of an accountant are probably going to cancel out the saving. As a general rule, if your profit goes over £30K you'll be better off operating through a limited company, and the higher the profit, the better off you'll be.",
      },
      {
        text: "Other benefits of a limited company: you look bigger, more professional and more established; limited liability, so the business going under doesn't automatically make you liable for its debts; better access to potential funding; and you could sell your business at some point.",
      },
      {
        text: 'We have a free app with a calculator that will estimate the tax saving of operating as a limited company.',
        link: { href: 'https://play.google.com/store/apps/details?id=com.taxapps.focusaccountancy&gl=GB', label: 'Get the Focus App on Google Play' },
      },
    ],
  },
];
