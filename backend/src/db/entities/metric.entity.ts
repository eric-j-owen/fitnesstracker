import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import type { User } from "./user.entity.js";

/*create table metrics (
  id serial primary key,
  user_id int not null references users(id) on delete cascade,
  type text not null check (type in ('Weight')),
  val decimal(6,2) not null,
  date date not null,
  unique (user_id, date, type)
);*/

@Entity("metrics")
@Unique(["userId", "date", "type"])
export class Metric {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", name: "user_id" })
  userId!: number;

  @Column({ type: "enum", enum: ["weight"] })
  type!: "weight";

  @Column({ type: "decimal", precision: 6, scale: 2 })
  val!: number;

  @Column({ type: "date" })
  date!: Date;

  //relations
  @ManyToOne("User", (user: User) => user.metrics, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user!: User;
}
