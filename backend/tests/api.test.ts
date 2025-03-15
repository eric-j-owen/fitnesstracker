import "dotenv/config";
import { describe, expect, test, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { Client } from "pg";
import { pgConnection } from "../src/db/config.js";
import { UserSchema } from "../src/api/users/user.schemas.js";
import { seedDatabase } from "../src/db/seeder.js";

describe("api tests", () => {
  const apiReq = request(`${process.env.TEST_URL}`);
  let client: Client;

  beforeAll(async () => {
    client = new Client({
      ...pgConnection,
      host: process.env.POSTGRES_HOST,
    });

    await client.connect();
    await seedDatabase();
  });

  afterAll(async () => {
    // await client.query("truncate table users restart identity;");
    await seedDatabase();
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

    test("DELETE /:id should delete user with id", async () => {
      const { rows } = await client.query("select id from users limit 1;");
      const { id } = rows[0];
      const deleteUserResponse = await apiReq.delete(`/api/users/${id}`);
      expect(deleteUserResponse.status).toBe(204);

      const deletedRows = await client.query(
        "select id from users where id = $1;",
        [id]
      );
      expect(deletedRows.rows.length).toBe(0);
    });

    test("PATCH /:id should update a user", async () => {
      const { rows } = await client.query("select id from users limit 1;");
      const { id } = rows[0];
      const userEdit = {
        email: "updated@updated.com",
      };
      const updateUserRes = await apiReq
        .patch(`/api/users/${id}`)
        .send(userEdit)
        .expect(200);

      expect(updateUserRes.body).toHaveProperty("email", userEdit.email);
    });
  });

  //   test("POST / should create a new user", async () => {
  //     const id = crypto.randomUUID();
  //     const newUser = {
  //       id,
  //       first_name: "testuser",
  //       last_name: "testuserlastname",
  //       email: "testuser@gmail.com",
  //       password_hash: "thisisahashedpassword",
  //     };
  //     apiReq.post("/api/users").send(newUser);
  //   });
});
