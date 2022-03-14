import { useState, useCallback } from "react";

export function useToggle(initialState: boolean): {
  isOpen: boolean;
  toggle: () => void;
} {
  const [open, setOpen] = useState<boolean>(initialState);

  const toggle = useCallback(() => {
    setOpen((val) => !val);
  }, []);

  return { isOpen: open, toggle };
}
