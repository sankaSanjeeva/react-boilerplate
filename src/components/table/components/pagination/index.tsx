import { Table } from '@tanstack/react-table';
import { ChevronIcon, ChevronsIcon } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props<T> {
  table: Table<T>;
  totalPages?: number;
  hasNextPage?: boolean;
  fetchNextPage?: () => Promise<unknown>;
}

export default function Pagination<T>({
  table,
  totalPages,
  hasNextPage,
  fetchNextPage,
}: Props<T>) {
  const handleNextClick = () => {
    if (
      table.getPageCount() === table.getState().pagination.pageIndex + 1 &&
      hasNextPage
    ) {
      fetchNextPage?.().then(() => {
        setTimeout(() => {
          table.lastPage();
        }, 0);
      });
    } else {
      table.nextPage();
    }
  };

  return (
    <div className="flex justify-between flex-wrap w-full px-6 pb-1 text-sm text-slate-600 dark:text-slate-400">
      <div className="flex items-center gap-2">
        <span>Show rows per page</span>
        <Select
          value={table.getState().pagination.pageSize.toString()}
          onValueChange={(e) => {
            table.setPageSize(Number(e));
          }}
        >
          <SelectTrigger className="w-16">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center">
        <div className="mr-5">
          <span className="mr-2">Page</span>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {totalPages ?? table.getPageCount().toLocaleString()}
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
