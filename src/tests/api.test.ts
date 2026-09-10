import rq from "supertest";
import app from "../app";
import { Shift } from "../models/shift";
import { Signup } from "../models/signup";

describe("API", () => {
  beforeAll(async () => {
    await Shift.deleteMany();
    await Signup.deleteMany();
  });

  afterAll(async () => {
    await Shift.deleteMany();
    await Signup.deleteMany();
  });

  it("adds", async () => {
    const response = await rq(app)
      .post("/shift")
      .send({
        name: "A",
        capacity: 5,
      });

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("A");
  });
});
