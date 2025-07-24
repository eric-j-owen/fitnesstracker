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
export type FoodPortionsArray = z.infer<
  typeof s.foodItemSchema.shape.foodPortions
>;

export type NutrientsType = z.infer<typeof s.foodItemSchema.shape.nutrients>;

// food log
export type FoodLogReqBody = z.infer<typeof s.createFoodLogSchema.shape.body>;
