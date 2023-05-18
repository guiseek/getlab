export function createFile<T extends string | Blob>(
  content: T,
  type: `${string}/${string}`
) {
  return new Blob([content], {type: `${type};charset=utf-8;`})
}
