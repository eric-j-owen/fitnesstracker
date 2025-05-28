import { z } from "zod";

export const logMacrosBodySchema = z.object({
  body: z.object({
    calories: z.coerce.number().min(0).max(20000),
    protein: z.coerce.number().min(0).max(20000),
    carbs: z.coerce.number().min(0).max(20000),
    fats: z.coerce.number().min(0).max(20000),
    date: z.string().optional(),
  }),
});
