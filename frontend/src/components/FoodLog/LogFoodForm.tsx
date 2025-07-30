import { useState } from "react";
import {
  FoodItemType,
  FoodLogFormInputs,
  FoodLogReqBody,
} from "../../api/api.types";
import { useFoodLog } from "../../api/foodLog/useFoodLog";

interface LogFoodFormProps {
  foodEntry: FoodItemType;
  modalRef: React.RefObject<HTMLDialogElement | null>;
}

export default function LogFoodForm({ foodEntry, modalRef }: LogFoodFormProps) {
  const today = new Date().toISOString().split("T")[0];
  const { logFood } = useFoodLog("");

  //initial state
  const [formData, setFormData] = useState<FoodLogFormInputs>({
    amount: 1,
    unit: "g",
    mealCategory: "Other",
    logDate: today,
  });

  const caluclatedMacros = {
    calories: (
      (foodEntry.nutrients.calories.per100g / 100) *
      formData.amount
    ).toFixed(2),
    protein: (
      (foodEntry.nutrients.protein.per100g / 100) *
      formData.amount
    ).toFixed(2),
    carbs: (
      (foodEntry.nutrients.carbs.per100g / 100) *
      formData.amount
    ).toFixed(2),
    fat: ((foodEntry.nutrients.fat.per100g / 100) * formData.amount).toFixed(2),
  };

  //event functions
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

    modalRef.current?.close();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <h3>{foodEntry.description}</h3>
          <p>{foodEntry.foodCategory}</p>
          <p>
            {foodEntry.brandName &&
              `${foodEntry.brandName} - ${foodEntry.brandOwner}`}
          </p>
        </div>
        <div>
          <h4>Macros</h4>
          <p>Calories: {caluclatedMacros.calories}</p>
          <p>Protein: {caluclatedMacros.protein}</p>
          <p>Carbs: {caluclatedMacros.carbs}</p>
          <p>Fat: {caluclatedMacros.fat}</p>
        </div>
      </div>

      <div>
        <label htmlFor="mealCategory">Meal</label>
        <select
          name="mealCategory"
          id="mealCategory"
          value={formData.mealCategory}
          onChange={handleChange}
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount === 0 ? "" : formData.amount}
          onChange={handleChange}
          min={1}
        />

        <label htmlFor="unit"></label>
        <select
          name="unit"
          id="unit"
          value={formData.unit}
          onChange={handleChange}
        >
          <option value="g">g</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
