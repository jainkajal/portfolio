import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlitchBadge from '@/components/GlitchBadge';
import HolographicTilt from '@/components/HolographicTilt';

gsap.registerPlugin(ScrollTrigger);

const bioText =
  'Software Engineer with 1.5+ years of experience contributing to the development, enhancement, and scaling of real-world digital products across fintech, SaaS, and platform-based ecosystems. Built and shipped features for RSKPay, OnMarQ360, and PairPinnacle — products serving 100,000+ users. Co-author of published research papers. Passionate about building scalable applications, solving complex technical problems, and creating measurable impact.';

function TerminalCard() {
  const [terminalText, setTerminalText] = useState('');
  const [jsonVisible, setJsonVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const jsonRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTyping();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const startTyping = () => {
    const lines = [
      { prompt: '$ whoami', output: '> Software Engineer | Full Stack & Product Engineer', color: '#8B5CF6' },
      { prompt: '$ cat location.txt', output: '> Nagpur, India', color: '#A5F3FC' },
      { prompt: '$ cat experience.json', output: '', color: '' },
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let currentText = '';

    const typeLine = () => {
      if (lineIndex >= lines.length) {
        setTimeout(() => setJsonVisible(true), 200);
        return;
      }

      const line = lines[lineIndex];
      const fullLine = `${line.prompt}\n`;

      if (charIndex < fullLine.length) {
        currentText += fullLine[charIndex];
        charIndex++;
        setTerminalText(currentText);
        setTimeout(typeLine, 40);
      } else {
        if (line.output) {
          currentText += `${line.output}\n\n`;
          setTerminalText(currentText);
        }
        charIndex = 0;
        lineIndex++;
        setTimeout(typeLine, 300);
      }
    };

    typeLine();
  };

  return (
    <div ref={cardRef}>
      <HolographicTilt className="glass-card p-6 max-w-[400px] mx-auto">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[rgba(139,92,246,0.15)]">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="font-mono text-xs text-muted-silver ml-2">~/kajal-jain/about</span>
        </div>

        {/* Terminal Body */}
        <div className="font-mono text-sm min-h-[280px]">
          <pre className="whitespace-pre-wrap text-pure-white overflow-hidden">
            {terminalText}
            <span className="animate-blink">_</span>
          </pre>

          {jsonVisible && (
            <pre
              ref={jsonRef}
              className="whitespace-pre-wrap text-sm mt-1"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="text-ice-blue">{'{'}</span>
              {'\n'}
              <JSONLine label="experience" value="18+ months" isString />
              <span className="text-ice-blue">{'}'}</span>
            </pre>
          )}
        </div>
      </HolographicTilt>
    </div>
  );
}

function JSONLine({ label, value, isString }: { label: string; value: string; isString: boolean }) {
  return (
    <span className="block ml-4">
      <span className="text-ice-blue">"{label}"</span>
      <span className="text-muted-silver">: </span>
      {isString ? (
        <span className="text-electric-violet">"{value}"</span>
      ) : (
        <span className="text-pink-400">{value}</span>
      )}
      <span className="text-muted-silver">,</span>
      {'\n'}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !leftRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });

    tl.from(leftRef.current, {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ minHeight: '100vh', padding: '80px 0 20px 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
          {/* Left Column - Bio */}
          <div ref={leftRef}>
            <div className="label-style mb-4">ABOUT ME</div>
            <GlitchBadge text="1.5+ YEARS" label="EXPERIENCE" />

            <p className="font-mono text-base text-muted-silver leading-relaxed mb-8">
              {bioText}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="glass-card p-6 text-center">
                <div className="font-display font-bold text-3xl text-green-400 mb-2">
                  18+
                </div>
                <div className="font-mono text-xs text-muted-silver">
                  Months Experience
                </div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="font-display font-bold text-3xl text-green-400 mb-2">
                  5+
                </div>
                <div className="font-mono text-xs text-muted-silver">
                  Built & Contributed
                </div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="font-display font-bold text-3xl text-green-400 mb-2">
                  2+
                </div>
                <div className="font-mono text-xs text-muted-silver">
                  Publications
                </div>
              </div>
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-mono font-bold text-sm text-electric-violet inline-flex items-center gap-1 group"
            >
              Let's Connect
              <span className="transition-transform duration-200 group-hover:translate-x-2">→</span>
            </a>
          </div>

          {/* Right Column - Terminal */}
          <div>
            <TerminalCard />
          </div>
        </div>
      </div>
    </section>
  );
}
