import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HolographicTilt from '@/components/HolographicTilt';

gsap.registerPlugin(ScrollTrigger);

const activities = [
  'Technical Head – Coding Club',
  'Discipline Head',
  'Hackathon Participant',
  'Research Contributor',
  'Event Organizer',
  'Startup Event Participant',
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });

    tl.from(cardRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '100px 0' }}>
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="label-style mb-4">EDUCATION</div>
          <h2
            className="font-display font-bold text-pure-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
          >
            Academic Background
          </h2>
        </div>

        <div ref={cardRef}>
          <HolographicTilt className="glass-card p-8 md:p-10">
            <div className="flex items-start gap-4 mb-4">
              {/* Institution Logo */}
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.15)',
                }}
              >
                <span className="font-display font-bold text-2xl text-electric-violet">PB</span>
              </div>

              <div>
                <h3 className="font-display font-bold text-xl text-pure-white">
                  Priyadarshini Bhagwati College of Engineering, Nagpur
                </h3>
                <div className="font-mono font-bold text-base text-ice-blue mt-1">
                  Bachelor of Technology — Information Technology
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <div className="label-style text-muted-silver">Nov 2022 – Jun 2026</div>
              <span
                className="px-3 py-1 rounded-full font-mono font-bold text-xs"
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#10B981',
                }}
              >
                First Division
              </span>
            </div>

            {/* Activity Badges */}
            <div className="flex flex-wrap gap-2 mt-6">
              {activities.map((activity) => (
                <span key={activity} className="skill-pill">
                  {activity}
                </span>
              ))}
            </div>

            <p className="font-mono text-sm text-muted-silver mt-6 leading-relaxed">
              Hands-on experience in software development, product engineering, research, and startup ecosystems.
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {['Engineering Leadership', 'Problem Solving'].map((skill) => (
                <span key={skill} className="skill-pill" style={{ background: 'rgba(165, 243, 252, 0.1)', borderColor: 'rgba(165, 243, 252, 0.2)' }}>
                  {skill}
                </span>
              ))}
            </div>
          </HolographicTilt>
        </div>
      </div>
    </section>
  );
}
