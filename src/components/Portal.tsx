import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const portalElem = document.getElementById("modal");

type Props = {
  children: React.ReactNode;
};

export function Portal({ children }: Props) {
  const el = useRef<HTMLDivElement>(document.createElement("div"));

  useEffect(() => {
    const element = el.current;

    portalElem?.appendChild(element);

    return () => {
      portalElem?.removeChild(element);
    };
  }, []);

  return ReactDOM.createPortal(children, el.current);
}
