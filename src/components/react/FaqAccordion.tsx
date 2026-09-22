// shadcn/21st Accordion (Radix) fed with the firm's FAQ content.
// Closed Radix panels are normally absent from the DOM, which stripped ~8,000 words of answers from the
// built HTML on /faq, /freeagent and /pricing. So the panels are force-mounted (hidden) for the server
// render and the first client render, then released after hydration so open/close animates as normal.
import { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export interface FaqEntry {
  q: string;
  a: { lead?: string; text: string; link?: { href: string; label: string } }[];
}

export default function FaqAccordion({ items }: { items: FaqEntry[] }) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((f, i) => (
        <AccordionItem key={i} value={`item-${i}`} className="border-[#e2e0d6]">
          <AccordionTrigger className="py-5 text-left text-[1.05rem] font-semibold text-[#141f10] hover:text-[#105800] hover:no-underline [&>svg]:text-[#105800] [&>svg]:h-5 [&>svg]:w-5">
            {f.q}
          </AccordionTrigger>
          <AccordionContent
            forceMount={hydrated ? undefined : true}
            className={`text-[0.98rem] leading-relaxed text-[#465042]${hydrated ? '' : ' data-[state=closed]:hidden'}`}
          >
            {f.a.map((p, k) => (
              <p key={k} className="mb-3 last:mb-0">
                {p.lead && <strong className="text-[#141f10]">{p.lead} </strong>}
                {p.text}
                {p.link && (
                  <>
                    {' '}
                    <a href={p.link.href} rel="noopener" className="text-[#105800] underline underline-offset-4">
                      {p.link.label}
                    </a>
                    .
                  </>
                )}
              </p>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
