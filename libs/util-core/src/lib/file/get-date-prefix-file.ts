export const getDatePrefixFile = (date: Date) => {
  return date.toLocaleDateString().slice(3).replace('/', '_');
};
