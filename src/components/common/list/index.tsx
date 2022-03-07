import React from "react";
import "./List.css";

type ListProps = {
  children: React.ReactNode;
  style?: { [property: string]: string };
  [property: string]: any;
};

function List({
  children,
  style: customStyle = {},
  ...restProps
}: ListProps): React.ReactElement {
  const listStyle = {
    ...customStyle,
  };

  return (
    <ul className="list" style={listStyle} {...restProps}>
      {children}
    </ul>
  );
}

type ListItemProps = {
  isActive?: boolean;
  children: React.ReactNode;
  style?: { [property: string]: string };
  [property: string]: any;
};

function ListItem({
  isActive = false,
  children,
  style: customStyle = {},
  ...restProps
}: ListItemProps): React.ReactElement {
  const listItemStyle = {
    ...customStyle,
  };

  return (
    <li
      className={
        "list__list-item" + (isActive ? " list__list-item--active" : "")
      }
      style={listItemStyle}
      {...restProps}
    >
      {children}
    </li>
  );
}

type ListItemIconProps = {
  children: React.ReactNode;
  style?: { [property: string]: string };
};

function ListItemIcon({
  children,
  style: customStyle = {},
}: ListItemIconProps): React.ReactElement {
  const listItemIconStyle = {
    ...customStyle,
  };

  return (
    <div className="list__list-item-icon" style={listItemIconStyle}>
      {children}
    </div>
  );
}

type ListItemTextProps = {
  children: React.ReactNode;
};

function ListItemText({ children }: ListItemTextProps): React.ReactElement {
  return <div className="list__list-item-text">{children}</div>;
}

type ListItemOptionsProps = {
  children: React.ReactNode;
};

function ListItemOptions({
  children,
}: ListItemOptionsProps): React.ReactElement {
  return <div className="list__list-item-options">{children}</div>;
}

List.Item = ListItem;
List.ItemIcon = ListItemIcon;
List.ItemText = ListItemText;
List.ItemOptions = ListItemOptions;

export { List };
