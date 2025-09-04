import { createContext, useState } from "react";
import FoodLogModule from "../components/FoodLog/FoodLogModule";
import MacrosModule from "../components/Macros/MacrosModule";
import MetricsModule from "../components/Metrics/MetricsModule";

interface DateContextType {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}
export const DateContext = createContext<DateContextType>({
  selectedDate: new Date(),
  setSelectedDate: () => {},
});

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
      <div className="container mx-auto px-2">
        <h1 className="text-3xl font-bold my-5 text-center">Dashboard</h1>
        <div className="divider"></div>

        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="card shadow-2xl bg-base-200 flex-1">
            <div className="card-body">
              <h2 className="card-title divider divider-start">Log</h2>
              <FoodLogModule />
            </div>
          </div>
          <div className="flex flex-col gap-12">
            <div className=" card shadow-2xl bg-base-200 w-auto">
              <div className="card-body">
                <h2 className="card-title divider divider-start">Macros</h2>
                <MacrosModule />
              </div>
            </div>

            <div className="card shadow-2xl bg-base-200">
              <div className="card-body">
                <h2 className="card-title divider divider-start">Metrics</h2>
                <MetricsModule />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DateContext.Provider>
  );
}
