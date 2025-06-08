import { useEffect } from 'react';

/**
 * Hook to prevent body scrolling when a modal or overlay is open
 * @returns {void}
 */
export function useScrollLock(): void {
  useEffect(() => {
    // Save original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    
    // Cleanup function to restore original body overflow
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
}