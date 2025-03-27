interface ModalProps {
  modalId: string;
  title: string;
  children?: React.ReactNode;
  modalRef: React.RefObject<HTMLDialogElement | null>;
  className: string;
}

const Modal: React.FC<ModalProps> = ({
  modalId,
  title,
  children,
  modalRef,
  className,
}) => {
  return (
    <>
      <button
        className={className}
        onClick={() => modalRef.current?.showModal()}
      >
        {title}
      </button>
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
