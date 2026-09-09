// Adapted from 21st.dev "Testimonial Section 3" by solaceui (three-card carousel with a
// highlighted centre card). Data is passed in as props and Next's Image is replaced with <img>.
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  image?: string;
  quote: string;
}

export default function Testimonials({ items }: { items: TestimonialItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(1);

  const handleNext = useCallback(() => setCurrentIndex((p) => (p + 1) % items.length), [items.length]);
  const handlePrev = useCallback(() => setCurrentIndex((p) => (p - 1 + items.length) % items.length), [items.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleNext, handlePrev]);

  const visible = useMemo(() => {
    const total = items.length;
    return [
      { ...items[(currentIndex - 1 + total) % total], position: 'left' },
      { ...items[currentIndex], position: 'center' },
      { ...items[(currentIndex + 1) % total], position: 'right' },
    ];
  }, [currentIndex, items]);

  return (
    <div className="w-full flex flex-col items-center overflow-hidden">
      <div className="relative w-full max-w-6xl flex items-stretch justify-center">
        <div className="flex flex-row items-stretch justify-center w-full">
          {visible.map((item, index) => {
            const isCenter = item.position === 'center';
            return (
              <React.Fragment key={item.id}>
                {index > 0 && (
                  <div className="hidden md:block w-[14px] relative shrink-0">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)] bg-[length:10px_10px] text-[#cfcdc2] opacity-60 h-full w-full" />
                  </div>
                )}
                <motion.div
                  layout
                  initial={false}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, type: 'spring', bounce: 0.2 }}
                  style={{ willChange: 'transform, opacity' }}
                  className={cn(
                    'relative flex flex-col justify-between border p-8 w-full md:w-[340px] min-h-[320px] shrink-0 rounded-[24px] overflow-hidden',
                    isCenter
                      ? 'bg-[#0a2b00] border-[#0a2b00] text-white z-20'
                      : 'hidden md:flex bg-white border-[#e2e0d6] text-[#465042] z-0'
                  )}
                >
                  {!isCenter && item.position === 'left' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#f7f5ef]/90 via-[#f7f5ef]/40 to-transparent z-10 pointer-events-none" />
                  )}
                  {!isCenter && item.position === 'right' && (
                    <div className="absolute inset-0 bg-gradient-to-l from-[#f7f5ef]/90 via-[#f7f5ef]/40 to-transparent z-10 pointer-events-none" />
                  )}
                  <div
                    className={cn(
                      'font-serif text-xl md:text-[1.35rem] leading-snug mb-8',
                      !isCenter && 'blur-[1px] opacity-70'
                    )}
                    style={{ fontFamily: 'var(--display)', fontWeight: 500 }}
                  >
                    “{item.quote}”
                  </div>
                  <div className="flex items-center gap-4 mt-auto">
                    {item.image && (
                      <div className={cn('relative w-12 h-12 overflow-hidden rounded-[30%] shrink-0', isCenter ? 'ring-2 ring-white/40' : 'ring-2 ring-[#105800]/30')}>
                        <img src={item.image} alt="" width={48} height={48} loading="lazy" className="w-full h-full object-cover object-top" />
                      </div>
                    )}
                    <div className="flex flex-col text-left">
                      <span className={cn('font-semibold text-base', isCenter ? 'text-white' : 'text-[#141f10]')}>{item.name}</span>
                      <span className={cn('text-sm', isCenter ? 'text-[#c3d2b8]' : 'text-[#6c7467]')}>{item.role}</span>
                    </div>
                  </div>
                </motion.div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-8">
        <button
          type="button"
          onClick={handlePrev}
          className="group p-3 rounded-full border border-[#cfcdc2] bg-white hover:bg-[#105800] hover:border-[#105800] transition-colors"
          aria-label="Previous review"
        >
          <ArrowLeft className="w-5 h-5 text-[#105800] group-hover:text-white transition-colors" />
        </button>
        <span className="text-sm text-[#6c7467] tabular-nums">
          {currentIndex + 1} / {items.length}
        </span>
        <button
          type="button"
          onClick={handleNext}
          className="group p-3 rounded-full border border-[#cfcdc2] bg-white hover:bg-[#105800] hover:border-[#105800] transition-colors"
          aria-label="Next review"
        >
          <ArrowRight className="w-5 h-5 text-[#105800] group-hover:text-white transition-colors" />
        </button>
      </div>
    </div>
  );
}
