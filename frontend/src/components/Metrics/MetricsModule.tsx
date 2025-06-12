import { useRef } from "react";
import { useMetrics } from "../../api/metrics/useMetrics";
import MetricsForm from "./MetricsForm";
import { MetricsLineChart } from "./MetricsLineChart";
import Modal from "../Modal";

function MetricsModule() {
  const { metrics, isLoadingQuery, isErrorQuery } = useMetrics();
  const metricModalRef = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <div className="flex justify-end mb-4 ">
        <button
          className="btn"
          onClick={() => metricModalRef?.current?.showModal()}
        >
          + Log Metric
        </button>
        <Modal modalId="metricsModal" modalRef={metricModalRef}>
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

export default MetricsModule;
