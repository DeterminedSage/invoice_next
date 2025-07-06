import { useEffect, useState } from 'react';

/**
 * Custom hook to handle hydration mismatches
 * Returns true only after the component has mounted on the client
 */
export function useHydrationSafe() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}

/**
 * Component wrapper that only renders children after hydration is complete
 * Useful for components that might have hydration mismatches
 */
export function HydrationSafe({ children }: { children: React.ReactNode }) {
  const isMounted = useHydrationSafe();

  if (!isMounted) {
    return null;
  }

  return children;
}
