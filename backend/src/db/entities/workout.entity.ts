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

@Entity("workouts")
export class Workout {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "user_id" })
  userId!: number;

  @Column({ name: "workout_name", type: "text" })
  workoutName!: string;

  @Column({ type: "text", array: true, default: "{}" })
  days!: string[];

  //relations
  @ManyToOne("User", (user: User) => user.workouts, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @OneToMany(
    "WorkoutExercisesLink",
    (workoutExercisesLink: WorkoutExercisesLink) => workoutExercisesLink.workout
  )
  workoutExerciseLinks!: WorkoutExercisesLink[];
}
