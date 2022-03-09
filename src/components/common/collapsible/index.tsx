import React from "react";
import { useToggle } from "../../../hooks/useToggle";
import { Arrow } from "../icons";
import "./Collapsible.css";

type CollapsibleHeaderProps = {
  isOpen?: boolean;
  toggle?: () => void;
  style?: { [property: string]: string };
  children: React.ReactNode;
};

function CollapsibleHeader({
  isOpen = false,
  toggle = () => {},
  style: customStyle = {},
  children,
}: CollapsibleHeaderProps): React.ReactElement {
  return (
    <div className="collapsible__header" onClick={toggle} style={customStyle}>
      <Arrow direction={isOpen ? "down" : "right"}></Arrow>
      {children}
    </div>
  );
}

type CollapsibleContentProps = {
  isOpen?: boolean;
  toggle?: () => void;
  style?: { [property: string]: string };
  children: React.ReactNode;
};

function CollapsibleContent({
  isOpen = false,
  toggle = () => {},
  style: customStyle = {},
  children,
}: CollapsibleContentProps): React.ReactElement {
  return <div style={customStyle}>{isOpen && children}</div>;
}

type CollapsibleProps = {
  defaultIsOpen: boolean;
  children: React.ReactElement[];
};

function Collapsible({
  defaultIsOpen = false,
  children,
}: CollapsibleProps): React.ReactElement {
  const { isOpen, toggle } = useToggle(defaultIsOpen);

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { isOpen, toggle });
      })}
    </div>
  );
}

Collapsible.Header = CollapsibleHeader;
Collapsible.Content = CollapsibleContent;

export { Collapsible };
