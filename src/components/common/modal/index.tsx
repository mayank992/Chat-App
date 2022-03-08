import React, { useState, createContext, useContext } from "react";
import { Icon } from "../../common/icons/index";
import { Portal } from "../../Portal";
import "./Modal.css";

type ModalContextType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
];

const ModalContext = createContext<ModalContextType>([false, () => {}]);

export function Modal(props: any): React.ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />;
}

type ModalButtonType = {
  children: React.ReactElement;
};

export function ModalOpenButton({
  children: child,
}: ModalButtonType): React.ReactElement {
  const [, setIsOpen] = useContext(ModalContext);

  return React.cloneElement(child, {
    onClick: (e: any) => {
      e.stopPropagation();
      setIsOpen(true);
    },
  });
}

export function ModalDismissButton({
  children: child,
}: ModalButtonType): React.ReactElement {
  const [, setIsOpen] = useContext(ModalContext);

  return React.cloneElement(child, {
    onClick: (e: any) => {
      e.stopPropagation();
      setIsOpen(false);
    },
  });
}

export function ModalContentsBase(props: any): React.ReactElement {
  const [isOpen] = useContext(ModalContext);

  return <div>{isOpen && <Portal>{props.children}</Portal>}</div>;
}

export function ModalContents({
  children,
  title,
}: {
  children: React.ReactElement;
  title: string;
}): React.ReactElement {
  return (
    <ModalContentsBase>
      <div
        className="modal-container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal">
          <header className="modal-hedear">
            <h2>{title}</h2>
            <ModalDismissButton>
              <Icon>X</Icon>
            </ModalDismissButton>
          </header>
          {children}
        </div>
      </div>
    </ModalContentsBase>
  );
}
