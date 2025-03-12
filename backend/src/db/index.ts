import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
});

export const query = (text: string, params?: unknown[]) => {
  return pool.query(text, params);
};
