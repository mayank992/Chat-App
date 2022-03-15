import ReactDOM from "react-dom";
import "./Modal.css";

const modalRoot = document.getElementById("modal-root");

type ModalBaseProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

export function ModalBase({ isOpen, children }: ModalBaseProps) {
  if (!isOpen || !modalRoot) {
    return <></>;
  }

  return ReactDOM.createPortal(
    <div
      className="modal-wrapper"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </div>,
    modalRoot
  );
}

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({
  title,
  isOpen,
  onClose,
  children,
}: ModalProps): React.ReactElement {
  return (
    <ModalBase isOpen={isOpen}>
      <div className="modal">
        <header className="modal__hedear">
          <h2>{title}</h2>
          <div className="modal__hedear-close-btn" onClick={onClose}>
            X
          </div>
        </header>
        <div className="modal__body">{children}</div>
      </div>
    </ModalBase>
  );
}
