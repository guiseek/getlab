import { SpreadsheetRow, SpreadsheetFile } from '../../entities';
import { UseCase } from '../../base/use-case';
import { formatRow } from '../../mapper';

export class DownloadSpreadsheetUseCase
  implements UseCase<SpreadsheetRow[], void>
{
  execute(rows: SpreadsheetRow[]) {
    const parsed = rows.map(formatRow).join('\n');

    const name = `Solicitação de reserva laboratórios`;

    const file = new SpreadsheetFile(parsed, 'text/csv');
    const prefix = file.getDatePrefixFile(rows[0].date);

    return Promise.resolve(file.downloadFile(`${prefix} - ${name}.csv`));
  }
}
