import { describe, it, expect } from "vitest";
import app from "../src/app.js";
import request from "supertest";

describe("api route connection tests", () => {
  it("should connect to server successfully", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
  });
});
