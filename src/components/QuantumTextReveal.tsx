import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface QuantumTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}

export default function QuantumTextReveal({ text, className = '', delay = 0, style }: QuantumTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const chars = text.split('');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const charElements = Array.from(container.querySelectorAll('span'));
    gsap.set(charElements, { opacity: 0, z: -800, rotateX: -90, transformOrigin: '50% 50%' });

    const tl = gsap.timeline({ delay: delay || 0 });
    tl.to(charElements, {
      opacity: 1,
      z: 0,
      rotateX: 0,
      duration: 1.2,
      ease: 'back.out(1.7)',
      stagger: 0.03,
    });

    return () => {
      tl.kill();
    };
  }, [text, delay]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ perspective: '1000px', ...style }}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
