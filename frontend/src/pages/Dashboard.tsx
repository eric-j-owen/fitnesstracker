import MacrosModule from "../components/Macros/MacrosModule";
import MetricsModule from "../components/Metrics/MetricsModule";
import WorkoutsExercisesModule from "../components/WorkoutsExercises/WorkoutsExercisesModule";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-4xl font-bold mb-24 text-center">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <div className="card shadow-2xl bg-base-200">
          <div className="card-body">
            <h2 className="card-title mx-auto">Macros</h2>
            <MacrosModule />
          </div>
        </div>

        <div className="card shadow-2xl bg-base-200">
          <div className="card-body">
            <h2 className="card-title">Workout Schedule</h2>
            <WorkoutsExercisesModule />
          </div>
        </div>

        <div className="card shadow-2xl bg-base-200">
          <div className="card-body">
            <h2 className="card-title">Metrics</h2>
            <MetricsModule />
          </div>
        </div>
      </div>
    </div>
  );
}
