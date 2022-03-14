import React from "react";
import { useToggle } from "../../../hooks/useToggle";
import { Arrow } from "../arrow";
import "./Collapsible.css";

type CollapsibleProps = {
  defaultIsOpen: boolean;
  headerContent: React.ReactNode;
  children: React.ReactNode;
};

function Collapsible({
  defaultIsOpen = false,
  headerContent,
  children,
}: CollapsibleProps): React.ReactElement {
  const { isOpen, toggle } = useToggle(defaultIsOpen);

  return (
    <div className="collapsible">
      <div className="collapsible__header" onClick={toggle}>
        <Arrow direction={isOpen ? "down" : "right"} />
        {headerContent}
      </div>
      <div className="collapsible__content">{isOpen && children}</div>
    </div>
  );
}

export { Collapsible };
