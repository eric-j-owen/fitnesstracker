import "dotenv/config";
import { pgConnection } from "./config.js";
import pkg from "pg";
const { Client } = pkg;

const runMigrationsAll = async (): Promise<void> => {
  const client = new Client({
    ...pgConnection,
    host: process.env.POSTGRES_HOST,
  });
  try {
    console.log("running migrations...");

    await client.connect();

    for (const [k, q] of migrationsUp) {
      try {
        await client.query(q);
        console.log(`applied migration ${k}`);
      } catch (err) {
        console.error(`failed to apply migration ${k}:`, err);
        throw err;
      }
    }

    console.log("all migrations applied");
  } catch (err) {
    console.error("migration process failed", err);
    throw err;
  } finally {
    await client.end();
  }
};

const migrationsUp: Map<string, string> = new Map();

migrationsUp.set(
  "create-user-table",
  `create table if not exists users (
        id serial primary key,
        first_name text not null,
        last_name text,
        username text not null unique,
        password_hash text not null,
        user_role text check (user_role in ('basic', 'trainer')) default 'basic',
        created_at timestamptz default current_timestamp,
        updated_at timestamptz default current_timestamp
    );`
);

if (import.meta.url === `file://${process.argv[1]}`) runMigrationsAll();
