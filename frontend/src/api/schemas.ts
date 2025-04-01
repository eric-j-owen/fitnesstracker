import { z } from "zod";

export const registerUserSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required").max(255),
    username: z
      .string()
      .min(3, "Username must be at least 3 chracters")
      .regex(/^[a-zA-Z0-9_-]+$/, {
        message:
          "Username can only contain letters, numbers, underscores, and hyphens",
      })
      .max(255),
    passwordRaw: z
      .string()
      .min(8, "Password must contain 8 characters")
      .max(255, "Password is too long"),
    confirmPassword: z
      .string()
      .min(8, "Password must contain 8 characters")
      .max(255, "Password is too long"),
  })
  .refine(
    (data) =>
      data.passwordRaw === data.confirmPassword && data.confirmPassword.length,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export const loginUserSchema = z.object({
  username: z.string().max(255).trim().min(1, "Username is required."),
  passwordRaw: z.string().max(255).trim().min(1, "Password is required."),
});

export const authenticatedUserSchema = z.object({
  firstName: registerUserSchema.innerType().shape.firstName,
  lastName: z.string(),
  username: registerUserSchema.innerType().shape.username,
  targetProtein: z.coerce.number().min(0),
  targetCarbs: z.coerce.number().min(0),
  targetFats: z.coerce.number().min(0),
});

export const updatePasswordSchema = z
  .object({
    passwordOld: loginUserSchema.shape.passwordRaw,
    passwordNew: loginUserSchema.shape.passwordRaw,
    confirmNewPassword: loginUserSchema.shape.passwordRaw,
  })
  .refine(
    (data) =>
      data.passwordNew === data.confirmNewPassword &&
      data.confirmNewPassword.length,
    {
      message: "Passwords do not match",
      path: ["confirmNewPassword"],
    }
  );

export const macrosFormSchema = z.object({
  calories: z.coerce.number().min(0).max(20000),
  protein: z.coerce.number().min(0).max(20000),
  carbs: z.coerce.number().min(0).max(20000),
  fats: z.coerce.number().min(0).max(20000),
  date: z.string(),
});

export const metricsFormSchema = z.object({
  type: z.string(),
  val: z.coerce.number().positive().max(20000),
  date: z.string(),
});

export const exerciseFormSchema = z.object({
  exerciseName: z.string().nonempty("Exercise name is required").max(255),
  exerciseType: z.enum(["strength", "cardio"]),
});

export type MetricsFormData = z.infer<typeof metricsFormSchema>;
export type MacrosFormData = z.infer<typeof macrosFormSchema>;
export type LoginUserData = z.infer<typeof loginUserSchema>;
export type RegisterUserData = z.infer<typeof registerUserSchema>;
export type AuthenticatedUser = z.infer<typeof authenticatedUserSchema>;
