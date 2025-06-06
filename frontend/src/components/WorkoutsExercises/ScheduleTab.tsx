import { useWorkouts } from "../../api/workouts/useWorkouts";
import { DAYS } from "../../consts";

function ScheduleTab() {
  const { workouts } = useWorkouts();

  const wokroutsByDay = (day: string) => {
    if (!workouts) return [];
    return workouts.filter((workouts) => workouts.days.includes(day));
  };

  return (
    <div className="h-100 overflow-y-auto">
      <div className="mb-2">
        {DAYS.map((day) => (
          <div key={day} className="collapse collapse-arrow bg-base-100">
            <input type="checkbox" defaultChecked />
            <div className="collapse-title font-medium">
              {day}
              <span className="text-sm text-gray-500 ml-2">
                ({wokroutsByDay(day).length} workouts)
              </span>
            </div>
            <div className="collapse-content">
              {wokroutsByDay(day).length > 0 ? (
                <div className="space-y-2">
                  {wokroutsByDay(day).map((workout) => (
                    <div key={workout.id} className="bg-base-200 p-1">
                      {workout.name}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-400 italic text-sm">
                  No workouts scheduled
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScheduleTab;
