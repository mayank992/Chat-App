import { useEffect } from "react";

export function usePolling(cb: () => Promise<void>, deps: any[], ms: number) {
  useEffect(() => {
    let timerId: number;

    (async function poll() {
      await cb();

      timerId = window.setTimeout(poll, ms);
    })();

    return () => {
      clearTimeout(timerId);
    };
  }, []);
}
