import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import type { User } from "./user.entity.js";

@Entity("metrics")
@Unique(["user", "date", "type"])
export class Metric {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "user_id" })
  userId!: number;

  @Column({ type: "enum", enum: ["weight"] })
  type!: "weight";

  @Column({ type: "decimal", precision: 6, scale: 2 })
  val!: number;

  @Column({ type: "date" })
  date!: string;

  //relations
  @ManyToOne("User", (user: User) => user.metrics, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user!: User;
}
