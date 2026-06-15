import { useRef, useEffect } from 'react';

interface TerminalDecryptProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TerminalDecrypt({ text, className = '', delay = 0 }: TerminalDecryptProps) {
  const elementRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    const el = elementRef.current;
    if (!el) return;

    const timer = setTimeout(() => {
      let iteration = 0;
      const interval = setInterval(() => {
        el.innerText = text
          .split('')
          .map((_letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);

      return () => clearInterval(interval);
    }, (delay || 0) * 1000);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <h3 ref={elementRef} className={className}>
      {text}
    </h3>
  );
}
