import "dotenv/config";
import { describe, expect, test, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { Client } from "pg";
import { pgConnection } from "../src/db/config.js";
import { UserSchema } from "../src/api/users/users.types.js";

describe("api tests", () => {
  const apiReq = request(`${process.env.TEST_URL}`);
  let client: Client;

  beforeAll(async () => {
    client = new Client({
      ...pgConnection,
      host: process.env.POSTGRES_HOST,
    });

    await client.connect();
  });

  afterAll(async () => {
    await client.end();
  });

  describe("api route health check", () => {
    test("/health should connect to server successfully", async () => {
      const response = await apiReq.get("/health");
      expect(response.status).toBe(200);
    });
  });

  describe("api/users", () => {
    test("GET / should return an array of users", async () => {
      const response = await apiReq.get("/api/users");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

    test("GET /:id should return a single user", async () => {
      const { rows } = await client.query("select id from users limit 1;");
      const { id } = rows[0];
      const getByIdResponse = await apiReq.get(`/api/users/${id}`);
      const validateUser = UserSchema.safeParse(getByIdResponse.body);
      expect(getByIdResponse.status).toBe(200);
      expect(validateUser.success).toBe(true);
    });

    test("DELETE /:id should delete user with id", async () => {});

    test("PUT /:id should update a user", async () => {});
  });

  describe("api/auth", () => {
    // test("POST / should create a new user", async () => {
    //   const id = crypto.randomUUID();
    //   const newUser = {
    //     id,
    //     first_name: "testuser",
    //     last_name: "testuserlastname",
    //     username: "testuser123",
    //     email: "testuser@gmail.com",
    //     password_hash: "thisisahashedpassword",
    //   };
    //   apiReq.post("/api/users").send(newUser);
    // });
  });
});
