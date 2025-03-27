import { useRef } from "react";
import MacroForm from "../components/MacrosForm";
import Modal from "../components/Modal";

export default function Dashboard() {
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <Modal
        modalId="macrosModal"
        title="Log macros"
        todaysDate={new Date()}
        modalRef={modalRef}
      >
        <MacroForm modalRef={modalRef} />
      </Modal>
    </div>
  );
}
