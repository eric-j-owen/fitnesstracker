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
  id: z.string().optional(),
  firstName: registerUserSchema.innerType().shape.firstName,
  lastName: z.string(),
  username: registerUserSchema.innerType().shape.username,
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

export type LoginUserData = z.infer<typeof loginUserSchema>;
export type RegisterUserData = z.infer<typeof registerUserSchema>;
export type AuthenticatedUser = z.infer<typeof authenticatedUserSchema>;
