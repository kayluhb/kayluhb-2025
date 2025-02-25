import { memo, useMemo } from 'react';

export const ImageParticle = memo(({ color, x, y, size }: { color: string; x: number; y: number; size: number }) => {
  const style = useMemo(() => {
    return {
      backgroundColor: color,
      height: `calc(${100 / size}% - ${size > 30 ? 2 : 0}px)`,
      left: `${x}%`,
      top: `${y}%`,
      transform: 'translate(-50%, -50%)',
      width: `calc(${100 / size}% - ${size > 30 ? 2 : 0}px)`,
    };
  }, [size, color, x, y]);
  return (
    <div className="absolute rounded-full transition-none will-change-transform" style={style} aria-hidden="true" />
  );
});

ImageParticle.displayName = 'Particle';
