import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import type { User } from "./user.entity.js";

@Entity("macros")
@Unique(["user", "date"])
export class Macro {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int" })
  calories!: number;

  @Column({ type: "int" })
  protein!: number;

  @Column({ type: "int" })
  carbs!: number;

  @Column({ type: "int" })
  fats!: number;

  @Column({ type: "date" })
  date!: Date;

  //relations

  @ManyToOne("User", (user: User) => user.macros, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user!: User;
  userId!: number;
}
