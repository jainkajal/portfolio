import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const courses = [
  'Foundations of Cybersecurity',
  'Linux and SQL',
  'Network Security',
  'Security Risk Management',
  'Security Operations',
  'Python for Cybersecurity Automation',
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current) return;

    gsap.set(cardRef.current, { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });

    tl.to(cardRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '80px 0' }}>
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="label-style mb-4">CERTIFICATIONS</div>
          <h2
            className="font-display font-bold text-pure-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
          >
            Credentials
          </h2>
        </div>

        {/* Cert Card */}
        <div className="flex justify-center">
          <a
            href="https://www.coursera.org/account/accomplishments/specialization/certificate/MHLYQJDGANEK"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-[600px]"
          >
            <div
              ref={cardRef}
              className="glass-card p-8 transition-all duration-200 hover:border-[rgba(139,92,246,0.3)] hover:-translate-y-1 cursor-pointer"
            >
              {/* Shield Icon with Badge */}
              <div className="flex items-start gap-4">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.4))' }}
                >
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <div>
                  <div className="label-style text-xs mb-2">● CERTIFICATION</div>
                  <h3 className="font-display font-bold text-xl text-pure-white leading-tight">
                    Google Cybersecurity Professional Certificate
                  </h3>
                </div>
              </div>

              {/* Courses List */}
              <div className="mt-6 space-y-2 ml-4">
                {courses.map((course) => (
                  <div key={course} className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">●</span>
                    <span className="font-mono text-sm text-muted-silver">
                      {course}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="font-mono text-xs text-muted-silver">
                  Coursera • Google
                </span>
                <span className="text-electric-violet font-mono text-sm font-bold group-hover:translate-x-2 transition-transform">
                  View Certificate →
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
