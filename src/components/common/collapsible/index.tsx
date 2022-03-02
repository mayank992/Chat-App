import React from "react";
import { useToggle } from "../../../hooks/useToggle";
import "./Collapsible.css";

// Compound component and render props

type CollapsibleHeaderProps = {
  isOpen?: boolean;
  toggle?: () => void;
  style?: { [property: string]: string };
  render: (isOpen?: boolean, toggle?: () => void) => React.ReactNode;
};

function CollapsibleHeader({
  isOpen = false,
  toggle = () => {},
  style: customStyle = {},
  render,
}: CollapsibleHeaderProps): React.ReactElement {
  return (
    <div className="collapsible__header" onClick={toggle} style={customStyle}>
      {render(isOpen, toggle)}
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
  return (
    <div className="collapsible__content" style={customStyle}>
      {isOpen && children}
    </div>
  );
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
    <div className="collapsible">
      {React.Children.map(children, (child) => {
        // TODO - Validate types of implicit childrens
        return React.cloneElement(child, { isOpen, toggle });
      })}
    </div>
  );
}

Collapsible.Header = CollapsibleHeader;
Collapsible.Content = CollapsibleContent;

export { Collapsible };
