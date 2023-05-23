type Rec<T> = { _id: unknown } & T;

export const fromMongo = <T>(item: Rec<T>) => ({
  ...item,
  id: item._id,
});
