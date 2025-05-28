import { z } from "zod";

export const logMetricSchema = z.object({
  body: z.object({
    type: z.enum(["weight"]),
    val: z.number().min(0),
    date: z.string(),
  }),
});
