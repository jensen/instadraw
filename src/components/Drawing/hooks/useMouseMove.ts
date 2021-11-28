import { useEffect } from "react";

export default function useMouseMove(element, cb) {
  useEffect(() => {
    if (element) {
      element.addEventListener("mousemove", cb);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", cb);
      }
    };
  }, [element, cb]);
}
