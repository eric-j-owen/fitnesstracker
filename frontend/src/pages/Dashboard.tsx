import { useRef } from "react";
import MacroForm from "../components/MacrosForm";
import Modal from "../components/Modal";

export default function Dashboard() {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleCloseModal = () => {
    modalRef.current?.close();
  };
  return (
    <div>
      <Modal
        modalId="macrosModal"
        title="Log macros"
        todaysDate={new Date()}
        onClose={handleCloseModal}
        modalRef={modalRef}
      >
        <MacroForm onSuccess={handleCloseModal} modalRef={modalRef} />
      </Modal>
    </div>
  );
}
