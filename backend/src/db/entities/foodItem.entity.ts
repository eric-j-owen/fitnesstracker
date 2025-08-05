import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import type { FoodLog } from "./foodLog.entity.js";
import type { FoodPortionsArray, NutrientsType } from "../../api/api.types.js";

@Entity({ name: "food_item" })
export class FoodItem {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany("FoodLog", (foodLog: FoodLog) => foodLog.foodItem)
  foodLogs: FoodLog[];

  @Column({ name: "fdc_id", unique: true })
  fdcId: number; //usda FoodData Central ID

  @Column({ name: "upc", nullable: true })
  gtinUpc: string; //bar code

  @Column({ name: "publication_date" })
  publicationDate: Date; // last updated by usda

  @Column({ name: "last_check_for_update" })
  lastCheckForUpdate: Date;

  @Column({ name: "food_class" })
  foodClass: string;

  @Column({ name: "food_category" })
  foodCategory: string;

  @Column({ type: "text", name: "brand_owner", nullable: true })
  brandOwner: string;

  @Column({ type: "text", name: "brand_name", nullable: true })
  brandName: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text", name: "package_weight" })
  packageWeight: string;

  @Column({ type: "jsonb" })
  nutrients: NutrientsType;

  @Column({ type: "jsonb" })
  foodPortions: FoodPortionsArray;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
