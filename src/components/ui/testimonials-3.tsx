// Adapted from 21st.dev "Staggered Testimonials Grid" by efferd. Data is passed in as props.
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company?: string;
  image?: string;
};

function DecorIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-0 left-0 z-1 size-3.5 shrink-0 -translate-x-[calc(50%+0.5px)] -translate-y-[calc(50%+0.5px)] stroke-1 stroke-[#8a9284]",
        className,
      )}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function QuoteIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}

export function TestimonialsSection({ testimonials, stagger = true }: { testimonials: Testimonial[]; stagger?: boolean }) {
  return (
    <div className={cn("mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-3 md:gap-6", stagger && "md:-mt-6 md:mb-24")}>
      {testimonials.map((testimonial, index) => (
        <TestimonialCard index={stagger ? index % 3 : 0} key={testimonial.name} testimonial={testimonial} />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
  className,
  ...props
}: React.ComponentProps<"figure"> & { testimonial: Testimonial; index: number }) {
  const { quote, name, role, company, image } = testimonial;

  return (
    <figure
      className={cn(
        "group relative flex flex-col justify-between gap-6 bg-white px-8 pt-8 pb-6 shadow-xs md:translate-y-[calc(3rem*var(--t-card-index))]",
        className,
      )}
      style={{ "--t-card-index": index } as React.CSSProperties}
      {...props}
    >
      <div className="absolute -inset-y-4 -left-px w-px bg-[#e2e0d6]" />
      <div className="absolute -inset-y-4 -right-px w-px bg-[#e2e0d6]" />
      <div className="absolute -inset-x-4 -top-px h-px bg-[#e2e0d6]" />
      <div className="absolute -right-4 -bottom-px -left-4 h-px bg-[#e2e0d6]" />
      <DecorIcon />

      <blockquote className="flex gap-4" style={{ margin: 0 }}>
        <QuoteIcon aria-hidden="true" className="size-6 shrink-0 stroke-1 text-[#105800]" />
        <p className="flex-1 font-normal text-base text-[#465042] leading-relaxed" style={{ margin: 0 }}>
          {quote}
        </p>
      </blockquote>

      <figcaption className="flex items-center gap-3">
        <Avatar className="size-10 rounded-full ring-2 ring-[#e2e0d6] ring-offset-2 ring-offset-white transition-shadow group-hover:ring-[#105800]/40">
          {image && <AvatarImage alt="" src={image} />}
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <cite className="font-medium text-[#141f10] text-sm not-italic">{name}</cite>
          <p className="text-[#6c7467] text-xs" style={{ margin: 0 }}>
            {role}
            {company && <span className="text-[#141f10]/80">, {company}</span>}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export default TestimonialsSection;
