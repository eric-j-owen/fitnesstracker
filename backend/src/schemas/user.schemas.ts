import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
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
    targetProtein: z.number().min(0).optional(),
    targetCarbs: z.number().min(0).optional(),
    targetFats: z.number().min(0).optional(),
  }),
});
