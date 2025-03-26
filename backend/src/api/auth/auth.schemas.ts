import { z } from "zod";
import { UserSchema } from "../users/user.schemas.js";

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
    passwordRaw: z.string().max(255).trim().min(1),
  }),
});

export type RegisterUserBody = z.infer<typeof registerUserSchema.shape.body>;
export type LoginUserBody = z.infer<typeof LoginSchema.shape.body>;
