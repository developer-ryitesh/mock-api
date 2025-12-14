import { useEffect } from "react";

type RefetchFn = () => void;

export function useWindowFocus(fetchFn: RefetchFn) {
   useEffect(() => {
      const onFocus = () => fetchFn();
      window.addEventListener("focus", onFocus);
      return () => window.removeEventListener("focus", onFocus);
   }, [fetchFn]);
}
