import { z } from "zod";

export const exerciseBodySchema = z.object({
  body: z.object({
    exerciseName: z.string(),
    exerciseType: z.string(),
  }),
});
