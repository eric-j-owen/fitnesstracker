import { z } from "zod";

export const registerUserSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required").max(255),
    email: z.string().email("Invalid email address").max(255),
    passwordRaw: z
      .string()
      .min(8, "Password must contain 8 characters")
      .max(255, "Password cannot be longer than 255 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.passwordRaw === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  passwordRaw: z.string().min(1, "Password is required"),
});

export const authenticatedUser = z.object({
  id: z.string(),
  firstName: z.string(),
  email: z.string(),
});

export type LoginUserData = z.infer<typeof loginUserSchema>;
export type RegisterUserData = z.infer<typeof registerUserSchema>;
export type AuthenticatedUser = z.infer<typeof authenticatedUser>;
