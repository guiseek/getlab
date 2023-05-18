import {
  formatRow,
  createFile,
  downloadFile,
  getDatePrefixFile,
} from '@getlab/util-core';
import { SpreadsheetRow } from '../../entities/spreadsheet-row';
import { UseCase } from '../../base/use-case';

export class DownloadSpreadsheetUseCase
  implements UseCase<SpreadsheetRow[], void>
{
  execute(rows: SpreadsheetRow[]) {
    const parsed = rows.map(formatRow).join('\n');
    const blob = createFile(parsed, 'text/csv');

    const prefix = getDatePrefixFile(rows[0].date);
    const name = `Solicitação de reserva laboratórios`;
    const spreadsheet = downloadFile(blob, `${prefix} - ${name}.csv`);

    return Promise.resolve(spreadsheet);
  }
}
