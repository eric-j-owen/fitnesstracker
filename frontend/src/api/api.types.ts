import { z } from "zod";
import * as s from "./api.schemas";

//auth
export type LoginUserData = z.infer<typeof s.loginUserSchema>;
export type RegisterUserData = z.infer<typeof s.registerUserSchema>;
export type AuthenticatedUser = z.infer<typeof s.authenticatedUserSchema>;

//macros
export type MacrosFormData = z.infer<typeof s.macrosFormSchema>;

//metrics
export type MetricsFormData = z.infer<typeof s.metricsFormSchema>;

//exercies
export type ExerciseType = z.infer<typeof s.exerciseSchema>;
export type ExerciseFormValues = z.infer<typeof s.exerciseFormSchema>;
export type ExerciseWorkoutLink = z.infer<typeof s.exerciseWorkoutSchema>;

//workouts
export type WorkoutFormValues = z.infer<typeof s.workoutFormSchema>;
export type WorkoutType = z.infer<typeof s.workoutSchema>;
export type addExerciseToWorkoutType = z.infer<
  typeof s.addExerciseToWorkoutSchema
>;
