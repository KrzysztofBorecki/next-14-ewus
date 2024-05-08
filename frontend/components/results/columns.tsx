'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTableColumnHeader } from '@/components/results/column-header';
import { MoreHorizontal } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import type { TParsedResults } from '@/components/results/types';

function getCurrentLocalDate() {
  return new Date()
    .toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    .split(/[.:]/).join('-')
    .split(', ').join('.');
}

function downloadXmlFile(xmlFileString: string) {
  const blob = new Blob([xmlFileString], { type: 'application/xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const date = getCurrentLocalDate();
  const a = document.createElement('a');

  a.href = url;
  a.download = `raport.eWUŚ.${date}.xml`;
  a.click();

  URL.revokeObjectURL(url);
}

export const columns: ColumnDef<TParsedResults>[] = [
  {
    accessorKey: 'patientPesel',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PESEL" />
    ),
  },
  {
    accessorKey: 'patientFullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nazwisko i Imię" />
    ),
  },
  {
    accessorKey: 'insuranceStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ubezpieczony" />
    ),
  },
  {
    accessorKey: 'ukr',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UKR" />
    ),
  },
  {
    accessorKey: 'prescriptionSymbol',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Symbol Rp" />
    ),
  },
  {
    accessorKey: 'vaccineCovid',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Szczepienie COVID" />
    ),
  },
  {
    accessorKey: 'error',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Uwagi" />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const patient = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Otwórz menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Akcje</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (patient.error === '—') {
                  return navigator.clipboard.writeText(
                    `pesel=${patient.patientPesel}`
                  );
                } else {
                  return navigator.clipboard.writeText(
                    `uwagi=${patient.error}`
                  );
                }
              }}
            >
              Skopiuj PESEL pacjenta
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                if (patient.error === '—') {
                  return navigator.clipboard.writeText(
                    `pesel=${patient.patientPesel}; imię-i-nazwisko=${patient.patientFullName}; status-ubezpieczenia=${patient.insuranceStatus}; urk=${(patient.ukr !== '—') ? 'Tak' : 'Nie'}; uprawnienia-dodatkowe=${(patient.prescriptionSymbol !== '—' ? patient.prescriptionSymbol : 'Nie')}; szczepienie-covid=${(patient.vaccineCovid !== '—') ? 'Tak' : 'Nie'}`
                  );
                } else {
                  return navigator.clipboard.writeText(
                    `uwagi=${patient.error}`
                  );
                }
              }}
            >
              Skopiuj podsumowanie wyniku pacjenta
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => downloadXmlFile(patient.xml)}
            >
              Pobierz plik XML
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
