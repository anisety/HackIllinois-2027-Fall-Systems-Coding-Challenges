import { z } from "zod";
import mockMongoose from "../lib/mockMongoose";

export const signupSchema = z.object({
  name: z.string(),
});

export type SignupRecord = {
  _id: string;
  shiftId: string;
  name: string;
};

export const Signup = mockMongoose.model<SignupRecord>("Signup");
