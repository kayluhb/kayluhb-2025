import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Particle } from '~/components/Particle';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  letter: string;
  targetX: number;
  targetY: number;
}

interface TouchPosition {
  startY: number;
  currentY: number;
}

type ParticlesContainerProps = {
  isInputFocused: boolean;
  word: string;
};

const CONSTANTS = {
  CENTER_FORCE: 0.03, // Reduced from 0.05
  FRICTION: 0.97, // Increased from 0.95
  INITIAL_VELOCITY_RANGE: 4,
  KEYBOARD_STEP: 20,
  LETTER_GAP: 4,
  LETTER_WIDTH: 40,
  MOUSE_RADIUS: 40,
  PULL_THRESHOLD: 100,
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [touchPos, setTouchPos] = useState<TouchPosition | null>(null);
  const pullThreshold = CONSTANTS.PULL_THRESHOLD;

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

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (window.scrollY === 0) {
      setTouchPos({
        startY: touch.clientY,
        currentY: touch.clientY,
      });
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchPos) return;

      const touch = e.touches[0];
      setTouchPos((prev) => ({
        ...prev!,
        currentY: touch.clientY,
      }));

      const pullDistance = touch.clientY - touchPos.startY;
      if (pullDistance > 0 && window.scrollY === 0) {
        e.preventDefault();
        containerRef.current!.style.transform = `translateY(${Math.min(pullDistance * 0.5, pullThreshold)}px)`;
      }
    },
    [touchPos, pullThreshold],
  );

  const handleTouchEnd = useCallback(async () => {
    if (!touchPos) return;

    const pullDistance = touchPos.currentY - touchPos.startY;
    if (pullDistance > pullThreshold) {
      setIsRefreshing(true);
      window.location.reload();
      initializeParticles(word);
      setIsRefreshing(false);
    }

    containerRef.current!.style.transform = 'translateY(0)';
    setTouchPos(null);
  }, [touchPos, pullThreshold, initializeParticles, word]);

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

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent | Touch) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = 'clientX' in e ? e.clientX : e.pageX;
        const y = 'clientY' in e ? e.clientY : e.pageY;
        setMousePos({
          x: x - rect.left,
          y: y - rect.top,
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const target = touch.target as HTMLElement;
      if (target.closest('[role="application"]')) {
        e.preventDefault();
        handleMouseMove(touch);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const target = touch.target as HTMLElement;
      if (target.closest('[role="application"]')) {
        e.preventDefault();
        handleMouseMove(touch);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
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
    animate();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  return (
    <>
      {isRefreshing && (
        <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-sm bg-gray-800 px-4 py-2 text-white">
          Refreshing...
        </div>
      )}
      <div
        aria-label="Particle animation area"
        className="relative h-[100dvh] w-full touch-none overflow-hidden"
        onKeyDown={handleKeyboardNavigation}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={containerRef}
        role="application"
        tabIndex={0}
      >
        {particles.map((particle, index) => (
          <Particle key={`${particle.letter}-${index}`} x={particle.x} y={particle.y} letter={particle.letter} />
        ))}
      </div>
    </>
  );
});
