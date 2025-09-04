import React, { useContext, useMemo, useState } from "react";
import {
  FoodItemType,
  FoodLogFormInputs,
  FoodLogResponse,
  FoodPortion,
} from "../../api/api.types";
import { useEditLogs, useLogFood } from "../../api/foodLog/useFoodLog";
import { DateContext } from "../../pages/Dashboard";

interface LogFoodFormProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  foodItem: FoodItemType;
  loggedFood?: FoodLogResponse;
  title: string;
}

export default function LogFoodForm({
  foodItem,
  modalRef,
  loggedFood,
  title,
}: LogFoodFormProps) {
  const { selectedDate } = useContext(DateContext);
  const { logFood } = useLogFood();
  const { editLog } = useEditLogs();

  const portionOptions: FoodPortion[] = foodItem.foodPortions
    .filter((portion) => {
      //filters out portions where neither a serving weight or label nutrtients exist
      return (
        portion.servingWeight || foodItem.nutrients.calories.perLabelServing
      );
    })
    .map((portion) => {
      return {
        portionDescription: portion.portionDescription || "",
        amount: portion.amount || 1,
        servingWeight: portion.servingWeight,
        servingUnit: portion.servingUnit,
      };
    });

  portionOptions.unshift({
    portionDescription: "grams",
    servingWeight: 1,
    servingUnit: "g",
    amount: 1,
  });

  const findInitialPortion = () => {
    if (loggedFood) {
      const match = portionOptions.find((portion) => {
        return portion.portionDescription === loggedFood.portionDescription;
      });
      return match || portionOptions[0];
    }

    return portionOptions.length > 1 ? portionOptions[1] : portionOptions[0];
  };

  //initial state
  const [formData, setFormData] = useState<FoodLogFormInputs>({
    ...findInitialPortion(),
    logDate: loggedFood?.logDate ?? selectedDate.toISOString().split("T")[0],
    mealCategory: loggedFood?.mealCategory ?? "Other",
    amount: loggedFood?.amount ?? 1,
  });

  const memoizedMacros = useMemo(() => {
    const calculate = (macro: "calories" | "protein" | "carbs" | "fat") => {
      const amount = formData.amount || 1;
      const servingWeight = formData.servingWeight || 1;
      const totalGrams = amount * servingWeight;

      if (formData.portionDescription === "grams") {
        return Number(
          ((foodItem.nutrients[macro].per100g / 100) * totalGrams).toFixed(2)
        );
      }

      if (foodItem.nutrients[macro].perLabelServing) {
        return Number(
          (foodItem.nutrients[macro].perLabelServing! * amount).toFixed(2)
        );
      }

      if (foodItem.nutrients[macro].per100g) {
        return Number(
          ((foodItem.nutrients[macro].per100g / 100) * totalGrams).toFixed(2)
        );
      }

      return 0;
    };

    return {
      calories: calculate("calories"),
      protein: calculate("protein"),
      carbs: calculate("carbs"),
      fat: calculate("fat"),
    };
  }, [formData, foodItem]);

  //event functions

  const handlePortionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = parseInt(e.target.value);
    const selectedPortion = portionOptions[selectedIndex];

    setFormData((prev) => ({
      ...prev,
      ...selectedPortion,
    }));
  };

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

    const payload = {
      ...formData,

      calculatedCalories: memoizedMacros.calories ?? 0,
      calculatedProtein: memoizedMacros.protein ?? 0,
      calculatedCarbs: memoizedMacros.carbs ?? 0,
      calculatedFat: memoizedMacros.fat ?? 0,
    };

    if (loggedFood) {
      await editLog({ id: loggedFood.id, data: payload });
    } else {
      await logFood({ ...payload, foodItemId: foodItem.id });
    }

    modalRef.current?.close();
  };

  //build dropdown options for different portions
  const renderOptions = () => {
    return portionOptions.map((option, index) => {
      if (option.portionDescription === "grams") {
        return (
          <option key={index} value={index}>
            Custom amount (grams)
          </option>
        );
      }

      let label = "";

      if (
        //in cases where portionDescription is missing or includes a number
        //if portion description starts with number, adding "amount" to label will result in "1 1 cup"
        (option.portionDescription &&
          isNaN(Number(option.portionDescription[0]))) ||
        option.portionDescription === ""
      ) {
        label += `${option.amount} `;
        label += `${option.servingUnit} `;
      }

      if (option.portionDescription && option.portionDescription !== "") {
        label += `${option.portionDescription} `;
      }

      if (option.servingWeight) {
        label += ` (${option.servingWeight}g)`;
      }

      return (
        <option key={index} value={index}>
          {label}
        </option>
      );
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="card-body">
        <h2 className="card-title mx-auto">{title}</h2>
        <div className="divider"></div>
        <div className="bg-base-200 w-full p-4">
          <div className="text-center">
            <h3 className="font-bold">{foodItem.description}</h3>
            <p className="text-base-content/70">{foodItem.foodCategory}</p>
            <p className="text-base-content/70">
              {foodItem.brandOwner && foodItem.brandOwner}
              {foodItem.brandName && foodItem.brandName}
            </p>
          </div>
        </div>
        <div className="bg-primary/5">
          <h4 className="font-bold divider divider-start">Macros</h4>
          <div className="grid grid-cols-2">
            <div className="stat">
              <p className="stat-title">Calories</p>
              <p className="stat-value text-sm">{memoizedMacros.calories}</p>
            </div>
            <div className="stat">
              <p className="stat-title">Protein</p>
              <p className="stat-value text-sm"> {memoizedMacros.protein}</p>
            </div>
            <div className="stat">
              <p className="stat-title">Carbs</p>
              <p className="stat-value text-sm"> {memoizedMacros.carbs}</p>
            </div>
            <div className="stat">
              <p className="stat-title">Fat</p>
              <p className="stat-value text-sm">{memoizedMacros.fat}</p>
            </div>
          </div>
        </div>

        <div className="bg-secondary/5 mb-4 p-2">
          <h5 className="font-bold divider divider-start">Inputs</h5>
          <div className="ml-5 flex flex-col gap-2">
            <div>
              <label htmlFor="date" className="input">
                <span className="label">Date</span>
                <input
                  type="date"
                  name="logDate"
                  id="date"
                  value={formData.logDate}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label htmlFor="mealCategory" className="select">
                <span className="label">Meal</span>
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
              </label>
            </div>
            <div>
              <label htmlFor="amount" className="input">
                <span className="label">Amount</span>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount === 0 ? "" : formData.amount}
                  onChange={handleChange}
                  min={0}
                  step={0.01}
                />
              </label>
            </div>
            <div>
              <label htmlFor="unit" className="select">
                <span className="label">Portion</span>
                <select
                  name="portionDescription"
                  id="unit"
                  value={portionOptions.findIndex((option) => {
                    return (
                      option.portionDescription === formData.portionDescription
                    );
                  })}
                  onChange={handlePortionChange}
                >
                  {renderOptions()}
                </select>
              </label>
            </div>
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
