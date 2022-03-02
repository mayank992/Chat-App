type IconProps = {
  children: React.ReactNode;
  style?: { [property: string]: string };
  restProps?: { [propName: string]: any };
};

export function Icon({
  children,
  style: customStyle,
  ...restProps
}: IconProps) {
  const iconStyle = {
    height: "100%",
    padding: "5px",
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "object-fit": "contain",
    ...customStyle,
  };

  return (
    <div style={iconStyle} {...restProps}>
      {children}
    </div>
  );
}
