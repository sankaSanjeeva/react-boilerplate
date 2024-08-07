/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { Table } from '@tanstack/react-table';
import { ChevronIcon, ChevronsIcon } from '@/assets/icons';
import { Button } from '@/components/ui/button';

interface Props<T> {
  table: Table<T>;
  totalRecords?: number;
  hasNextPage?: boolean;
  fetchNextPage?: () => Promise<unknown>;
}

export default function Pagination<T>({
  table,
  totalRecords,
  hasNextPage,
  fetchNextPage,
}: Props<T>) {
  const [totalPages, setTotalPages] = useState<number>();

  const handleNextClick = () => {
    if (
      table.getPageCount() === table.getState().pagination.pageIndex + 1 &&
      hasNextPage
    ) {
      fetchNextPage?.().then(() => {
        setTimeout(() => {
          table.nextPage();
        }, 0);
      });
    } else {
      table.nextPage();
    }
  };

  const getTotalPages = useCallback(() => {
    if (totalRecords) {
      return Math.ceil(totalRecords / table.getState().pagination.pageSize);
    }
    return table.getPageCount();
  }, []);

  /**
   * changing 'show row per page' has been removed temporally since it make a few bugs with server side pagination
   */
  // const pageCount = table.getState().pagination.pageSize;

  useEffect(
    () => {
      setTotalPages(getTotalPages());
    },
    [
      /** pageCount */
    ]
  );

  return (
    <div className="flex justify-between flex-wrap w-full px-6 pb-1 text-sm text-slate-600 dark:text-slate-400">
      <div className="flex items-center gap-2">
        {/* changing 'show row per page' has been removed temporally since it make a few bugs with server side pagination */}
        {/* <span>Show rows per page</span>
        <Select
          value={pageCount.toString()}
          onValueChange={(e) => {
            table.setPageSize(Number(e));
          }}
        >
          <SelectTrigger className="w-16">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {PAGE_SIZES.map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
      </div>

      <div className="flex items-center">
        <div className="mr-5">
          <span className="mr-2">Page</span>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {totalPages}
          </strong>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsIcon className="rotate-180" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronIcon className="rotate-180" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNextClick}
          disabled={!(table.getCanNextPage() || hasNextPage)}
        >
          <ChevronIcon />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsIcon />
        </Button>
      </div>
    </div>
  );
}
