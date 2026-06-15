import { useState, useEffect } from 'react';

interface TypewriterEngineProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  showCursor?: boolean;
  style?: React.CSSProperties;
}

export default function TypewriterEngine({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className = '',
  showCursor = true,
  style,
}: TypewriterEngineProps) {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting && text === '') {
      setIsDeleting(false);
      setPhraseIndex((phraseIndex + 1) % phrases.length);
    } else if (isDeleting && text !== '') {
      timeout = setTimeout(() => {
        setText(text.slice(0, -1));
      }, deletingSpeed);
    } else if (!isDeleting && text === currentPhrase) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (!isDeleting && text !== currentPhrase) {
      timeout = setTimeout(() => {
        setText(currentPhrase.slice(0, text.length + 1));
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [phrases, phraseIndex, isDeleting, text, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className} style={style}>
      {text}
      {showCursor && (
        <span
          style={{
            display: 'inline-block',
            width: '2px',
            height: '1em',
            background: '#A5F3FC',
            marginLeft: '2px',
            animation: 'blink 1s step-end infinite',
            verticalAlign: 'text-bottom',
          }}
        />
      )}
    </span>
  );
}
