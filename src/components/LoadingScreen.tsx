import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setVisible(false);
        onComplete();
      }, 500);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#050508',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}
    >
      <div
        style={{
          width: '60px',
          height: '60px',
          border: '2px solid rgba(165, 243, 252, 0.3)',
          borderRadius: '50%',
          borderTopColor: '#A5F3FC',
          animation: 'spin 1s linear infinite',
        }}
      />
      <div
        style={{
          marginTop: '24px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.875rem',
          color: '#CBD5E1',
          letterSpacing: '0.08em',
        }}
      >
        INITIALIZING
        <span style={{ animation: 'blink 1s step-end infinite' }}>...</span>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
