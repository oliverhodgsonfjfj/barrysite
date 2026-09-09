"use client";

// Adapted from 21st.dev "Testimonial 1": a headline with inline media that expands on hover
// (without reflowing the line), plus a strip of logos that flip to a figure on hover.
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";

export interface InlinePerson { src: string; alt: string; tooltipTitle: string; tooltipText: string }
export interface InlineStack { images: { src: string; alt: string }[]; tooltipTitle: string; tooltipText: string }
export interface InlineIcon { icon: ReactNode; tooltipTitle: string; tooltipText: string }
export interface StatItem { figure: string; label: string; logo: string; logoAlt: string }

export interface Testimonial1Props {
  badge?: string;
  lines: Array<Array<string | { person: InlinePerson } | { stack: InlineStack } | { icon: InlineIcon }>>;
  stats: StatItem[];
  className?: string;
}

function Tip({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={14} className="z-50 w-[300px] max-w-[90vw] bg-white text-[#141f10] rounded-2xl shadow-xl border border-[#e2e0d6] text-left" style={{ padding: "1.1rem 1.25rem", fontFamily: "var(--font)", letterSpacing: 0, lineHeight: 1.5 }}>
          <p className="font-semibold" style={{ margin: 0, fontSize: "1rem" }}>{title}</p>
          <p className="text-[#465042]" style={{ margin: "0.35rem 0 0", fontSize: "0.95rem", fontWeight: 400 }}>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/* Fixed-size slot in the text; the picture grows out of it on hover so the line never reflows. */
function Portrait({ person }: { person: InlinePerson }) {
  return (
    <Tip title={person.tooltipTitle} text={person.tooltipText}>
      <span className="group relative inline-block align-middle mx-2 w-12 h-12 sm:w-16 sm:h-16">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 block h-full w-12 sm:w-16 overflow-hidden rounded-full border-2 border-white shadow-md transition-[width] duration-300 ease-out md:group-hover:w-40">
          <img src={person.src} alt={person.alt} className="object-cover" style={{ width: "100%", height: "100%", objectPosition: "center" }} />
        </span>
      </span>
    </Tip>
  );
}

/* Three overlapping circles that fan out slightly on hover. */
function Stack({ stack }: { stack: InlineStack }) {
  const offsets = ["0rem", "1.5rem", "3rem"];
  return (
    <Tip title={stack.tooltipTitle} text={stack.tooltipText}>
      <span className="group relative inline-block align-middle mx-2 h-12 w-[6rem] sm:h-16 sm:w-[7.5rem]">
        {stack.images.map((img, i) => (
          <span
            key={img.src}
            className="absolute top-0 block h-12 w-12 sm:h-16 sm:w-16 overflow-hidden rounded-full border-2 border-white shadow-md transition-transform duration-300 ease-out"
            style={{ left: offsets[i], zIndex: 3 - i, transform: "translateX(0)" }}
            data-fan={i}
          >
            <img src={img.src} alt={img.alt} className="object-cover" style={{ width: "100%", height: "100%" }} />
          </span>
        ))}
        <style>{`.group:hover [data-fan="1"]{transform:translateX(0.5rem)}.group:hover [data-fan="2"]{transform:translateX(1rem)}`}</style>
      </span>
    </Tip>
  );
}

function IconBadge({ icon }: { icon: InlineIcon }) {
  return (
    <Tip title={icon.tooltipTitle} text={icon.tooltipText}>
      <span className="group relative inline-block align-middle mx-2 w-12 h-12 sm:w-16 sm:h-16">
        <span className="absolute inset-0 grid place-items-center rounded-full bg-[#105800] text-white shadow-md transition-transform duration-300 ease-out group-hover:scale-110 [&>svg]:w-[74%] [&>svg]:h-[74%]">{icon.icon}</span>
      </span>
    </Tip>
  );
}

export default function Testimonial1({ badge, lines, stats, className }: Testimonial1Props) {
  return (
    <div className={["w-full py-4 px-4 md:px-8 relative", className].filter(Boolean).join(" ")}>
      <div className="max-w-6xl mx-auto">
        {badge && (
          <div className="flex justify-center mb-8">
            <div className="bg-[#eef3e8] text-[#0b3f00] px-4 py-1 rounded-full text-xs uppercase tracking-wider font-semibold">{badge}</div>
          </div>
        )}

        <div className="text-center max-w-screen-xl mx-auto relative text-[#141f10]">
          {lines.map((line, i) => (
            <h2 key={i} className="text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight tracking-tight" style={{ fontFamily: "var(--display)", margin: 0 }}>
              {line.map((part, k) =>
                typeof part === "string" ? <span key={k}>{part}</span>
                : "person" in part ? <Portrait key={k} person={part.person} />
                : "stack" in part ? <Stack key={k} stack={part.stack} />
                : <IconBadge key={k} icon={part.icon} />
              )}
            </h2>
          ))}
        </div>

        <div className="flex flex-wrap gap-6 bg-[#f6f6f3] mt-10 w-full mx-auto px-6 py-5 border rounded-2xl border-[#e2e0d6]" style={{ display: "flex" }}>
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex-1 min-w-[160px] relative pl-6">
              {index !== 0 && <div className="w-px h-10 bg-[#d5d3c8] absolute left-0 top-1/2 -translate-y-1/2" />}
              <div className="group relative h-16 overflow-hidden rounded-xl cursor-default">
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:-translate-y-full pointer-events-none">
                  <img src={stat.logo} alt={stat.logoAlt} className="object-contain" style={{ height: "2.5rem", width: "auto", maxWidth: "80%" }} />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 pointer-events-none">
                  <span className="md:text-3xl text-2xl font-semibold text-[#105800] leading-none" style={{ fontFamily: "var(--display)" }}>{stat.figure}</span>
                  <p className="text-[#465042] text-xs text-center mt-1" style={{ margin: "0.25rem 0 0" }}>{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
