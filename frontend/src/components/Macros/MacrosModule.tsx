import { useMacros } from "../../api/macros/useMacros";
import { useRef } from "react";
import { useAuth } from "../../api/auth/useAuth";
import MacroForm from "./MacrosForm";
import Modal from "../Modal";
import MacrosChart from "./MacrosChart";
import MacroProgressBars from "./MacroProgressBars";
import { UnauthorizedError } from "../../api/errors";

function MacrosModule() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { macros, isLoadingQuery, isErrorQuery } = useMacros();
  const { user } = useAuth();

  if (!user) throw new UnauthorizedError();

  if (isLoadingQuery) {
    return <div>Loading...</div>;
  }
  if (isErrorQuery) {
    return <div>Error</div>;
  }

  return (
    <div>
      <div className="flex justify-end mb-4 ">
        <Modal modalId="macrosModal" title="+" modalRef={modalRef}>
          <MacroForm modalRef={modalRef} />
        </Modal>
      </div>

      <MacroProgressBars user={user} macros={macros || []} />

      <div className="w-full overflow-x-auto">
        <div className="min-w-[400px]">
          <MacrosChart
            isLoadingQuery={isLoadingQuery}
            isErrorQuery={isErrorQuery}
            data={macros || []}
          />
        </div>
      </div>
    </div>
  );
}

export default MacrosModule;
