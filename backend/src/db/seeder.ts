import "dotenv/config";
import { pgConnection } from "./config.js";
import pkg from "pg";
import { faker } from "@faker-js/faker";
const { Client } = pkg;

const USER_COUNT = 20;

export const seedDatabase = async (): Promise<void> => {
  const client = new Client({
    ...pgConnection,
    host: process.env.POSTGRES_HOST,
  });

  try {
    console.log("starting database seeding...");
    await client.connect();

    await client.query("truncate table users restart identity;");

    for (let i = 0; i < USER_COUNT; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const username = faker.internet.username({ firstName, lastName });
      const passwordHash = crypto.randomUUID();

      const query = `
        insert into users (
          first_name, 
          last_name, 
          username, 
          password_hash
        ) VALUES ($1, $2, $3, $4);
      `;

      const values = [firstName, lastName, username, passwordHash];

      try {
        await client.query(query, values);
      } catch (err) {
        console.error(`failed to create user ${username}:`);
        throw err;
      }
    }
    console.log("seeding success");
  } catch (err) {
    console.error("database seeding failed:", err);
    throw err;
  } finally {
    await client.end();
  }
};

if (import.meta.url === `file://${process.argv[1]}`) seedDatabase();
