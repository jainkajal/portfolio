import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import QuantumTextReveal from '@/components/QuantumTextReveal';
import TypewriterEngine from '@/components/TypewriterEngine';

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.4 });

    if (ctaRef.current) {
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });
      tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    }

    if (scrollRef.current) {
      gsap.set(scrollRef.current, { opacity: 0 });
      tl.to(scrollRef.current, { opacity: 1, duration: 0.5 }, '-=0.3');
    }

    return () => { tl.kill(); };
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        // Mobile-safe viewport units to avoid address-bar / reflow issues
        minHeight: '100svh',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent 70%)',
            top: '10%',
            left: '10%',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(165, 243, 252, 0.2), transparent 70%)',
            bottom: '20%',
            right: '15%',
            animation: 'float 10s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute w-[250px] h-[250px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25), transparent 70%)',
            top: '50%',
            left: '60%',
            animation: 'float 12s ease-in-out infinite',
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 px-4"
        style={{ pointerEvents: 'none' }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* Text Section */}
          <div className="text-center lg:text-left flex-1">
            <h1 className="sr-only">Kajal Jain — Software Engineer</h1>
            <QuantumTextReveal
              text="SOFTWARE"
              className="font-display font-bold text-pure-white"
              delay={0.8}
              style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                lineHeight: 1.0,
              }}
            />
            <QuantumTextReveal
              text="ENGINEER"
              className="font-display font-bold text-pure-white"
              delay={0.95}
              style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                lineHeight: 1.0,
              }}
            />

            <div className="mt-4">
              <TypewriterEngine
                phrases={[
                  'Software Engineer |',
                  'Full Stack Developer |',
                  'Mobile App Developer |',
                  'Backend Engineer |',
                ]}
                typingSpeed={100}
                deletingSpeed={50}
                pauseDuration={2000}
                className="font-mono text-electric-violet"
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                }}
              />
            </div>

            <p
              className="font-mono text-muted-silver mt-4"
              style={{ fontSize: '0.875rem', opacity: 0.8 }}
            >
              Building products used by 100K+ users | Fintech &amp; SaaS
            </p>

            <div
              ref={ctaRef}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              style={{ pointerEvents: 'auto' }}
            >
              <button
                onClick={() => handleScrollTo('#projects')}
                className="btn-primary"
              >
                View Projects
              </button>
              <button
                onClick={() => handleScrollTo('#contact')}
                className="btn-outline"
              >
                Contact Me
              </button>
            </div>
          </div>

          {/* Photo Section */}
          <div className="flex-1 w-full max-w-[400px] lg:max-w-[450px]">
            <div className="glass-card p-0 flex items-center justify-center aspect-square rounded-xl overflow-hidden shadow-2xl" style={{ boxShadow: '0 0 40px rgba(139, 92, 246, 0.3)' }}>
              <img 
                src={`${import.meta.env.BASE_URL}images/ME.png`} 

                alt="Profile" 
                className="w-full h-full object-cover"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <div
          className="relative"
          style={{
            width: '1px',
            height: '40px',
            background: 'rgba(139, 92, 246, 0.15)',
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-electric-violet"
            style={{ animation: 'scroll-dot 1.5s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  );
}
