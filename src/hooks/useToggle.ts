import { useState, useCallback } from "react";

export function useToggle(initialState: boolean): {
  open: boolean;
  toggle: () => void;
} {
  const [open, setOpen] = useState<boolean>(initialState);

  const toggle = useCallback(() => {
    setOpen((val) => !val);
  }, []);

  return { open, toggle };
}
