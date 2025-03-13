import pg from "pg";
import { pgConnection } from "./config.js";
const { Pool } = pg;

const pool = new Pool(pgConnection);

export const query = (text: string, params?: unknown[]) => {
  return pool.query(text, params);
};
