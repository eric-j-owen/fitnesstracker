import createHttpError from "http-errors";
import userRouter from "./users/user.routes.js";
import type { Express } from "express";

export default function mountRoutes(app: Express) {
  app.get("/health", (req, res) => {
    res.sendStatus(200);
  });

  app.use("/api/users", userRouter);

  app.use((req, res, next) => {
    next(createHttpError(404, `${req.path} Endpoint not found`));
  });
}
