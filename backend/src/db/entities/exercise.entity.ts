import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { User } from "./user.entity.js";
import type { WorkoutExercisesLink } from "./workoutExerciseLink.entity.js";

@Entity("exercises")
export class Exercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "user_id" })
  userId!: number;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text" })
  tag!: string;

  //relations
  @ManyToOne("User", (user: User) => user.exercises, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @OneToMany(
    "WorkoutExercisesLink",
    (workoutExercisesLink: WorkoutExercisesLink) =>
      workoutExercisesLink.exercise
  )
  workoutExerciseLinks!: WorkoutExercisesLink[];
}
