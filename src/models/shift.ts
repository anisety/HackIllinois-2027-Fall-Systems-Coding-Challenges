import { z } from "zod";
import mockMongoose from "../lib/mockMongoose";

export const shiftSchema = z.object({
  name: z.string(),
  capacity: z.number(),
});

export type ShiftRecord = {
  _id: string;
  name: string;
  capacity: number;
};

export const Shift = mockMongoose.model<ShiftRecord>("Shift");
