import ReactDOM from "react-dom";
import "./Modal.css";

type ModalBaseProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const modalRoot = document.getElementById("modal-root");

export function Modal({
  title,
  isOpen,
  onClose,
  children,
}: ModalBaseProps): React.ReactElement {
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
      <div className="modal">
        <header className="modal__hedear">
          <h2>{title}</h2>
          <div className="modal__hedear-close-btn" onClick={onClose}>
            X
          </div>
        </header>
        <div className="modal__body">{children}</div>
      </div>
    </div>,
    modalRoot
  );
}
