import Testimonial1 from '@/components/ui/testimonial-1';

const Bridge = () => (
  <svg viewBox="0 0 64 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 30h60" />
    <path d="M14 30V8M18 30V8M14 8h4M46 30V8M50 30V8M46 8h4" />
    <path d="M2 14c6 8 10 12 12 12M18 26c4-6 10-10 14-10s10 4 14 10M50 26c2 0 6-4 12-12" />
    <path d="M8 30v-9M24 30v-9M32 30v-13M40 30v-9M56 30v-9" />
    <path d="M2 36h60" />
  </svg>
);

export default function Overview() {
  return (
    <Testimonial1
      badge="Who we are"
      lines={[
        ['A small ', { person: { src: '/img/inline-bridge.jpg', alt: 'Clifton Suspension Bridge with hot-air balloons', tooltipTitle: 'Bristol', tooltipText: 'Based here since 2007. Most of our meetings are online, and you are welcome to visit by appointment.' } }, ' Bristol accountancy firm,'],
        ['run by ', { person: { src: '/team/barry-adams.jpg', alt: 'Barry Adams', tooltipTitle: 'Barry Adams FCCA', tooltipText: 'Managing Director. Founded Focus in 2007.' } }, ' Barry since 2007.'],
        ['A team ', { stack: { images: [{ src: '/team/greg-park.jpg', alt: 'Greg Park' }, { src: '/team/maria-sagastume.jpg', alt: 'Maria Sagastume' }, { src: '/team/marianna-szemes.jpg', alt: 'Marianna Szemes' }], tooltipTitle: 'A team of eight', tooltipText: "You'll always deal with a name you recognise." } }, " you'll know by name,"],
        ['on fixed fees, with ', { person: { src: '/img/inline-freeagent.png', alt: 'The FreeAgent dashboard', tooltipTitle: 'FreeAgent Gold Partner', tooltipText: 'A FreeAgent subscription is included in every plan.' } }, ' FreeAgent included.'],
      ]}
      stats={[
        { figure: '2007', label: 'Founded in Bristol', logo: '/img/badge-fsb.png', logoAlt: 'FSB member' },
        { figure: 'Top 1%', label: 'of UK accountants on FreeIndex', logo: '/img/badge-threebest.png', logoAlt: 'ThreeBest Rated 2025' },
        { figure: '100%', label: 'FreeAgent Accredited team', logo: '/img/badge-freeagent-gold.png', logoAlt: 'FreeAgent Gold Partner' },
        { figure: 'ACCA', label: 'registered practice', logo: '/img/badge-acca.png', logoAlt: 'ACCA registered' },
      ]}
    />
  );
}
