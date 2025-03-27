import pg from "pg";
import { pgConnection } from "./config.js";
const { Pool } = pg;

const pool = new Pool({
  ...pgConnection,
  log: (msg) => console.log("PG Log:", msg),
});

export const query = (text: string, params?: unknown[]) => {
  return pool.query(text, params);
};
