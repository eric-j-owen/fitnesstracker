import { GoInfinity } from "react-icons/go";
import { AuthenticatedUser, MacrosFormData } from "../../api/api.types";

interface MacroProgressBarsProps {
  macros: MacrosFormData;
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

  type MacroProgressConfigType = {
    id: keyof MacrosFormData;
    label: string;
    target: number;
    unit: string;
    color: string;
  };

  const MacroProgressConfig: MacroProgressConfigType[] = [
    {
      id: "calories",
      label: "CAL",
      target: calculatedMaxCalories,
      unit: "",
      color: "white",
    },
    {
      id: "protein",
      label: "P",
      target: user?.targetProtein,
      unit: "g",
      color: "rgb(75, 192, 192)",
    },
    {
      id: "carbs",
      label: "C",
      target: user?.targetCarbs,
      unit: "g",
      color: "rgb(53, 162, 235)",
    },
    {
      id: "fat",
      label: "F",
      target: user?.targetFats,
      unit: "g",
      color: "rgb(255, 99, 132)",
    },
  ];

  return (
    <div>
      <h2>{macros.date}</h2>
      {MacroProgressConfig.map((field) => (
        <div key={field.id}>
          <div>
            {field.label}: {macros[field.id]}/
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

          <progress
            className="progress"
            value={macros[field.id]}
            max={String(field.target)}
            aria-labelledby={`${field.id}-label`}
            style={{ color: field.color }}
          ></progress>
        </div>
      ))}
    </div>
  );
}

export default MacroProgressBars;
