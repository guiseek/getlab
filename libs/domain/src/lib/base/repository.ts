export interface CreateOne<I, O> {
  createOne(input: I): Promise<O>;
}

export interface UpdateOne<I, K extends keyof I, O> {
  updateOne(key: I[K], input: I): Promise<O>;
}

export interface RemoveOne<I, K extends keyof I, O> {
  removeOne(key: I[K]): Promise<O>;
}

export interface FindOne<I, K extends keyof I, O> {
  findOne(key: I[K]): Promise<O>;
}

export interface FindAll<O> {
  findAll(): Promise<O[]>;
}
