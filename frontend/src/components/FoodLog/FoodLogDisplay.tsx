/*
todos 
    styles
    drag and drop entries
*/

import { useContext } from "react";
import { useGetLogs } from "../../api/foodLog/useFoodLog";
import { MEAL_CATEGORIES } from "../../consts";
import FoodLogEntry from "./FoodLogEntry";
import { DateContext } from "../../pages/Dashboard";

export default function FoodLogDisplay() {
  const { selectedDate, setSelectedDate } = useContext(DateContext);
  const { data: logs } = useGetLogs(selectedDate);

  const handleSubDay = () => {
    const result = new Date(selectedDate);
    result.setDate(result.getDate() - 1);
    setSelectedDate(result);
  };

  const handleAddDay = () => {
    const result = new Date(selectedDate);
    result.setDate(result.getDate() + 1);
    setSelectedDate(result);
  };

  return (
    <div>
      {/* date nav and display */}
      <div>
        <button onClick={handleSubDay} className="btn">
          previous
        </button>
        <h2>{selectedDate.toISOString().split("T")[0]}</h2>
        <button onClick={handleAddDay} className="btn">
          next
        </button>
      </div>

      {/* meal categories  */}
      {MEAL_CATEGORIES.map((category) => {
        const filteredLogs =
          logs?.filter((log) => log.mealCategory === category) || [];

        return (
          <div
            key={category}
            className="collapse collapse-arrow bg-base-100 border-base-300 border"
          >
            <input type="checkbox" defaultChecked />
            <div className="collapse-title font-semibold">{category}</div>
            <div className="collapse-content text-sm">
              {filteredLogs.length ? (
                <div>
                  <ul>
                    {filteredLogs.map((log) => (
                      <FoodLogEntry entry={log} key={log.id} />
                    ))}
                  </ul>
                </div>
              ) : (
                <span>No entries</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
