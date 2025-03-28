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
        avatar_url text,
        user_role text check (user_role in ('basic', 'trainer')) default 'basic',
        target_calories int,
        target_protein int,
        target_carbs int,
        target_fats int,
        created_at timestamptz default current_timestamp,
        updated_at timestamptz default current_timestamp
    );`
);

migrationsUp.set(
  "create-metrics-table",
  `create table if not exists metrics (
      id serial primary key,
      user_id int not null references users(id) on delete cascade,
      type text not null check (type in ('weight')),
      value DECIMAL(8,2) not null,
      date timestamptz not null default current_timestamp,
      unique (user_id, date, type)
  );`
);

migrationsUp.set(
  "create-macros-table",
  `create table if not exists macros (
      id serial primary key,
      user_id int not null references users(id) on delete cascade,
      calories int not null,
      protein int not null,
      carbs int not null,
      fats int not null,
      date date not null,
      unique (user_id, date)
  );`
);

migrationsUp.set(
  "create-workouts-table",
  `create table if not exists workouts (
      id serial primary key,
      user_id int references users(id) on delete cascade,
      workout_name text not null,
      days text not null,
      created_at timestamptz default current_timestamp
    );`
);

migrationsUp.set(
  "create-exercises-table",
  `create table if not exists exercises (
      id serial primary key,
      user_id int not null references users(id) on delete cascade,
      workout_id int references workouts(id) on delete cascade,
      exercise_name text not null,
      sets int not null check (sets > 0),
      reps int not null check (reps > 0),
      weight decimal(6,2) not null
    );`
);

if (import.meta.url === `file://${process.argv[1]}`) runMigrationsAll();
