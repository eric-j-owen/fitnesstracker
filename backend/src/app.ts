import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import mountRoutes from "./api/index.routes.js";
import { errorHandler } from "./middleware/globalErrorHandler.js";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);
mountRoutes(app);
app.use(errorHandler);

export default app;
