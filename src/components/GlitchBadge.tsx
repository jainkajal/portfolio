interface GlitchBadgeProps {
  text: string;
  label: string;
}

export default function GlitchBadge({ text, label }: GlitchBadgeProps) {
  return (
    <div
      style={{
        position: 'relative',
        padding: '16px 24px',
        background: '#0A0E27',
        border: '1px solid rgba(165, 243, 252, 0.3)',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'inline-block',
        marginBottom: '16px',
        boxShadow: '0 0 15px rgba(0, 255, 255, 0.1)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      <div
        className="glitch-text"
        data-text={text}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: '1.5rem',
          color: '#F8FAFC',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {text}
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.625rem',
          color: '#A5F3FC',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginTop: '4px',
          opacity: 0.8,
        }}
      >
        {label}
      </div>
    </div>
  );
}
