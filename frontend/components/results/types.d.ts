import type { HTMLAttributes } from 'react';
import type {
  Column,
  ColumnDef,
  Table
} from '@tanstack/react-table';

interface IDataTableColumnHeaderProps<TData, TValue>
  extends HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export type TDataTableViewOptionsProps<TData> = {
  table: Table<TData>;
}

export type TDataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export type TDataTablePaginationProps<TData> = {
  table: Table<TData>;
}

export type TParsedResults = {
  error: string;
  patientFullName: string;
  patientPesel: string;
  insuranceStatus: string;
  prescriptionSymbol: string;
  vaccineCovid: string;
  ukr: string;
  xml: string;
}
