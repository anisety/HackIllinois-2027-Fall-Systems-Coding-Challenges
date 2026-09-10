import { z } from "zod";

export const zSu = z.object({
  nm: z.string(),
});

export type SignupRecord = {
  _id: string;
  sId: string;
  nm: string;
};

const signups: SignupRecord[] = [];

export const Sup = {
  async countDocuments(query: { sId: string }) {
    return signups.filter((entry) => entry.sId === query.sId).length;
  },

  async create(data: { sId: string; nm: string }) {
    const record: SignupRecord = {
      _id: `${Date.now()}-${Math.random()}`,
      ...data,
    };

    signups.push(record);
    return record;
  },

  async deleteMany() {
    signups.length = 0;
  },
};
