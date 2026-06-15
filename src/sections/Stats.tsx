import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CountUpReveal from '@/components/CountUpReveal';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { target: 100, suffix: 'K+', label: 'USERS IMPACTED' },
  { target: 148, suffix: 'K+', label: 'LINES OF CODE' },
  { target: 47, suffix: '', label: 'BUSINESS MODULES' },
  { target: 1000, suffix: '+', label: 'ORGANIZATIONS SERVED' },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      tl.from(
        card,
        {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        i * 0.12
      );
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '80px 0', position: 'relative' }}>
      {/* Horizontal line */}
      <div
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px pointer-events-none hidden lg:block"
        style={{ background: 'rgba(139, 92, 246, 0.15)' }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="glass-card glass-card-hover p-6 text-center"
              style={{ minHeight: '160px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            >
              <div className="font-display font-bold text-ice-blue" style={{ fontSize: '2.5rem' }}>
                <CountUpReveal target={stat.target} suffix={stat.suffix} duration={2.5} />
              </div>
              <div className="label-style mt-2 text-muted-silver">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
