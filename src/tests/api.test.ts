import rq from "supertest";
import a from "../app";
import { Sft } from "../models/sft";
import { Sup } from "../models/sup";

describe("API", () => {
  beforeAll(async () => {
    await Sft.deleteMany();
    await Sup.deleteMany();
  });

  afterAll(async () => {
    await Sft.deleteMany();
    await Sup.deleteMany();
  });

  it("adds", async () => {
    const response = await rq(a)
      .post("/sft")
      .send({
        nm: "A",
        cap: 5,
      });

    expect(response.status).toBe(200);
    expect(response.body.data.nm).toBe("A");
  });
});
