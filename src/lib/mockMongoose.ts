type Query = Record<string, unknown>;

export class MockModel<T extends Record<string, any>> {
  private records: T[] = [];

  async create(data: Partial<T>): Promise<T> {
    const record = {
      ...(data as Record<string, unknown>),
      _id: `${Date.now()}-${Math.random()}`,
    } as unknown as T;

    this.records.push(record);
    return record;
  }

  async findById(id: string): Promise<T | null> {
    return this.records.find((record) => String((record as any)._id) === String(id)) ?? null;
  }

  async countDocuments(query: Query): Promise<number> {
    const { shiftId } = query as { shiftId?: string };

    if (typeof shiftId !== "string") {
      return 0;
    }

    return this.records.filter((record) => (record as any).shiftId === shiftId).length;
  }

  async deleteMany(): Promise<void> {
    this.records.length = 0;
  }
}

const models = new Map<string, MockModel<any>>();

export const mockMongoose = {
  model<T extends Record<string, any>>(name: string): MockModel<T> {
    if (!models.has(name)) {
      models.set(name, new MockModel<T>());
    }

    return models.get(name) as MockModel<T>;
  },
};

export default mockMongoose;
