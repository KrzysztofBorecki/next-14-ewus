import { columns } from '@/components/results/columns';
import { DataTable } from '@/components/results/data-table';
import type { TParsedResults } from '@/components/results/types';
import type { TResults } from '@/components/check_cwu/types';

function parseResults(resultsList: TResults[]): TParsedResults[] {
  return resultsList.map((results) => {
    return (results.error) ? ({
      error: `Błąd - ${String(results.message)}`,
      patientFullName: '✕',
      patientPesel: String(results.id),
      insuranceStatus: '✕',
      prescriptionSymbol: '✕',
      vaccineCovid: '✕',
      ukr: '✕',
      xml: '✕',
    }) : ({
      error: '—',
      patientFullName: `${results.body.patientLastName} ${results.body.patientFirstName}`,
      patientPesel: String(results.body.patientPesel),
      insuranceStatus: results.body.insuranceStatus === 1 ? 'Tak' : 'Nie',
      prescriptionSymbol: results.body.prescriptionSymbol ? String(results.body.prescriptionSymbol) : '—',
      vaccineCovid: results.body.vaccineCovid ? 'Tak' : '—',
      ukr: results.body.urk ? 'Tak' : '—',
      xml: String(results.body.xml),
    });
  });
}

export default function Results({
  results,
}: {
  results: TResults[];
}) {
  return (
    <DataTable
      columns={columns}
      data={parseResults(results)}
    />
  );
}
