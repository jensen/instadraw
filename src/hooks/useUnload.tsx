import { useEffect } from "react";

export default function useUnload(callback: () => any): void {
  useEffect(() => {
    window.addEventListener("unload", callback);
    return () => {
      window.removeEventListener("unload", callback);
    };
  }, [callback]);
}
