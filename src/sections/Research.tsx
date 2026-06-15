import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TerminalDecrypt from '@/components/TerminalDecrypt';

gsap.registerPlugin(ScrollTrigger);

const publications = [
  {
    journal: 'IJRASET',
    badgeColor: 'rgba(245, 158, 11, 0.1)',
    badgeBorder: 'rgba(245, 158, 11, 0.3)',
    badgeText: '#F59E0B',
    impactFactor: 'SJIF Impact Factor: 8.067',
    title: 'Connect2NGO — An Integrated Digital Platform',
    description: 'Social impact platform using Spring Boot, MySQL, JWT, and REST APIs.',
    link: 'https://www.ijraset.com/research-paper/connect2ngo-an-integrated-digital-platform',
  },
  {
    journal: 'IJRAR Volume 12',
    badgeColor: 'rgba(16, 185, 129, 0.1)',
    badgeBorder: 'rgba(16, 185, 129, 0.3)',
    badgeText: '#10B981',
    impactFactor: '',
    title: 'Online Test Portal',
    description: 'Online assessment platform with automated evaluation and webcam proctoring.',
    link: 'http://www.ijrar.org/papers/IJRAR25B1955.pdf',
  },
];

export default function Research() {
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
          duration: 0.8,
          ease: 'power3.out',
        },
        i * 0.15
      );
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section id="research" ref={sectionRef} style={{ padding: '100px 0' }}>
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="label-style mb-4">RESEARCH & PUBLICATIONS</div>
          <h2
            className="font-display font-bold text-pure-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
          >
            Published Work
          </h2>
        </div>

        {/* Publication Cards */}
        <div className="space-y-8">
          {publications.map((pub, i) => (
            <div
              key={pub.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="glass-card p-8"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  className="px-3 py-1 rounded-full font-mono font-bold text-xs"
                  style={{
                    background: pub.badgeColor,
                    border: `1px solid ${pub.badgeBorder}`,
                    color: pub.badgeText,
                  }}
                >
                  {pub.journal}
                </span>
                {pub.impactFactor && (
                  <span className="font-mono text-xs text-muted-silver">
                    {pub.impactFactor}
                  </span>
                )}
              </div>

              <TerminalDecrypt
                text={pub.title}
                className="font-display font-bold text-xl text-pure-white"
                delay={0.5 + i * 0.3}
              />

              <p className="font-mono text-sm text-muted-silver mt-3 leading-relaxed">
                {pub.description}
              </p>

              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-bold text-sm text-electric-violet inline-flex items-center gap-1 group mt-4"
              >
                View Publication
                <span className="transition-transform duration-200 group-hover:translate-x-2">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
