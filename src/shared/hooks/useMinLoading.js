import { useEffect, useRef, useState } from 'react';

/**
 * Keeps loading=true for at least `minMs` to avoid flicker.
 */
export function useMinLoading(isLoading, minMs = 800) {
  const [visible, setVisible] = useState(Boolean(isLoading));
  const startRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (isLoading) {
      startRef.current = Date.now();
      setVisible(true);
      return undefined;
    }

    const elapsed = Date.now() - (startRef.current || Date.now());
    const remaining = Math.max(0, minMs - elapsed);

    if (remaining === 0) {
      setVisible(false);
      return undefined;
    }

    timeoutRef.current = window.setTimeout(() => {
      setVisible(false);
      timeoutRef.current = null;
    }, remaining);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    };
  }, [isLoading, minMs]);

  return visible;
}

