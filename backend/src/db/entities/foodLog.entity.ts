import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { FoodItem } from "./foodItem.entity.js";
import type { User } from "./user.entity.js";

export enum MealCategory {
  BREAKFAST = "Breakfast",
  LUNCH = "Lunch",
  DINNER = "Dinner",
  OTHER = "Other",
}

@Entity({ name: "food_log" })
@Index(["user", "logDate"])
export class FoodLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne("User", (user: User) => user.foodLogs, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne("FoodItem", (foodItem: FoodItem) => foodItem.foodLogs, {
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "food_item_id" })
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
  servingUnit: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  servingWeight: number;

  //yyyy-mm-dd
  @Column({ type: "varchar", length: 10, name: "log_date" })
  logDate: string;

  @Column({ name: "portion_desc" })
  portionDescription: string;

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
    name: "calculated_carbs",
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  calculatedCarbs: number;

  @Column({ name: "calculated_fat", type: "decimal", precision: 10, scale: 2 })
  calculatedFat: number;
}
