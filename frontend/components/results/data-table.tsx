'use client';

import { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pagination } from '@/components/results/pagination';
import { DataTableViewOptions } from '@/components/results/column-toggle';
import type {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import type { TDataTableProps } from '@/components/results/types';

export function DataTable<TData, TValue>({
  columns,
  data,
}: TDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Filtruj po nr PESEL..."
          value={(table.getColumn('patientPesel')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('patientPesel')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.getContext().column.id === ('insuranceStatus') ?
                        cell.getValue() === 'Tak' ? (
                          <div
                            className="inline-block mr-2 aspect-square size-3 bg-statusGreen border rounded-full border-input shadow-sm"></div>
                        ) : (
                          <div
                            className="inline-block mr-2 aspect-square size-3 bg-statusRed border rounded-full border-input shadow-sm"></div>
                        ) : false
                      }
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Brak wyników
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination table={table} />
      <div
        className="max-w-[82ch] flex flex-col items-start p-2 gap-2 text-sm text-muted-foreground leading-relaxed rounded-md border border-input">
        <p className="">
          Legenda:
        </p>
        <ul className="list-disc list-outside pl-3">
          <li>
            Kolumna
            <span className="font-bold"> UKR </span>
            - Wartość
            <span className="font-bold"> TAK </span>
            :<br />
            „Pacjent posiada uprawnienie do świadczeń opieki zdrowotnej na mocy Ustawy z dnia 12 marca 2022 r. o
            pomocy obywatelom Ukrainy w związku z konfliktem zbrojnym na terytorium tego państwa”
          </li>
        </ul>
      </div>
    </div>
  );
}
