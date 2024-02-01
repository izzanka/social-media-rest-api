import request from "supertest";
import { app } from "../index.js";

describe("auth", () => {
  it("register user", async () => {
    const params = {
      username: "test14",
      email: "test14@gmail.com",
      password: "password",
    };
    const res = await request(app).post("/api/v1/auth/register").send(params);
    expect(res.statusCode).toBe(200);
  });

  it("login user", async () => {
    const params = {
      email: "test13@gmail.com",
      password: "password",
    };
    const res = await request(app).post("/api/v1/auth/login").send(params);
    expect(res.statusCode).toBe(200);
  });
});
