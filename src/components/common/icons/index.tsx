import "./index.css";

type IconProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  [property: string]: any;
};

export function Icon({
  children,
  style: customStyle,
  ...restProps
}: IconProps) {
  return (
    <div className="icon" style={customStyle} {...restProps}>
      {children}
    </div>
  );
}

type ArrowProps = {
  direction: "up" | "right" | "down" | "left";
};

export function Arrow({ direction = "up", ...restProps }: ArrowProps) {
  return <div className={`arrow arrow--${direction}`} {...restProps}></div>;
}
