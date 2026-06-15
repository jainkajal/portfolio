import { useRef, useState, useEffect } from 'react';

interface HolographicTiltProps {
  children: React.ReactNode;
  className?: string;
}

export default function HolographicTilt({ children, className = '' }: HolographicTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      cardRef.current.style.setProperty('--rotateX', `${-y * 15}deg`);
      cardRef.current.style.setProperty('--rotateY', `${x * 15}deg`);
      cardRef.current.style.setProperty('--glowX', `${x * 50}%`);
      cardRef.current.style.setProperty('--glowY', `${-y * 50}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: 'perspective(1000px) rotateX(var(--rotateX, 0deg)) rotateY(var(--rotateY, 0deg))',
        transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '-20px',
          background: 'radial-gradient(circle at var(--glowX, 50%) var(--glowY, 50%), rgba(139, 92, 246, 0.15), transparent 60%)',
          pointerEvents: 'none',
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, transform: 'translateZ(30px)' }}>
        {children}
      </div>
    </div>
  );
}
