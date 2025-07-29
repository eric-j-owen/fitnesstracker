import { foodLogFormInputs } from "../../api/api.schemas";
import { FoodItemType } from "../../api/api.types";
import { useFoodLog } from "../../api/foodLog/useFoodLog";
import { useAppForm } from "../Form/form-context";

interface LogFoodFormProps {
  foodEntry: FoodItemType;
  modalRef: React.RefObject<HTMLDialogElement | null>;
}

export default function LogFoodForm({ foodEntry, modalRef }: LogFoodFormProps) {
  const today = new Date().toISOString().split("T")[0];
  const { logFood } = useFoodLog("");

  // const unitOptions = [{ unit: "g", label: "grams" }];

  const form = useAppForm({
    defaultValues: {
      amount: 1,
      unit: "g",
      mealCategory: "Other",
      logDate: today,
    },

    validators: {
      onChange: foodLogFormInputs,
    },

    onSubmit: async ({ value }) => {
      const calculatedMacros = {
        calculatedCalories:
          (foodEntry.nutrients.calories.per100g / 100) * value.amount,
        calculatedProtein:
          (foodEntry.nutrients.protein.per100g / 100) * value.amount,
        calculatedCarbs:
          (foodEntry.nutrients.carbs.per100g / 100) * value.amount,
        calculatedFat: (foodEntry.nutrients.fat.per100g / 100) * value.amount,
      };

      await logFood({
        ...value,
        ...calculatedMacros,
      });

      modalRef.current?.close();
    },
  });
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div>
        <p>{foodEntry.foodCategory}</p>
        <p>{foodEntry.description}</p>
        <p>
          {foodEntry.brandName &&
            `${foodEntry.brandName} - ${foodEntry.brandOwner}`}
        </p>
      </div>
      <form.AppField
        name="logDate"
        children={(field) => (
          <field.FormField label="Date" type="date" showLabel={true} />
        )}
      />

      <form.AppField
        name="mealCategory"
        children={(field) => (
          <div className="form-control w-full">
            <label className="label" htmlFor="meal-select">
              <span className="label-text">Meal</span>
            </label>

            <select
              className="select select-bordered w-full"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              id="meal-select"
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Other">Other</option>
            </select>
          </div>
        )}
      />

      <form.AppField
        name="amount"
        children={(field) => (
          <field.FormField label="Amount" type="number" showLabel={true} />
        )}
      />

      <form.AppField
        name="unit"
        children={(field) => (
          <div>
            <label htmlFor="">
              <span>Unit</span>
            </label>

            <select
              name="unit"
              id="unit"
              className="select select-bordered w-full"
              onChange={(e) => field.handleChange(e.target.value)}
            >
              <option value="g">Grams</option>
            </select>
          </div>
        )}
      />
      <form.AppForm>
        <form.SubscribeButton label="Submit" />
      </form.AppForm>
    </form>
  );
}
