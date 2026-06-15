import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: 'Lead Software Engineer',
    company: 'RSK Online Services Pvt. Ltd.',
    period: 'May 2026 – Present',
    bullets: [
      'Contributing to development and enhancement of web and mobile-based digital products',
      'Collaborating on product planning, feature implementation, workflow optimization, and system improvements',
      'Working closely with cross-functional teams to ensure scalable and reliable product delivery',
      'Participating in technical discussions, requirement analysis, and product enhancement initiatives',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'RSK Online Services Pvt. Ltd.',
    period: 'May 2025 – May 2026',
    bullets: [
      'Contributed to development and scaling of RSKPay, OnMarQ360, and PairPinnacle',
      'Products serving 100,000+ users across fintech and SaaS ecosystems',
      'Participated in application development, feature implementation, testing, debugging, and system enhancement',
      'Collaborated throughout the software development lifecycle from requirement analysis to deployment',
    ],
  },
  {
    role: 'Social Media Strategist',
    company: 'Commenzy',
    period: 'Apr 2024 – Dec 2024',
    bullets: [
      'Developed and executed social media strategies to enhance brand visibility',
      'Created and managed content across multiple digital platforms',
      'Analyzed audience behavior and engagement metrics to optimize content performance',
    ],
  },
  {
    role: 'Jr. Software Developer Intern',
    company: 'PugArch Technology Pvt. Ltd.',
    period: 'Jun 2024 – Nov 2024',
    bullets: [
      'Assisted in development and enhancement of software applications',
      'Participated in feature implementation, testing, debugging, and application improvement',
      'Gained practical exposure to software development processes and real-world project execution',
    ],
  },
];

export default function Experience() {
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
      const fromX = i % 2 === 0 ? -80 : 80;
      tl.from(
        card,
        {
          x: fromX,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        },
        i * 0.2
      );
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section id="experience" ref={sectionRef} style={{ padding: '120px 0' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="label-style mb-4">EXPERIENCE</div>
          <h2
            className="font-display font-bold text-pure-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
          >
            Work History
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{ background: 'linear-gradient(to bottom, rgba(139, 92, 246, 0.3), rgba(139, 92, 246, 0.05))' }}
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div
                key={`${exp.role}-${exp.company}`}
                ref={(el) => { cardsRef.current[i] = el; }}
                className={`relative flex flex-col md:flex-row ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-start md:items-center gap-4 md:gap-8`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-electric-violet shadow-glow-sm hidden md:block" />

                {/* Card */}
                <div
                  className={`ml-10 md:ml-0 md:w-[45%] ${
                    i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                  } glass-card p-6 relative`}
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-6 bottom-6 w-1 rounded-full"
                    style={{ background: '#8B5CF6' }}
                  />

                  <h3 className="font-display font-bold text-lg text-pure-white">{exp.role}</h3>
                  <div className="font-mono font-bold text-sm text-electric-violet mt-1">
                    {exp.company}
                  </div>
                  <div className="label-style text-ice-blue mt-1">{exp.period}</div>

                  <ul className="mt-4 space-y-2">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="font-mono text-sm text-muted-silver flex items-start gap-2">
                        <span className="text-electric-violet mt-1">◆</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
