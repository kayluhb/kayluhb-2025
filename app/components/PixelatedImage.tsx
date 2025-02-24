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
    className="absolute rounded-full transition-none will-change-transform"
    style={{
      backgroundColor: color,
      height: `calc(${100 / size}% - ${size > 30 ? 4 : 2}px)`, // Smaller gap for mobile
      left: `${x}%`,
      top: `${y}%`,
      transform: 'translate(-50%, -50%)',
      width: `calc(${100 / size}% - ${size > 30 ? 4 : 2}px)`,
    }}
    aria-hidden="true"
  />
));

Particle.displayName = 'Particle';

export const PixelatedImage = ({ imageUrl, gridSize = 50 }: PixelatedImageProps) => {
  const [particles, setParticles] = useState<ParticleType[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(null);
  const mouseRef = useRef({ x: 0, y: 0, moving: false });
  const [worker, setWorker] = useState<Worker | null>(null);

  // Add touch state
  const touchActiveRef = useRef(false);

  useEffect(() => {
    let currentWorker: Worker | null = null;

    const initWorker = async () => {
      try {
        // Dynamic import of the worker
        const WorkerModule = await import('../workers/imageProcessor?worker');
        currentWorker = new WorkerModule.default();
        setWorker(currentWorker);
      } catch (error) {
        console.error('Failed to load worker:', error);
      }
    };

    initWorker();

    return () => {
      if (currentWorker) {
        currentWorker.terminate();
      }
    };
  }, []);

  useEffect(() => {
    if (!worker || !imageUrl) return;

    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = Math.min(image.width, image.height);
      canvas.height = canvas.width;

      // Center crop the image
      const sourceX = (image.width - canvas.width) / 2;
      const sourceY = (image.height - canvas.height) / 2;

      ctx.drawImage(image, sourceX, sourceY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      worker.postMessage({
        imageData: imageData.data,
        width: canvas.width,
        height: canvas.height,
        gridSize,
      });
    };

    worker.onmessage = (e) => {
      console.info('worker.onmessage', e);
      setParticles(e.data);
      worker.terminate();
    };

    image.src = imageUrl;

    return () => worker.terminate();
  }, [worker, imageUrl, gridSize]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      mouseRef.current = { x, y, moving: true };
    };

    const handlePointerLeave = () => {
      mouseRef.current.moving = false;
    };

    const handlePointerDown = () => {
      touchActiveRef.current = true;
      mouseRef.current.moving = true;
    };

    const handlePointerUp = () => {
      touchActiveRef.current = false;
      mouseRef.current.moving = false;
    };

    // Use pointer events instead of mouse events
    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave);
    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointerup', handlePointerUp);

    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  const updateParticlePosition = useCallback((particle: ParticleType) => {
    let { x, y, vx, vy, originalX, originalY } = particle;

    if (mouseRef.current.moving) {
      const dx = mouseRef.current.x - x;
      const dy = mouseRef.current.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < FORCE_RADIUS) {
        // Adjust force based on touch vs mouse
        const forceMultiplier = touchActiveRef.current ? MOUSE_FORCE * 1.5 : MOUSE_FORCE;
        const force = (1 - distance / FORCE_RADIUS) * forceMultiplier;
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
      className="fixed inset-0 flex h-full w-full touch-none items-center justify-center"
      role="region"
      aria-label="Interactive pixelated image"
    >
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
      <div
        ref={containerRef}
        className="relative aspect-square h-full max-h-[300px] w-full max-w-[300px] md:max-h-[600px] md:max-w-[600px]"
        role="img"
        aria-label="Pixelated interactive image that responds to touch and mouse movement"
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
