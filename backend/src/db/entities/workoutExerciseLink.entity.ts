import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import type { Workout } from "./workout.entity.js";
import type { Exercise } from "./exercise.entity.js";

@Entity("workout_exercises_link")
export class WorkoutExercisesLink {
  @PrimaryColumn({ name: "workout_id" })
  workoutId!: number;

  @PrimaryColumn({ name: "exercise_id" })
  exerciseId!: number;

  @Column()
  sets!: number;

  @Column()
  reps!: number;

  @Column({ type: "decimal", precision: 6, scale: 2 })
  weight!: number;

  @Column({ type: "interval", nullable: true })
  duration?: string;

  @Column({ type: "decimal", precision: 6, scale: 2, nullable: true })
  distance?: number;

  //relations
  @ManyToOne("Workout", (workout: Workout) => workout.workoutExerciseLinks, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "workout_id" })
  workout!: Workout;

  @ManyToOne(
    "Exercise",
    (exercise: Exercise) => exercise.workoutExerciseLinks,
    {
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({ name: "exercise_id" })
  exercise!: Exercise;
}
