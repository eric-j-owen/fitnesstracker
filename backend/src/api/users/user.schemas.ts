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
  params: z.object({
    id: z.string().regex(/^[1-9]\d*$/, "Invalid id"),
  }),
});

export const UpdateUserSchema = z.object({
  params: UserRequestParamsSchema.shape.params,
  body: z
    .object({
      first_name: z.string().trim().min(1).max(255).optional(),
      last_name: z.string().trim().min(1).max(255).optional(),
      email: z.string().email().max(255).optional(),
      user_role: z.enum(["basic", "trainer"]).default("basic").optional(),
    })
    .refine(
      (data) => {
        return (
          data.first_name !== undefined ||
          data.last_name !== undefined ||
          data.email !== undefined ||
          data.user_role !== undefined
        );
      },
      {
        message: "missing a field to update",
      }
    ),
});

export const registerUserSchema = z.object({
  body: z.object({
    firstName: z.string().trim().min(1).max(255),
    email: z.string().email().max(255),
    passwordRaw: z.string().min(8).max(255),
    userRole: z.enum(["basic", "trainer"]).default("basic"),
  }),
});

export const LoginSchema = z.object({
  body: z.object({
    email: z.string().email().max(255).trim().min(1),
    passwordRaw: z.string().max(255).trim().min(1),
  }),
});

export type User = z.infer<typeof UserSchema>;
export type UserRequestParams = z.infer<
  typeof UserRequestParamsSchema.shape.params
>;
export type UpdateUserBody = z.infer<typeof UpdateUserSchema.shape.body>;
export type RegisterUserBody = z.infer<typeof registerUserSchema.shape.body>;
export type LoginUserBody = z.infer<typeof LoginSchema.shape.body>;
