import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const badges = ['Best Pitch', 'Facilitated Recognition', 'Best GD Team'];

export default function Achievements() {
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
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        },
        i * 0.15
      );
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '80px 0' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="label-style mb-4">ACHIEVEMENTS</div>
          <h2
            className="font-display font-bold text-pure-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
          >
            Recognition
          </h2>
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="glass-card glass-card-hover p-8 text-center"
              style={{ minHeight: '280px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            >
              {/* Trophy Icon */}
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))' }}
              >
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>

              <h3 className="font-display font-bold text-xl text-pure-white mt-4">
                Nagpur Startup Meet
              </h3>

              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="skill-pill"
                    style={{ background: 'rgba(139, 92, 246, 0.15)' }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
