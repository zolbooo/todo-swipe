import { useCallback, useRef, useEffect } from 'react';

export function useCallbackRef(
  fn: (...args: any[]) => any,
  deps: ReadonlyArray<any>,
) {
  const cb = useCallback(fn, deps);
  const ref = useRef(cb);
  useEffect(() => {
    ref.current = cb;
  }, [cb]);
  return ref;
}
