import { z } from "zod";

export const workoutBodySchema = z.object({
  body: z.object({}),
});
