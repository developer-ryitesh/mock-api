import { useEffect, useRef } from "react";

interface UsePollingProps {
   callback: () => void | Promise<void>;
   delay?: number;
}

export function usePolling({ callback, delay = 5000 }: UsePollingProps): void {
   const savedCallback = useRef<(() => void | Promise<void>) | null>(null);

   // Keep latest callback
   useEffect(() => {
      savedCallback.current = callback;
   }, [callback]);

   useEffect(() => {
      if (delay === null) return;

      // Run immediately
      savedCallback.current?.();

      const intervalId = setInterval(() => {
         savedCallback.current?.();
      }, delay);

      return () => clearInterval(intervalId);
   }, [delay]);
}
