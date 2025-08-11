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
      <div className="mt-10 flex justify-center items-center bg-base-300">
        <button
          onClick={handleSubDay}
          className="cursor-pointer text-xl w-full hover:text-accent"
        >
          &#8249;
        </button>
        <div className="text-md font-semibold w-full text-center">
          {selectedDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </div>
        <button
          onClick={handleAddDay}
          className="cursor-pointer text-xl w-full hover:text-accent"
        >
          &#8250;
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
            <div className="collapse-title font-bold text-secondary">
              {category}
            </div>
            <div className="collapse-content text-sm">
              {filteredLogs.length ? (
                <>
                  <ul className="">
                    {filteredLogs.map((log) => (
                      <FoodLogEntry entry={log} key={log.id} />
                    ))}
                  </ul>
                </>
              ) : (
                <span className="p-4 pb-2 text-xs opacity-60 ">No entries</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
