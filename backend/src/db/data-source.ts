import "reflect-metadata";
import { DataSource } from "typeorm";
import type { DataSourceOptions } from "typeorm";
import * as entities from "./entities/_index.js";

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: ["error"],
  entities: [
    entities.User,
    entities.Metric,
    entities.Macro,
    entities.Workout,
    entities.Exercise,
    entities.WorkoutExercisesLink,
  ],
};

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
