import { useMacros } from "../../api/macros/useMacros";
import { useAuth } from "../../api/auth/useAuth";
import MacroProgressBars from "./MacroProgressBars";
import { UnauthorizedError } from "../../api/errors";
import { DateContext } from "../../pages/Dashboard";
import { useContext } from "react";

function MacrosModule() {
  const { selectedDate } = useContext(DateContext);
  const { user } = useAuth();
  const { dailyMacros, isLoadingQuery, isErrorQuery } = useMacros(selectedDate);

  if (!user) throw new UnauthorizedError();

  if (isLoadingQuery) {
    return <div>Loading...</div>;
  }
  if (isErrorQuery) {
    return <div>Error</div>;
  }

  return (
    <div>
      <MacroProgressBars user={user} macros={dailyMacros} />

      <div className="w-full overflow-x-auto">
        <div className="min-w-[400px]"></div>
      </div>
    </div>
  );
}

export default MacrosModule;
