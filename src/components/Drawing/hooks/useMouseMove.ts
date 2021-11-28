import { useEffect } from "react";

export default function useMouseMove(
  element: HTMLCanvasElement | undefined,
  cb: (event: MouseEvent) => void
) {
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
