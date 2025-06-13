import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { FoodItem } from "./foodItem.entity.js";

export enum MealCategory {
  BREAKFAST = "breakfast",
  LUNCH = "lunch",
  DINNER = "dinner",
  SNACKS = "snacks",
  OTHER = "other",
}

@Entity({ name: "food_log" })
@Index(["userId", "logDate"])
export class FoodLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_id" })
  userId: number;

  @ManyToOne("FoodItem", (foodItem: FoodItem) => foodItem.foodLogs, {
    onDelete: "RESTRICT",
  })
  foodItem: FoodItem;

  @Column({
    name: "meal_category",
    type: "enum",
    enum: MealCategory,
    default: MealCategory.OTHER,
  })
  mealCategory: MealCategory;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column()
  unit: string; //cup, g, ml, package etc

  @Column({ type: "decimal", precision: 10, scale: 2 })
  totalGrams: number; //used to calculate macros

  @Column({ type: "timestamptz" })
  logDate: Date;

  // ----
  // macros
  // ----

  @Column({
    name: "calculated_calories",
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  calculatedCalories: number;

  @Column({
    name: "calculated_protein",
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  calculatedProtein: number;

  @Column({
    name: "calculated_carbohydrates",
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  calculatedCarbohydrates: number;

  @Column({ name: "calculated_fat", type: "decimal", precision: 10, scale: 2 })
  calculatedFat: number;
}
