'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import type { TDataTableViewOptionsProps } from '@/components/results/types';

const COLUMN_ID_NAMES_PL: Record<string, string> = {
  patientPesel: 'PESEL',
  patientFullName: 'Imię i Nazwisko',
  insuranceStatus: 'Ubezpieczony',
  ukr: 'UKR',
  prescriptionSymbol: 'Symbol Rp',
  vaccineCovid: 'Szczepienie COVID',
  error: 'Uwagi',
  xml: 'plik XML',
};

export function DataTableViewOptions<TData>({
  table,
}: TDataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto h-8 flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          Wybór Kolumn
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          Widoczne Kolumny
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {COLUMN_ID_NAMES_PL[column.id]}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
