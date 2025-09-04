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

//fooditems
export type FoodItemType = z.infer<typeof s.foodItemSchema>;
export type FoodPortion = z.infer<typeof s.foodPortion>;

export type NutrientsType = z.infer<typeof s.foodItemSchema.shape.nutrients>;

// food log
export type CreateFoodLogEntry = z.infer<typeof s.createFoodLogSchema>;
export type EditFoodLogEntry = z.infer<typeof s.editFoodLogSchema>;
export type FoodLogFormInputs = z.infer<typeof s.foodLogFormInputs>;
export type FoodLogResponse = z.infer<typeof s.foodLogResponseSchema>;
