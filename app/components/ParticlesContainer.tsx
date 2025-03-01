import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Particle } from '~/components/Particle';
import { usePageVisibility } from '~/utils/usePageVisibility';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  letter: string;
  targetX: number;
  targetY: number;
}

type ParticlesContainerProps = {
  isInputFocused: boolean;
  word: string;
};

const CONSTANTS = {
  CENTER_FORCE: 0.03,
  FRICTION: 0.97,
  INITIAL_VELOCITY_RANGE: 4,
  KEYBOARD_STEP: 20,
  LETTER_GAP: 4,
  LETTER_WIDTH: 40,
  MOUSE_RADIUS: 40,
  DAMPING_DISTANCE: 5,
} as const;

const debounce = (func: Function, wait: number) => {
  let timeout: number | null = null;
  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      func(...args);
    }, wait);
  };
};

export const ParticlesContainer: React.FC<ParticlesContainerProps> = memo(({ isInputFocused, word }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isPageVisible = usePageVisibility();

  const initializeParticles = useCallback((newWord: string) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const wordWidth = newWord.length * CONSTANTS.LETTER_WIDTH + (newWord.length - 1) * CONSTANTS.LETTER_GAP;

    const startX = (rect.width - wordWidth) / 2;
    const centerY = rect.height / 2;

    const initialParticles = newWord.split('').map((letter, index) => ({
      x: rect.width / 2,
      y: rect.height / 2,
      vx: (Math.random() - 0.5) * CONSTANTS.INITIAL_VELOCITY_RANGE,
      vy: (Math.random() - 0.5) * CONSTANTS.INITIAL_VELOCITY_RANGE,
      letter,
      targetX: startX + index * (CONSTANTS.LETTER_WIDTH + CONSTANTS.LETTER_GAP),
      targetY: centerY,
    }));
    setParticles(initialParticles);
  }, []);

  const handleResize = useCallback(
    debounce(() => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const letterWidth = CONSTANTS.LETTER_WIDTH;
      const letterGap = CONSTANTS.LETTER_GAP;
      const wordWidth = word.length * letterWidth + (word.length - 1) * letterGap;

      const startX = (rect.width - wordWidth) / 2;
      const centerY = rect.height / 2;

      setParticles((prevParticles) =>
        prevParticles.map((particle, index) => ({
          ...particle,
          targetX: startX + index * (letterWidth + letterGap),
          targetY: centerY,
        })),
      );
    }, 100),
    [word],
  );

  const handleKeyboardNavigation = useCallback((e: React.KeyboardEvent) => {
    const step = CONSTANTS.KEYBOARD_STEP;
    switch (e.key) {
      case 'ArrowUp':
        setMousePos((prev) => ({ ...prev, y: prev.y - step }));
        break;
      case 'ArrowDown':
        setMousePos((prev) => ({ ...prev, y: prev.y + step }));
        break;
      case 'ArrowLeft':
        setMousePos((prev) => ({ ...prev, x: prev.x - step }));
        break;
      case 'ArrowRight':
        setMousePos((prev) => ({ ...prev, x: prev.x + step }));
        break;
    }
  }, []);

  const animate = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseRadius = CONSTANTS.MOUSE_RADIUS;
    const centerForce = CONSTANTS.CENTER_FORCE;
    const centerY = rect.height / 2;

    setParticles((prevParticles) => {
      let hasChanged = false;
      const newParticles = prevParticles.map((particle) => {
        let { x, y, vx, vy, targetX, targetY } = particle;

        if (isInputFocused) {
          targetY = centerY;
        }

        // Position updates based on velocity
        x += vx;
        y += vy;

        if (x <= 0) {
          x = 0;
          vx = Math.abs(vx);
        } else if (x >= rect.width) {
          x = rect.width;
          vx = -Math.abs(vx);
        }

        if (y <= 0) {
          y = 0;
          vy = Math.abs(vy);
        } else if (y >= rect.height) {
          y = rect.height;
          vy = -Math.abs(vy);
        }

        const dx = x - mousePos.x;
        const dy = y - mousePos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouseRadius - distance) * 0.1;
          vx += Math.cos(angle) * force;
          vy += Math.sin(angle) * force;
        }

        // Center force pulls particles toward their target position
        const toTargetX = targetX - x;
        const toTargetY = targetY - y;
        const targetDistance = Math.sqrt(toTargetX * toTargetX + toTargetY * toTargetY);

        if (targetDistance !== 0) {
          const scaledCenterForce = centerForce * (1 + targetDistance / 100);
          vx += (toTargetX / targetDistance) * scaledCenterForce;
          vy += (toTargetY / targetDistance) * scaledCenterForce;
        }

        // Add damping when close to target
        if (targetDistance < CONSTANTS.DAMPING_DISTANCE) {
          vx *= 0.8; // Additional friction when close
          vy *= 0.8;
        }

        // Friction applies each frame
        vx *= CONSTANTS.FRICTION;
        vy *= CONSTANTS.FRICTION;

        if (x !== particle.x || y !== particle.y || vx !== particle.vx || vy !== particle.vy) {
          hasChanged = true;
        }

        return { ...particle, x, y, vx, vy };
      });

      return hasChanged ? newParticles : prevParticles;
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [mousePos, isInputFocused]);

  useEffect(() => {
    if (!containerRef.current) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect && e.target instanceof HTMLElement && e.target.closest('[role="application"]')) {
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    initializeParticles(word);
  }, [word, initializeParticles]);

  useEffect(() => {
    if (!isPageVisible) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    animate();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, isPageVisible]);

  return (
    <div
      aria-label="Particle animation area"
      className="relative h-[100dvh] w-full touch-none overflow-hidden"
      onKeyDown={handleKeyboardNavigation}
      ref={containerRef}
      role="application"
      tabIndex={0}
    >
      {particles.map((particle, index) => (
        <Particle key={`${particle.letter}-${index}`} x={particle.x} y={particle.y} letter={particle.letter} />
      ))}
    </div>
  );
});
