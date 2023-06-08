export class SpreadsheetFile<T extends string | Blob> {
  file: Blob;

  constructor(content: T, type: `${string}/${string}`) {
    this.file = new Blob([content], { type: `${type};charset=utf-8;` });
  }

  getDatePrefixFile(date: Date) {
    return date.toLocaleDateString().slice(3).replace('/', '_');
  }

  downloadFile(download: `${string}.${string}`) {
    const href = URL.createObjectURL(this.file);
    this.#createEl('a', { download, href }).click();
    URL.revokeObjectURL(href);
  }

  #createEl<K extends keyof HTMLElementTagNameMap>(
    name: K,
    attributes: Partial<HTMLElementTagNameMap[K]> = {}
  ) {
    return Object.assign(document.createElement(name), attributes);
  }
}
