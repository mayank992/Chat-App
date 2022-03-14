import { useState, useCallback } from "react";

export function useWindow<T extends string>() {
  const [window, setWindow] = useState<T | "">("");

  const openWindow = useCallback((windowName: T) => {
    setWindow(windowName);
  }, []);

  const closeWindow = useCallback(() => {
    setWindow("");
  }, []);

  return { window, openWindow, closeWindow };
}
