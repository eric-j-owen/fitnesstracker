import { GoInfinity } from "react-icons/go";
import { AuthenticatedUser, MacrosFormData } from "../../api/api.types";

interface MacroProgressBarsProps {
  macros: MacrosFormData[];
  user: AuthenticatedUser;
}
function MacroProgressBars({ macros, user }: MacroProgressBarsProps) {
  const CALS_PER_G_PROTEIN = 4;
  const CALS_PER_G_CARBS = 4;
  const CALS_PER_G_FATS = 9;

  const calculatedMaxCalories =
    user?.targetCarbs * CALS_PER_G_CARBS +
    user?.targetProtein * CALS_PER_G_PROTEIN +
    user?.targetFats * CALS_PER_G_FATS;

  const todaysLog = macros?.find((log) =>
    log.date.startsWith(new Date().toISOString().split("T")[0])
  );

  type MacroProgressConfigType = {
    id: "calories" | "protein" | "carbs" | "fats";
    label: string;
    target: number;
    unit: string;
    color: string;
  };
  const MacroProgressConfig: MacroProgressConfigType[] = [
    {
      id: "calories",
      label: "Calories",
      target: calculatedMaxCalories,
      unit: "",
      color: "white",
    },
    {
      id: "protein",
      label: "Protein",
      target: user?.targetProtein,
      unit: "g",
      color: "rgb(75, 192, 192)",
    },
    {
      id: "carbs",
      label: "Carbs",
      target: user?.targetCarbs,
      unit: "g",
      color: "rgb(53, 162, 235)",
    },
    {
      id: "fats",
      label: "Fats",
      target: user?.targetFats,
      unit: "g",
      color: "rgb(255, 99, 132)",
    },
  ];

  return (
    <div className="flex flex-col gap-1 w-full">
      {MacroProgressConfig.map((field) => (
        <div key={field.id} className="flex items-center gap-2">
          <progress
            className="progress"
            value={todaysLog?.[field.id] || 0}
            max={String(field.target)}
            aria-labelledby={`${field.id}-label`}
            style={{ color: field.color }}
          ></progress>

          <div className="text-sm flex items-center  w-17">
            {todaysLog?.[field.id] || 0}/
            {field.target ? (
              field.target
            ) : (
              <div
                className="tooltip tooltip-left"
                data-tip="Set your target macros in Settings"
              >
                <GoInfinity />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MacroProgressBars;
