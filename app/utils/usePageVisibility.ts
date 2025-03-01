import { useEffect, useState } from 'react';

export function usePageVisibility() {
  // Check if document is available, default to visible if not
  const [isVisible, setIsVisible] = useState(() => {
    return typeof document !== 'undefined' ? !document.hidden : true;
  });

  useEffect(() => {
    // Only set up event listeners if document is available
    if (typeof document === 'undefined') return;

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    // Initial check
    setIsVisible(!document.hidden);

    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
}
