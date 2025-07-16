import FoodLogModule from "../components/FoodLog/FoodLogModule";
import MacrosModule from "../components/Macros/MacrosModule";
import MetricsModule from "../components/Metrics/MetricsModule";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-4xl font-bold mb-24 text-center">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
        <div className="card shadow-2xl bg-base-200 row-span-2">
          <div className="card-body">
            <h2 className="card-title mx-auto">Food Tracker</h2>
            <FoodLogModule />
          </div>
        </div>

        <div className="card shadow-2xl bg-base-200">
          <div className="card-body">
            <h2 className="card-title mx-auto">Macros</h2>
            <MacrosModule />
          </div>
        </div>

        <div className="card shadow-2xl bg-base-200">
          <div className="card-body">
            <h2 className="card-title mx-auto">Metrics</h2>
            <MetricsModule />
          </div>
        </div>
      </div>
    </div>
  );
}
