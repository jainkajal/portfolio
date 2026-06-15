import { useState, useEffect, useRef } from 'react';

interface CountUpRevealProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function CountUpReveal({ target, suffix = '', duration = 2.5, className = '' }: CountUpRevealProps) {
  const [display, setDisplay] = useState('00');
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const durationMs = duration * 1000;
    const startTime = Date.now();
    const targetStr = target.toLocaleString();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      let result = '';
      for (let i = 0; i < targetStr.length; i++) {
        const charProgress = Math.max(0, Math.min(1, (eased - i * 0.1) / 0.1));
        if (targetStr[i] === ',') {
          result += ',';
        } else if (charProgress >= 1) {
          result += targetStr[i];
        } else {
          result += Math.floor(Math.random() * 10).toString();
        }
      }

      setDisplay(result);

      if (progress >= 1) {
        clearInterval(interval);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [hasStarted, target, duration]);

  return (
    <span ref={ref} className={className}>
      {hasStarted ? display + suffix : '00' + suffix}
    </span>
  );
}
