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
export type ExerciseCreate = z.infer<typeof s.exerciseCreateSchema>;
export type Exercise = z.infer<typeof s.exerciseSchema>;

//workouts
export type WorkoutFormValues = z.infer<typeof s.workoutFormSchema>;
