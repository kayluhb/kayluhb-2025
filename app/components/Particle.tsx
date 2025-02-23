import { memo } from 'react';

interface ParticleProps {
  x: number;
  y: number;
  letter: string;
}

export const Particle = memo(({ x, y, letter }: ParticleProps) => (
  <div
    className="user-select-none absolute flex h-10 w-10 items-center justify-center rounded-lg bg-gray-500 text-base text-white"
    style={{
      transform: `translate3d(${x}px, ${y}px, 0)`,
      willChange: 'transform',
    }}
  >
    {letter}
  </div>
));

Particle.displayName = 'Particle';
