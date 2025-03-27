import { useRef } from "react";

interface ModalProps {
  modalId: string;
  title: string;
  todaysDate: Date;
  children?: React.ReactNode;
  modalRef: React.RefObject<HTMLDialogElement>;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  modalId,
  title,
  todaysDate,
  children,
  modalRef,
  onClose,
}) => {
  const handleClose = () => {
    modalRef.current?.close();
    onClose?.();
  };

  return (
    <>
      <button className="btn" onClick={() => modalRef.current?.showModal()}>
        {title}
      </button>
      <dialog id={modalId} ref={modalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              onClick={handleClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <div>
            <h3 className="font-bold text-lg">
              {title} for {todaysDate.toLocaleDateString()}
            </h3>
          </div>
          {children}
        </div>
        <form method="dialog" className="modal-backdrop" onClick={handleClose}>
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Modal;
