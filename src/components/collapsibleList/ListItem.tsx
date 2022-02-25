export function ListItemBadge({ text }: { text: string }) {
  return <span className={"list-item__badge"}>{text}</span>;
}

export function ListItemText({ text }: { text: string }) {
  return <p className="list-item__text">{text}</p>;
}

export function ListItemIcon({ src, style }: { src: string; style?: any }) {
  return <img className="list-item__icon" src={src} style={style} />;
}

type ListItemProps = {
  selected: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children: React.ReactNode;
  style?: any;
};

export function ListItem({
  selected,
  onClick,
  children,
  style,
}: ListItemProps) {
  return (
    <dd
      className={"list-item" + (selected ? " list-item--selected" : "")}
      onClick={onClick}
      style={style}
    >
      {children}
    </dd>
  );
}
