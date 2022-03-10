import "./index.css";

type ArrowProps = {
  direction: "up" | "right" | "down" | "left";
};

export function Arrow({ direction = "up", ...restProps }: ArrowProps) {
  return <div className={`arrow arrow--${direction}`} {...restProps}></div>;
}
