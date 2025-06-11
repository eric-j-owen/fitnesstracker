import { useEffect } from "react";

interface ModalProps {
  modalId: string;
  children?: React.ReactNode;
  modalRef: React.RefObject<HTMLDialogElement | null>;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  modalId,
  children,
  modalRef,
  onClose,
}) => {
  useEffect(() => {
    const dialogElement = modalRef.current;

    if (dialogElement && onClose) {
      const handleDialogClose = () => {
        onClose();
      };

      dialogElement.addEventListener("close", handleDialogClose);
      return () => {
        dialogElement.removeEventListener("close", handleDialogClose);
      };
    }
  }, [modalRef, onClose]);

  return (
    <>
      <dialog id={modalId} ref={modalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="mt-10">{children}</div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button />
        </form>
      </dialog>
    </>
  );
};

export default Modal;
