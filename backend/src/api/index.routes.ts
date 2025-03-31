import createHttpError from "http-errors";
import userRouter from "./users/user.routes.js";
import authRouter from "./auth/auth.routes.js";
import macrosRouter from "./macros/macros.routes.js";
import metricsRouter from "./metrics/metrics.routes.js";
import exerciseRouter from "./exercises/exercises.routes.js";
import type { Express } from "express";
import { requireAuth } from "../middleware/auth.js";

export default function mountRoutes(app: Express) {
  app.get("/health", (req, res) => {
    res.sendStatus(200);
  });

  app.use("/api/users", userRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/macros", macrosRouter);
  app.use("/api/metrics", metricsRouter);
  app.use("/api/exercises", requireAuth, exerciseRouter);

  app.use((req, res, next) => {
    next(createHttpError(404, `${req.path} Endpoint not found`));
  });
}
