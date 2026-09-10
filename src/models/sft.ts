import { z } from "zod";

export const zSh = z.object({
  nm: z.string(),
  cap: z.number(),
});

export type ShiftRecord = {
  _id: string;
  nm: string;
  cap: number;
};

const shifts: ShiftRecord[] = [];

export const Sft = {
  async create(data: z.infer<typeof zSh>) {
    const record: ShiftRecord = {
      _id: `${Date.now()}-${Math.random()}`,
      ...data,
    };

    shifts.push(record);
    return record;
  },

  async findById(id: string) {
    return shifts.find((shift) => shift._id === id) ?? null;
  },

  async deleteMany() {
    shifts.length = 0;
  },
};
