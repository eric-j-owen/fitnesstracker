/*
todos 
    cycle dates
    fooditementry
    edit entries
    delete entries
    styles
    drag and drop entries
*/

import { useGetLogs } from "../../api/foodLog/useFoodLog";
import { MEAL_CATEGORIES } from "../../consts";

interface FoodLogDisplayProps {
  date: Date;
}

export default function FoodLogDisplay({ date }: FoodLogDisplayProps) {
  const { data: logs } = useGetLogs(date);

  return (
    <div>
      <div>
        <h2>{date.toISOString()}</h2>
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
                      <li>{log.foodItem.description}</li>
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
      <div>{}</div>
    </div>
  );
}
