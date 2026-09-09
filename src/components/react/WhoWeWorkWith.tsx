import React from 'react';
import { Code2, Palette, Briefcase, HardHat, HeartPulse, KeyRound } from 'lucide-react';
import { FeatureGrid } from '@/components/ui/feature-section';

// The industries listed on the old home page, grouped.
const categories = [
  {
    icon: <Code2 size={24} />,
    title: 'IT and software',
    items: [{ text: 'IT professionals' }, { text: 'Software developers' }, { text: 'Information workers' }],
  },
  {
    icon: <Palette size={24} />,
    title: 'Design and creative',
    items: [{ text: 'Graphic designers' }, { text: 'Designers and programmers' }, { text: 'Publishers' }],
  },
  {
    icon: <Briefcase size={24} />,
    title: 'Consultants',
    items: [{ text: 'Management consultants' }, { text: 'Medical consultants' }, { text: 'Advertising, marketing and PR' }],
  },
  {
    icon: <HardHat size={24} />,
    title: 'Engineering and architecture',
    items: [{ text: 'Engineers' }, { text: 'Architects' }, { text: 'Contractors inside and outside IR35', href: '/ir35' }],
  },
  {
    icon: <HeartPulse size={24} />,
    title: 'Health and people',
    items: [{ text: 'Physiotherapists' }, { text: 'Human resources' }, { text: 'Other service-based businesses' }],
  },
  {
    icon: <KeyRound size={24} />,
    title: 'How you trade',
    items: [
      { text: 'Limited companies', href: '/pricing' },
      { text: 'Sole traders, including MTD', href: '/pricing' },
      { text: 'Landlords with rental income', href: '/pricing' },
    ],
  },
];

export default function WhoWeWorkWith() {
  return (
    <FeatureGrid
      title={
        <>
          Who we{' '}
          <span className="relative inline-block">
            work with
            <svg viewBox="0 0 120 6" className="absolute left-0 bottom-0 -mb-1 w-full" aria-hidden="true">
              <path d="M1 4.5C25.46 1.63 78.43 1.39 119 4.5" stroke="#b9e2a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </span>
        </>
      }
      subtitle="We usually work with small businesses in service-based industries, but we do have a number of clients outside of this range. Being a small firm, we can offer services that fit your business rather than off-the-shelf stock services."
      categories={categories}
      buttonText="See what's included in each plan"
      buttonHref="/pricing"
    />
  );
}
