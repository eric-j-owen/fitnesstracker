import { useRef } from "react";
import MacroForm from "../components/MacrosForm";
import Modal from "../components/Modal";

function MacrosDisplay() {
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <Modal modalId="macrosModal" title="Log macros" modalRef={modalRef}>
        <MacroForm modalRef={modalRef} />
      </Modal>
    </div>
  );
}

export default MacrosDisplay;
