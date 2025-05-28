import ExercisesTab from "./ExercisesTab";
import ScheduleTab from "./ScheduleTab";
import WorkoutsTab from "./WorkoutsTab";

function WorkoutsExercisesModule() {
  return (
    <div>
      <div className="tabs tabs-box">
        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="Schedule"
          defaultChecked
        />
        <div className="tab-content border-base-300 bg-base-100 p-10">
          <ScheduleTab />
        </div>

        <input type="radio" name="tabs" className="tab" aria-label="Workouts" />
        <div className="tab-content border-base-300 bg-base-100 p-10">
          <WorkoutsTab />
        </div>

        <input
          type="radio"
          name="tabs"
          className="tab"
          aria-label="Exercises"
        />
        <div className="tab-content border-base-300 bg-base-100 p-10">
          <ExercisesTab />
        </div>
      </div>
    </div>
  );
}

export default WorkoutsExercisesModule;
