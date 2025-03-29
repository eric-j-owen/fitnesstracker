import { useRef } from "react";
import { useMetrics } from "../../api/metrics/useMetrics";
import MetricsForm from "./MetricsForm";
import { MetricsLineChart } from "./MetricsLineChart";
import Modal from "../Modal";

function MetricsDisplay() {
  const { metrics, isLoadingQuery, isErrorQuery } = useMetrics();
  const metricModalRef = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <div className="flex justify-end mb-4 ">
        <Modal modalId="metricsModal" title="+" modalRef={metricModalRef}>
          <MetricsForm modalRef={metricModalRef} />
        </Modal>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[400px]">
          <MetricsLineChart
            data={metrics || []}
            isLoadingQuery={isLoadingQuery}
            isErrorQuery={isErrorQuery}
          />
        </div>
      </div>
    </div>
  );
}

export default MetricsDisplay;
