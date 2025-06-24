import type { z } from "zod";
import type * as s from "./api.schemas.js";

export type IdParam = z.infer<typeof s.idParamSchema.shape.params>;

//auth
export type RegisterUserBody = z.infer<typeof s.registerUserSchema.shape.body>;
export type LoginUserBody = z.infer<typeof s.LoginSchema.shape.body>;

//user
export type User = z.infer<typeof s.UserSchema>;
export type UpdateUserBody = z.infer<typeof s.UpdateUserSchema.shape.body>;

//macro
export type LogMacrosBody = z.infer<typeof s.logMacrosBodySchema.shape.body>;

//metric
export type LogMetric = z.infer<typeof s.logMetricSchema.shape.body>;

//fooditems
export type FoodItem = z.infer<typeof s.foodItemSchema>;
export type FoodPortions = z.infer<typeof s.foodItemSchema.shape.foodPortions>;
