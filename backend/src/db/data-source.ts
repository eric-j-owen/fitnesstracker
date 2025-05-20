import "reflect-metadata";
import { DataSource } from "typeorm";
import type { DataSourceOptions } from "typeorm";
import { pgConnection } from "./config.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: pgConnection.host,
  port: pgConnection.port,
  username: pgConnection.user,
  password: pgConnection.password,
  database: pgConnection.database,
  synchronize: true,
  logging: true,
  entities: [
    path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "entities",
      "*.entity.{js,ts}"
    ),
  ],
};

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
