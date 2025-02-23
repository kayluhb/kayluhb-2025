import { memo } from 'react';
import { cn } from '~/utils/classnames';

interface ParticleProps {
  x: number;
  y: number;
  letter: string;
}

export const Particle = memo(({ x, y, letter }: ParticleProps) => (
  <div
    className={cn('user-select-none absolute flex h-10 w-10 items-center justify-center rounded-lg text-base', {
      ['bg-gray-500 text-white']: letter !== ' ',
    })}
    style={{
      transform: `translate3d(${x}px, ${y}px, 0)`,
      willChange: 'transform',
    }}
  >
    {letter}
  </div>
));

Particle.displayName = 'Particle';
