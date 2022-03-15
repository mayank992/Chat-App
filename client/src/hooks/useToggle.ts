import { useState, useCallback } from "react";

export function useToggle(initialState: boolean): {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
} {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const toggle = useCallback(() => {
    setIsOpen((val) => !val);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, toggle, open, close };
}
