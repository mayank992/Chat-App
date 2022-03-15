import React from "react";
import "./index.css";

type AddIconProps = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

export function AddIcon({ onClick }: AddIconProps) {
  return (
    <div className="icon" onClick={onClick}>
      +
    </div>
  );
}

type ArrowProps = {
  direction: "up" | "right" | "down" | "left";
};

export function Arrow({ direction = "up", ...restProps }: ArrowProps) {
  return <div className={`arrow arrow--${direction}`} {...restProps}></div>;
}
