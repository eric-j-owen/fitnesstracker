import { z } from "zod";

//common
export const idParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[1-9]\d*$/, "Invalid id"),
  }),
});

//user
export const UserSchema = z.object({
  id: z.number(),
  firstName: z.string().min(1).max(255),
  lastName: z.string().optional(),
  username: z
    .string()
    .min(3)
    .max(255)
    .regex(/^[a-zA-Z0-9_-]+$/),
  passwordHash: z.string(),
  userRole: z.enum(["basic", "trainer"]),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

export const UpdateUserSchema = z.object({
  body: z.object({
    firstName: z.string().trim().min(1).max(255).optional(),
    lastName: z.string().trim().max(255).optional(),
    username: UserSchema.shape.username.optional(),
    userRole: z.enum(["basic", "trainer"]).default("basic").optional(),
    targetProtein: z.number().min(0).max(20000).optional(),
    targetCarbs: z.number().min(0).max(20000).optional(),
    targetFats: z.number().min(0).max(20000).optional(),
  }),
});

//auth
export const registerUserSchema = z.object({
  body: z.object({
    firstName: z.string().trim().min(1).max(255),
    username: UserSchema.shape.username,
    passwordRaw: z.string().min(8).max(255),
    userRole: z.enum(["basic", "trainer"]).default("basic"),
  }),
});

export const LoginSchema = z.object({
  body: z.object({
    username: UserSchema.shape.username,
    passwordRaw: z.string().max(255).min(1),
  }),
});

//macros
export const logMacrosBodySchema = z.object({
  body: z.object({
    calories: z.coerce.number().min(0).max(20000),
    protein: z.coerce.number().min(0).max(20000),
    carbs: z.coerce.number().min(0).max(20000),
    fats: z.coerce.number().min(0).max(20000),
    date: z.string().optional(),
  }),
});

//metrics
export const logMetricSchema = z.object({
  body: z.object({
    type: z.enum(["weight"]),
    val: z.number().min(0).max(20000),
    date: z.string(),
  }),
});
