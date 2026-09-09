// Pricing at a glance: a segmented switch between limited company, sole trader and landlord plans.
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PlanCard {
  id: string;
  group: 'ltd' | 'sole' | 'landlord';
  name: string;
  scope: string;
  fee: number;
  unit?: string;
  includes: string[];
  featured?: boolean;
}

const TABS: { key: PlanCard['group']; label: string; note: string }[] = [
  { key: 'ltd', label: 'Limited company', note: 'Turnover over £250K: price on application.' },
  { key: 'sole', label: 'Sole trader', note: 'MTD for Income Tax applies from April 2026 to income over £50,000, and from April 2027 over £30,000. The MTD plans include the quarterly submissions.' },
  { key: 'landlord', label: 'Landlord', note: 'If you also trade through a company or as a sole trader, rental accounts are added to that plan.' },
];

export default function PlanTabs({ plans, bookHref }: { plans: PlanCard[]; bookHref: string }) {
  const [tab, setTab] = useState<PlanCard['group']>('ltd');
  const visible = plans.filter((p) => p.group === tab);
  const note = TABS.find((t) => t.key === tab)?.note;

  return (
    <div className="w-full">
      <div className="mx-auto mb-10 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-full border border-[#e2e0d6] bg-[#f6f6f3] p-1" role="tablist" aria-label="Choose how you trade">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            type="button"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              'rounded-full px-5 py-2.5 text-[0.95rem] font-semibold transition-colors',
              tab === t.key ? 'bg-[#105800] text-white shadow-sm' : 'text-[#465042] hover:text-[#105800]'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className={cn('grid gap-5', visible.length > 1 ? 'md:grid-cols-3' : 'md:grid-cols-[minmax(0,420px)] md:justify-center')}
        >
          {visible.map((p) => (
            <article
              key={p.id}
              className={cn(
                'relative flex flex-col rounded-[26px] border bg-white p-7',
                p.featured ? 'border-[#105800] shadow-[0_0_0_1px_#105800]' : 'border-[#e2e0d6]'
              )}
            >
              {p.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-[#105800] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">Most popular</span>
              )}
              <h3 className="text-[1.35rem] font-semibold tracking-tight text-[#141f10]">{p.name}</h3>
              <p className="mt-1 text-sm text-[#6c7467]">{p.scope}</p>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="text-[2.6rem] font-semibold leading-none tracking-tight text-[#105800]">£{p.fee}</span>
                <span className="text-sm text-[#6c7467]">a month + VAT{p.unit ? `, ${p.unit}` : ''}</span>
              </p>
              <ul className="mt-5 flex-1 space-y-2 text-[0.95rem] text-[#465042]">
                {p.includes.map((i) => (
                  <li key={i} className="flex gap-2.5">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[#105800]" aria-hidden="true" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
              <a
                href={bookHref}
                rel="noopener"
                className={cn(
                  'mt-7 inline-flex items-center justify-center rounded-full px-5 py-3 font-semibold transition-colors',
                  p.featured ? 'bg-[#105800] text-white hover:bg-[#0b3f00]' : 'bg-[#eef3e8] text-[#0b3f00] hover:bg-[#dfe8d6]'
                )}
                style={{ color: p.featured ? '#fff' : '#0b3f00' }}
              >
                Book a free meeting
              </a>
            </article>
          ))}
        </motion.div>
      </AnimatePresence>

      <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-[#6c7467]">
        {note} All fees exclude VAT. <a href="/pricing" className="font-semibold text-[#105800] underline underline-offset-4">Compare every plan and the additional services</a>.
      </p>
    </div>
  );
}
