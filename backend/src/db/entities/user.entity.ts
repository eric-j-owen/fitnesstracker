import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import type { Metric } from "./metric.entity.js";
import type { Macro } from "./macro.entity.js";
import type { FoodLog } from "./foodLog.entity.js";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", name: "first_name" })
  firstName: string;

  @Column({ type: "text", name: "last_name", nullable: true })
  lastName: string;

  @Column({ type: "text", unique: true })
  username: string;

  @Column({ type: "text", name: "password_hash" })
  passwordHash: string;

  @Column({ type: "text", name: "avatar_url", nullable: true })
  avatarUrl: string;

  @Column({ type: "integer", name: "target_protein", nullable: true })
  targetProtein: number;

  @Column({ type: "integer", name: "target_carbs", nullable: true })
  targetCarbs: number;

  @Column({ type: "integer", name: "target_fats", nullable: true })
  targetFats: number;

  @CreateDateColumn({
    type: "timestamptz",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  //relations
  @OneToMany("Metric", (metric: Metric) => metric.user)
  metrics: Metric[];

  @OneToMany("Macro", (macro: Macro) => macro.user)
  macros: Macro[];

  @OneToMany("FoodLog", (foodLog: FoodLog) => foodLog.user)
  foodLogs: FoodLog[];
}
