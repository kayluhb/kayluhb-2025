import { useCallback, useState } from 'react';
import type { MetaFunction } from 'react-router';
import { Input } from '~/components/Input';
import { Particle } from '~/components/Particle';
import { ParticlesContainer } from '~/components/ParticlesContainer';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  letter: string;
  targetX: number;
  targetY: number;
}

// Add new interfaces for touch handling
interface TouchPosition {
  startY: number;
  currentY: number;
}

export const meta: MetaFunction = () => {
  return [
    { title: 'Caleb Brown - Software Engineer Austin, TX - kayluhb.com' },
    {
      name: 'description',
      content:
        'Caleb is an experienced full-stack engineer based in Austin, TX, specializing in web development, systems administration, and technology consulting. With a strong background in leading engineering teams and collaborating with UX designers, designers, and project managers, Caleb ensures seamless website and application development. He offers contracting services for full-stack development and consulting for new business pitches, team growth, and technical assessments. Always eager to explore new technologies and programming languages, Caleb brings expertise and innovation to every project.',
    },
  ];
};

export default function Index() {
  const [word, setWord] = useState('KAYLUHB');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleWordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newWord = e.target.value.toUpperCase();
    setWord(newWord);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  return (
    <div className="relative flex h-[100dvh] w-full flex-col items-center overflow-hidden">
      <div className="sr-only">
        This is an interactive particle animation. Each letter of the text you enter will be displayed as a floating
        particle that responds to mouse or touch input. Use arrow keys to move the interaction point when focused on the
        animation area.
      </div>
      <Input
        onChange={handleWordChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        value={word}
      />
      <ParticlesContainer isInputFocused={isInputFocused} word={word} />
    </div>
  );
}
