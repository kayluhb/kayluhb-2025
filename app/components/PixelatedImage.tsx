import { memo, useCallback, useEffect, useRef, useState } from 'react';

interface PixelatedImageProps {
  imageUrl: string;
  gridSize?: number;
}

interface ParticleType {
  color: string;
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  vx: number;
  vy: number;
}

const FORCE_RADIUS = 100;
const SPRING_STRENGTH = 0.1;
const DAMPING = 0.8;
const MOUSE_FORCE = 2;

// Memoized particle component
const Particle = memo(({ color, x, y, size }: { color: string; x: number; y: number; size: number }) => (
  <div
    className="absolute rounded-full"
    style={{
      backgroundColor: color,
      height: `calc(${100 / size}% - 4px)`,
      left: `${x}%`,
      top: `${y}%`,
      transform: 'translate(-50%, -50%)',
      width: `calc(${100 / size}% - 4px)`,
      transition: 'none',
    }}
    aria-hidden="true"
  />
));

Particle.displayName = 'Particle';

export const PixelatedImage = ({ imageUrl, gridSize = 50 }: PixelatedImageProps) => {
  const [particles, setParticles] = useState<ParticleType[]>([]);
  const [aspectRatio, setAspectRatio] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(null);
  const mouseRef = useRef({ x: 0, y: 0, moving: false });

  useEffect(() => {
    const worker = new Worker(new URL('../workers/imageProcessor.ts', import.meta.url));
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      worker.postMessage({
        imageData: imageData.data,
        width: canvas.width,
        height: canvas.height,
        gridSize,
      });
    };

    worker.onmessage = (e) => {
      setParticles(e.data);
      worker.terminate();
    };

    image.src = imageUrl;

    return () => worker.terminate();
  }, [imageUrl, gridSize]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      mouseRef.current = { x, y, moving: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.moving = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const updateParticlePosition = useCallback((particle: ParticleType) => {
    let { x, y, vx, vy, originalX, originalY } = particle;

    if (mouseRef.current.moving) {
      const dx = mouseRef.current.x - x;
      const dy = mouseRef.current.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < FORCE_RADIUS) {
        const force = (1 - distance / FORCE_RADIUS) * MOUSE_FORCE;
        vx -= (dx / distance) * force;
        vy -= (dy / distance) * force;
      }
    }

    // Spring force towards original position
    const dx = originalX - x;
    const dy = originalY - y;
    vx += dx * SPRING_STRENGTH;
    vy += dy * SPRING_STRENGTH;

    // Apply damping
    vx *= DAMPING;
    vy *= DAMPING;

    // Update position
    x += vx;
    y += vy;

    return { ...particle, x, y, vx, vy };
  }, []);

  useEffect(() => {
    const updateParticles = () => {
      setParticles((currentParticles) => {
        // Only update if mouse is moving or particles are not at rest
        const needsUpdate =
          mouseRef.current.moving || currentParticles.some((p) => Math.abs(p.vx) > 0.01 || Math.abs(p.vy) > 0.01);

        if (!needsUpdate) return currentParticles;

        return currentParticles.map(updateParticlePosition);
      });

      animationFrameRef.current = requestAnimationFrame(updateParticles);
    };

    animationFrameRef.current = requestAnimationFrame(updateParticles);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateParticlePosition]);

  return (
    <div
      className="fixed inset-0 flex h-full w-full items-center justify-center"
      role="region"
      aria-label="Interactive pixelated image"
    >
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
      <div
        ref={containerRef}
        className="relative h-full max-h-[600px] w-full max-w-[600px]"
        style={{
          aspectRatio: `${1 / aspectRatio}`,
        }}
        role="img"
        aria-label="Pixelated interactive image that responds to mouse movement"
        tabIndex={0}
        onKeyDown={(e) => {
          // Add keyboard controls for interacting with the image
          if (e.key === 'Enter' || e.key === ' ') {
            // Toggle interaction mode
            mouseRef.current.moving = !mouseRef.current.moving;
          }
        }}
      >
        {particles.map((particle, index) => (
          <Particle key={index} color={particle.color} x={particle.x} y={particle.y} size={gridSize} />
        ))}
      </div>
    </div>
  );
};
