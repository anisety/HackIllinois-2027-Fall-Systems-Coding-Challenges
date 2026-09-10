import rq from "supertest";
import app from "../app";
import { Shift } from "../models/shift";
import { Signup } from "../models/signup";

describe("Volunteer Shift API", () => {
  // Reset all in-memory data before and after each test so tests do not interfere with each other.
  beforeEach(async () => {
    await Shift.deleteMany();
    await Signup.deleteMany();
  });

  afterEach(async () => {
    await Shift.deleteMany();
    await Signup.deleteMany();
  });

  // ----- CREATE SHIFT TESTS -----

  it("[create shift] creates a valid shift successfully", async () => {
    const response = await rq(app)
      .post("/shift")
      .send({
        name: "A",
        capacity: 5,
      });

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("A");
    expect(response.body.data.capacity).toBe(5);
    expect(response.body.data._id).toBeTruthy();
  });

  it("[create shift] rejects invalid shift payload", async () => {
    const response = await rq(app)
      .post("/shift")
      .send({
        name: "A",
        capacity: "bad",
      });

    expect(response.status).toBe(400);
    expect(response.body.err).toBe("bad req");
  });

  // ----- SIGNUP TESTS -----

  it("[signup] signs up a person for a valid shift", async () => {
    const createResponse = await rq(app)
      .post("/shift")
      .send({
        name: "Morning Crew",
        capacity: 2,
      });

    const shiftId = createResponse.body.data._id;

    const signupResponse = await rq(app).post(`/shift/${shiftId}/signup`).send({
      name: "Alice",
    });

    expect(signupResponse.status).toBe(200);
    expect(signupResponse.body.data.name).toBe("Alice");
    expect(signupResponse.body.data.shiftId).toBe(shiftId);
  });

  it("[signup] rejects signup when shift does not exist", async () => {
    const response = await rq(app).post("/shift/does-not-exist/signup").send({
      name: "Alice",
    });

    expect(response.status).toBe(404);
    expect(response.body.err).toBe("no shift");
  });

  it("[signup] rejects invalid signup payload", async () => {
    const createResponse = await rq(app)
      .post("/shift")
      .send({
        name: "Morning Crew",
        capacity: 2,
      });

    const shiftId = createResponse.body.data._id;

    const response = await rq(app).post(`/shift/${shiftId}/signup`).send({
      name: 123,
    });

    expect(response.status).toBe(400);
    expect(response.body.err).toBe("bad req");
  });

  it("[signup] rejects signup when the shift is full", async () => {
    const createResponse = await rq(app)
      .post("/shift")
      .send({
        name: "Small Shift",
        capacity: 1,
      });

    const shiftId = createResponse.body.data._id;

    const firstSignup = await rq(app).post(`/shift/${shiftId}/signup`).send({
      name: "Alice",
    });

    expect(firstSignup.status).toBe(200);

    const secondSignup = await rq(app).post(`/shift/${shiftId}/signup`).send({
      name: "Bob",
    });

    expect(secondSignup.status).toBe(400);
    expect(secondSignup.body.err).toBe("full");
  });
});
