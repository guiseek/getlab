export function createEl<K extends keyof HTMLElementTagNameMap>(
  name: K,
  attributes: Partial<HTMLElementTagNameMap[K]> = {}
) {
  return Object.assign(document.createElement(name), attributes)
}
