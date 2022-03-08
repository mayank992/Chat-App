import React from "react";
import "./List.css";

type ListProps = {
  children: React.ReactNode;
  style?: { [property: string]: string };
  [property: string]: any;
};

export function List({
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

export function ListItem({
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
