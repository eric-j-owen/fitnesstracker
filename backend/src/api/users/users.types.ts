import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string().optional(),
  email: z.string().email(),
  password_hash: z.string(),
  user_role: z.enum(["basic", "trainer"]),
  created_at: z.date().or(z.string()),
  updated_at: z.date().or(z.string()),
});

export const UserRequestParamsSchema = z.object({
  id: z.number().int().positive(),
});

export const CreateUserSchema = z.object({
  first_name: z.string().trim().min(1).max(255),
  last_name: z.string().trim().min(1).max(255).optional(),
  email: z.string().email().max(255),
  password_hash: z.string(),
  user_role: z.enum(["basic", "trainer"]).default("basic"),
});

export type User = z.infer<typeof UserSchema>;
export type UserRequestParams = z.infer<typeof UserRequestParamsSchema>;
export type CreateUserBody = z.infer<typeof CreateUserSchema>;
