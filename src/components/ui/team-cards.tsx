// Adapted from 21st.dev "Team Section Block" (moumensoliman): tilt-on-hover member cards with
// avatar, role and contact links, restyled for a light palette and fed by props.
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { Mail, CalendarDays } from 'lucide-react';

const Linkedin = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.9 8.5H3.6V21h3.3V8.5zM5.3 3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM20.4 13.3c0-3.6-1.9-5.1-4.4-5.1-2 0-2.9 1.1-3.4 1.9V8.5H9.3V21h3.3v-6.6c0-1.7.3-3.4 2.5-3.4 2.1 0 2.1 2 2.1 3.5V21h3.3v-7.7z"/></svg>
);
import { useState } from 'react';

export interface TeamCardMember {
  name: string;
  letters?: string;
  role: string;
  bio: string;
  image: string;
  email?: string;
  linkedin?: string;
  calendly?: string;
}

function TeamMemberCard({ member }: { member: TeamCardMember }) {
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const reduce = useReducedMotion();
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left - r.width / 2) / (r.width / 2));
    mouseY.set((e.clientY - r.top - r.height / 2) / (r.height / 2));
  };
  const onLeave = () => { mouseX.set(0); mouseY.set(0); setHovered(false); };
  const links = [
    member.email && { icon: Mail, label: `Email ${member.name.split(' ')[0]}`, href: `mailto:${member.email}` },
    member.calendly && { icon: CalendarDays, label: `Book a call with ${member.name.split(' ')[0]}`, href: member.calendly },
    member.linkedin && { icon: Linkedin, label: `${member.name} on LinkedIn`, href: member.linkedin },
  ].filter(Boolean) as { icon: React.ComponentType<{ className?: string }>; label: string; href: string }[];

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      className="group relative h-full"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#e2e0d6] bg-white p-5 transition-shadow duration-300 group-hover:shadow-[0_24px_50px_-30px_rgba(20,31,16,0.45)]">
        <div className="mb-4 flex justify-center">
          <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-[#eef3e8] bg-white">
            <motion.img
              src={member.image}
              alt={member.name}
              className="h-full w-full rounded-full object-cover"
              style={{ width: '100%', height: '100%' }}
              animate={hovered && !reduce ? { scale: 1.08 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-[1.1rem] font-semibold tracking-tight text-[#141f10]" style={{ fontFamily: 'var(--display)', margin: 0 }}>
            {member.name} {member.letters && <span className="text-sm font-medium text-[#6c7467]">{member.letters}</span>}
          </h3>
          <p className="mt-1 inline-block rounded-full bg-[#eef3e8] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#0b3f00]" style={{ margin: '0.35rem 0 0' }}>{member.role}</p>
          <p className="mt-3 text-sm leading-relaxed text-[#465042]" style={{ margin: '0.75rem 0 0' }}>{member.bio}</p>
        </div>
        {links.length > 0 && (
          <div className="mt-auto flex justify-center gap-2 pt-4">
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                rel="noopener"
                aria-label={l.label}
                title={l.label}
                className="inline-grid h-9 w-9 place-items-center rounded-full border border-[#e2e0d6] bg-white text-[#105800] transition-colors hover:bg-[#105800] hover:text-white"
                style={{ color: hovered ? undefined : '#105800' }}
                animate={hovered || reduce ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0.75 }}
                transition={{ delay: hovered ? 0.05 * i : 0, type: 'spring', stiffness: 300, damping: 20 }}
              >
                <l.icon className="h-4 w-4" aria-hidden />
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function TeamCards({ members }: { members: TeamCardMember[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: 1000 }}>
      {members.map((m) => (
        <TeamMemberCard key={m.name} member={m} />
      ))}
    </div>
  );
}
