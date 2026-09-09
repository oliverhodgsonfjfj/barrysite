// shadcn/21st Accordion (Radix) fed with the firm's FAQ content.
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export interface FaqEntry {
  q: string;
  a: { lead?: string; text: string; link?: { href: string; label: string } }[];
}

export default function FaqAccordion({ items }: { items: FaqEntry[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((f, i) => (
        <AccordionItem key={i} value={`item-${i}`} className="border-[#e2e0d6]">
          <AccordionTrigger className="py-5 text-left text-[1.05rem] font-semibold text-[#141f10] hover:text-[#105800] hover:no-underline [&>svg]:text-[#105800] [&>svg]:h-5 [&>svg]:w-5">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="text-[0.98rem] leading-relaxed text-[#465042]">
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
