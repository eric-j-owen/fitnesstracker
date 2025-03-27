import { useRef } from "react";

interface ModalProps {
  modalId: string;
  title: string;
  todaysDate: Date;
  children?: React.ReactNode;
  modalRef: React.RefObject<HTMLDialogElement>;
}

const Modal: React.FC<ModalProps> = ({
  modalId,
  title,
  todaysDate,
  children,
  modalRef,
}) => {
  return (
    <>
      <button className="btn" onClick={() => modalRef.current?.showModal()}>
        {title}
      </button>
      <dialog id={modalId} ref={modalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
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
        <form method="dialog" className="modal-backdrop">
          <button></button>
        </form>
      </dialog>
    </>
  );
};

export default Modal;
