import { SpreadsheetRow } from '../../entities/spreadsheet-row';
import { UseCase } from '../../base/use-case';
import { formatRow } from '../../mapper';

export class DownloadSpreadsheetUseCase
  implements UseCase<SpreadsheetRow[], void>
{
  execute(rows: SpreadsheetRow[]) {
    const parsed = rows.map(formatRow).join('\n');
    const blob = this.#createFile(parsed, 'text/csv');

    const prefix = this.#getDatePrefixFile(rows[0].date);
    const name = `Solicitação de reserva laboratórios`;
    const spreadsheet = this.#downloadFile(blob, `${prefix} - ${name}.csv`);

    return Promise.resolve(spreadsheet);
  }

  #getDatePrefixFile(date: Date) {
    return date.toLocaleDateString().slice(3).replace('/', '_');
  }

  #createFile<T extends string | Blob>(
    content: T,
    type: `${string}/${string}`
  ) {
    return new Blob([content], { type: `${type};charset=utf-8;` });
  }

  #createEl<K extends keyof HTMLElementTagNameMap>(
    name: K,
    attributes: Partial<HTMLElementTagNameMap[K]> = {}
  ) {
    return Object.assign(document.createElement(name), attributes);
  }

  #downloadFile(blob: Blob, download: `${string}.${string}`) {
    const href = URL.createObjectURL(blob);
    this.#createEl('a', { download, href }).click();
    URL.revokeObjectURL(href);
  }
}
