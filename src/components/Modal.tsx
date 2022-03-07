import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const modalElem = document.getElementById("modal");

type Props = {
  children: React.ReactNode;
};

export function Modal({ children }: Props) {
  const el = useRef<HTMLDivElement>(document.createElement("div"));

  useEffect(() => {
    const element = el.current;

    modalElem?.appendChild(element);

    return () => {
      modalElem?.removeChild(element);
    };
  }, []);

  return ReactDOM.createPortal(children, el.current);
}
