// Adapted from the 21st.dev "Aero Hero 3" demo: full-screen photo, 12-column divider lines,
// centred light headline and a pill button with a sliding arrow. Rendered statically by Astro.
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AeroHeroProps {
  image: string;
  imageAlt?: string;
  eyebrow?: string;
  title: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

export default function AeroHero({
  image,
  imageAlt = '',
  eyebrow,
  title,
  text,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
  className,
}: AeroHeroProps) {
  return (
    <section
      className={cn('relative flex min-h-[min(100svh,960px)] w-full items-center justify-center overflow-hidden bg-[#0a2b00]', className)}
      aria-label="Introduction"
    >
      {/* photo: hero-a__photo (global.css) settles it from a slight zoom, then drifts very slowly */}
      <img
        src={image}
        alt={imageAlt}
        className="hero-a__photo absolute inset-0 h-full w-full object-cover object-[62%_50%]"
        style={{ width: '100%', height: '100%' }}
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-black/60 to-transparent" aria-hidden="true" />

      {/* 12-column divider lines */}
      <div className="pointer-events-none absolute inset-0 z-10 size-full" aria-hidden="true">
        <div className="grid h-full w-full grid-cols-12 divide-x divide-white/15">
          <div className="col-span-1 h-full" />
          <div className="col-span-3 h-full" />
          <div className="col-span-4 h-full" />
          <div className="col-span-3 h-full" />
          <div className="col-span-1 h-full" />
        </div>
      </div>

      {/* copy: each block carries hero-a__in and an index, so it rises in sequence (keyframes in global.css) */}
      <div className="relative z-20 flex max-w-5xl flex-col items-center px-6 pt-24 pb-16 text-center text-white">
        {eyebrow && (
          <p className="hero-a__in mb-6 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-white/85" style={{ '--i': 0 } as React.CSSProperties}>{eyebrow}</p>
        )}
        <h1
          className="hero-a__in text-balance text-center text-[2.6rem] leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[5.4rem]"
          style={{ fontFamily: 'var(--display)', fontWeight: 560, letterSpacing: '-0.03em', '--i': 1 } as React.CSSProperties}
        >
          {title}
        </h1>
        <p className="hero-a__in mx-auto mt-7 mb-10 max-w-2xl text-center text-lg font-light leading-relaxed text-white/90 md:text-xl" style={{ '--i': 2 } as React.CSSProperties}>
          {text}
        </p>

        <div className="hero-a__in flex flex-wrap items-center justify-center gap-x-8 gap-y-4" style={{ '--i': 3 } as React.CSSProperties}>
          <a
            href={ctaHref}
            rel="noopener"
            className="group inline-flex cursor-pointer items-center justify-center gap-0 rounded-full"
          >
            <span className="rounded-full bg-[#b9e2a0] px-6 py-3 font-medium text-[#0a2b00] transition-colors duration-500 ease-in-out group-hover:bg-white">
              {ctaLabel}
            </span>
            <span className="relative flex h-fit items-center overflow-hidden rounded-full bg-[#b9e2a0] p-5 text-[#0a2b00] transition-colors duration-500 ease-in-out group-hover:bg-white">
              <ArrowUpRight className="absolute h-5 w-5 -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:translate-x-10" />
              <ArrowUpRight className="absolute h-5 w-5 -translate-x-10 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2" />
            </span>
          </a>
          {secondaryLabel && secondaryHref && (
            <a
              href={secondaryHref}
              className="font-medium underline underline-offset-4 transition-colors hover:decoration-white"
              style={{ color: '#fff', textDecorationColor: 'rgba(255,255,255,0.5)' }}
            >
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
