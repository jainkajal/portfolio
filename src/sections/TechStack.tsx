import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: 'Languages & Frameworks',
    skills: ['Node.js', 'TypeScript', 'React.js', 'React Native', 'Java', 'Spring Boot', 'Express.js'],
  },
  {
    title: 'Databases & APIs',
    skills: ['PostgreSQL', 'MySQL', 'REST APIs', 'JWT'],
  },
  {
    title: 'State & UI Management',
    skills: ['React Query', 'Zustand', 'Tailwind CSS'],
  },
  {
    title: 'Tools & Practices',
    skills: ['Git', 'API Design', 'System Design', 'Multi-Tenant Architecture'],
  },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

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
          y: 60,
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
    <section id="tech-stack" ref={sectionRef} style={{ padding: '20px 0 80px 0' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="label-style mb-4">TECH STACK</div>
          <h2 className="font-display font-bold text-pure-white" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
            Technologies I Work With
          </h2>
          <p className="font-mono text-sm text-muted-silver mt-4">
            Languages, frameworks, databases, and tools powering production-grade applications
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="glass-card p-8 relative overflow-hidden"
              style={{ minHeight: '220px' }}
            >
              <div className="relative z-10">
                <h3 className="font-mono font-bold text-base text-pure-white mb-4">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-pill cursor-pointer transition-all duration-200"
                      onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                      style={{
                        backgroundColor: selectedSkill === skill ? 'rgba(139, 92, 246, 0.5)' : '',
                        borderColor: selectedSkill === skill ? 'rgba(139, 92, 246, 0.8)' : '',
                        boxShadow: selectedSkill === skill ? '0 0 12px rgba(139, 92, 246, 0.6)' : '',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Strengths */}
        <div className="mt-12 text-center">
          <div className="label-style mb-4">TECHNICAL STRENGTHS</div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Full Stack Development',
              'Backend Engineering',
              'Mobile App Development',
              'API Design',
              'Database Optimization',
              'Multi-Tenant Architecture',
              'System Design & Scalability',
              'Production Deployment',
              'Android & iOS App Publishing',
            ].map((strength) => (
              <span
                key={strength}
                className="skill-pill cursor-pointer transition-all duration-200"
                style={{
                  padding: '8px 20px',
                  backgroundColor: selectedSkill === strength ? 'rgba(139, 92, 246, 0.5)' : '',
                  borderColor: selectedSkill === strength ? 'rgba(139, 92, 246, 0.8)' : '',
                  boxShadow: selectedSkill === strength ? '0 0 12px rgba(139, 92, 246, 0.6)' : '',
                }}
                onClick={() => setSelectedSkill(selectedSkill === strength ? null : strength)}
              >
                {strength}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
