export function withStopPropagation(fn) {
  return (event) => {
    event.stopPropagation();

    if (fn) {
      fn(event);
    }
  };
}
