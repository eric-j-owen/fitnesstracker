import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

interface PortionRecord {
  name?: string; //foodPortions -> {} -> measureUnit

  //may have an amound e.g. "1" referring to egg, or portiondescription e.g. "1 egg"
  amount?: number;
  portionDescription?: string;

  gramWeight?: number;
  modifier?: string; //if foodPortions->{}->modifier == "90000", skip record
}

@Entity()
export class FoodItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "fdc_id", unique: true })
  fdcId: number; //usda FoodData Central ID

  // ---------
  // food meta data
  // ---------

  @Column({ name: "publication_date" })
  publicationDate: Date; // last updated by usda

  @Column({ name: "last_check_for_update" })
  lastCheckForUpdate: Date;

  @Column({ name: "food_class" })
  foodClass: string;

  @Column({ type: "text", name: "brand_owner", nullable: true })
  brandOwner: string;

  @Column({ type: "text" })
  description: string;

  // ---------
  // servings
  // ---------

  // only when foodClass != "branded"
  @Column({ type: "jsonb", nullable: true })
  portions: PortionRecord[];

  //only when foodClass == "branded"
  @Column({ name: "serving_size", nullable: true })
  servingSize: number;

  @Column({ name: "serving_size_unit", nullable: true })
  servingSizeUnit: string;

  @Column({ name: "household_serving_full_text", nullable: true })
  householdServingFullText: string;

  // ---------
  // macros
  // ---------

  @Column({ type: "decimal", precision: 10, scale: 2 })
  protein: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  carbohydrates: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  fat: number;

  // ---------
  // misc data
  // ---------

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
