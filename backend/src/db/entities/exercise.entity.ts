// "create-exercises-table",
//   `create table if not exists exercises (
//       id serial primary key,
//       user_id int not null references users(id) on delete cascade,
//       exercise_name text not null,
//       exercise_type text not null check (exercise_type in ('strength', 'cardio'))
//     );`;

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

  @Column({ name: "exercise_name", type: "text" })
  exerciseName!: string;

  @Column({ name: "exercise_tag", type: "text" })
  exerciseTag!: string;

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
