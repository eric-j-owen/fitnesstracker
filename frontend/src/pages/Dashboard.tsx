import MacrosDisplay from "../components/MacrosDisplay";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
        <div className="card shadow-xl">
          <div className="card-body">
            <h2 className="card-title mx-auto">Macros</h2>
            <MacrosDisplay />
          </div>
        </div>

        <div className="card shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Workouts</h2>
          </div>
        </div>

        <div className="card shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Metrics</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
