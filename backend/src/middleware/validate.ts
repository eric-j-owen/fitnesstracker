import type { RequestHandler } from "express";
import { ZodSchema } from "zod";

export function validate(schema: ZodSchema): RequestHandler {
  return (req, res, next) => {
    try {
      schema.parse({
        params: req.params,
        body: req.body,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}
