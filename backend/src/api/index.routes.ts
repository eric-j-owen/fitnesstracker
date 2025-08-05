import createHttpError from "http-errors";
import type { Express } from "express";
import { requireAuth } from "../middleware/auth.js";
import userRouter from "./users/user.routes.js";
import authRouter from "./auth/auth.routes.js";
import macrosRouter from "./macros/macros.routes.js";
import metricsRouter from "./metrics/metrics.routes.js";
import foodItemRouter from "./foodItems/foodItems.routes.js";
import foodLogRouter from "./foodLogs/foodLogs.routes.js";

export default function mountRoutes(app: Express) {
  app.get("/health", (req, res) => {
    res.sendStatus(200);
  });

  app.use("/api/users", requireAuth, userRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/macros", requireAuth, macrosRouter);
  app.use("/api/metrics", requireAuth, metricsRouter);
  app.use("/api/fooditems", foodItemRouter);
  app.use("/api/foodlog", foodLogRouter);

  app.use((req, res, next) => {
    next(createHttpError(404, `${req.path} Endpoint not found`));
  });
}
