import type { RequestHandler } from "express";
import createHttpError from "http-errors";

export const requireAuth: RequestHandler = (req, res, next) => {
  if (req.session.isAuthenticated && req.session.userId) {
    next();
  } else {
    next(createHttpError(401, "Authentication required"));
  }
};
