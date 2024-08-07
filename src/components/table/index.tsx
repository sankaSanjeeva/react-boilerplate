import { useEffect, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table';
import { cn } from '@/utils/style';
import { SortIcon } from '@/assets/icons';
import { PAGE_SIZE } from '@/constants';
import { Pagination } from './components';

interface TableProps<T>
  extends Omit<
    TableOptions<T>,
    | 'getCoreRowModel'
    | 'getSortedRowModel'
    | 'getFilteredRowModel'
    | 'getPaginationRowModel'
    | 'onSortingChange'
    | 'onPaginationChange'
  > {
  className?: string;
  dataFlow?: 'auto' | 'pagination' | 'lazyLoading';
  totalRecords?: number;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => Promise<unknown>;
}

export default function Table<T>({
  className,
  dataFlow = 'auto',
  totalRecords,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  ...rest
}: TableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  const table = useReactTable<T>({
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    ...(dataFlow === 'pagination'
      ? {
          getPaginationRowModel: getPaginationRowModel(),
          onPaginationChange: setPagination,
          autoResetPageIndex: false,
        }
      : {}),
    ...rest,
    state: {
      sorting,
      ...(dataFlow === 'pagination' ? { pagination } : {}),
      ...rest.state,
    },
  });

  useEffect(() => {
    table.firstPage();
  }, [rest.state?.globalFilter, table]);

  return (
    <div
      className={cn(
        'grid overflow-x-auto',
        isFetchingNextPage &&
          'opacity-60 pointer-events-none transition-opacity'
      )}
    >
      <table
        className={cn('w-full text-slate-900 dark:text-slate-100', className)}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-3 first:pl-6 last:pr-6 font-semibold text-left first:rounded-s-2xl last:rounded-e-2xl bg-slate-100 dark:bg-slate-900"
                  style={
                    header.getSize() !== 150
                      ? { width: `${header.getSize()}px` }
                      : undefined
                  }
                >
                  {header.isPlaceholder ? null : (
                    <div
                      className={cn(
                        'flex gap-3',
                        header.column.getCanSort() &&
                          'cursor-pointer select-none'
                      )}
                      aria-hidden
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <SortIcon
                          className={cn(
                            '[&>path]:fill-slate-400 dark:[&>path]:fill-slate-500 [&>path]:transition-colors',
                            header.column.getIsSorted() === 'asc' &&
                              '[&>#asc]:fill-slate-900 dark:[&>#asc]:fill-slate-50',
                            header.column.getIsSorted() === 'desc' &&
                              '[&>#desc]:fill-slate-900 dark:[&>#desc]:fill-slate-50'
                          )}
                        />
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="[&:not(:last-child)]:border-b-2 border-slate-100 dark:border-slate-800"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-3 first:pl-6 last:pr-6">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>

      {dataFlow === 'pagination' && (
        <Pagination<T>
          table={table}
          {...(rest.state?.globalFilter
            ? {}
            : { totalRecords, hasNextPage, fetchNextPage })}
        />
      )}
    </div>
  );
}
