import { useRef, useEffect } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement;
      if (
        targetEl.tagName === 'A' ||
        targetEl.tagName === 'BUTTON' ||
        targetEl.closest('a') ||
        targetEl.closest('button') ||
        targetEl.closest('[data-cursor-hover]')
      ) {
        isHovering.current = true;
      }
    };

    const onMouseOut = () => {
      isHovering.current = false;
    };

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.08;
      pos.current.y += (target.current.y - pos.current.y) * 0.08;

      if (cursor) {
        const size = isHovering.current ? 40 : 20;
        const borderColor = isHovering.current ? 'rgba(139, 92, 246, 0.15)' : '#8B5CF6';
        cursor.style.transform = `translate(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px)`;
        cursor.style.width = `${size}px`;
        cursor.style.height = `${size}px`;
        cursor.style.borderColor = borderColor;
        cursor.style.backdropFilter = isHovering.current ? 'blur(2px)' : 'none';
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '20px',
        height: '20px',
        border: '2px solid #8B5CF6',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'width 0.2s, height 0.2s, border-color 0.2s, backdrop-filter 0.2s',
        mixBlendMode: 'difference',
      }}
    />
  );
}
