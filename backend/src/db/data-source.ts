import "reflect-metadata";
import { DataSource } from "typeorm";
import type { DataSourceOptions } from "typeorm";
import { pgConnection } from "./config.js";
import * as entities from "./entities/index.js";

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: pgConnection.host,
  port: pgConnection.port,
  username: pgConnection.user,
  password: pgConnection.password,
  database: pgConnection.database,
  synchronize: true,
  logging: true,
  entities: [entities.User, entities.Metric],
};

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
