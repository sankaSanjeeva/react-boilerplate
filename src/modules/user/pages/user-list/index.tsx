import { useMemo, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PencilIcon, TrashIcon } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Table } from '@/components';
import { User } from '@/types';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TableHeader, TableSkeleton } from '../../components';
import { useGetUsers } from '../../hooks';

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsSomeRowsSelected()
            ? 'indeterminate'
            : table.getIsAllRowsSelected()
        }
        onCheckedChange={(e) =>
          e !== 'indeterminate' && table.toggleAllRowsSelected()
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        disabled={!row.getCanSelect()}
        checked={row.getIsSelected()}
        onCheckedChange={row.getToggleSelectedHandler()}
      />
    ),
    size: 56,
  }),
  columnHelper.display({
    id: 'avatar',
    cell: (props) => (
      <Avatar className="w-14 h-14">
        <AvatarImage src={props.row.original.picture.thumbnail} />
        <AvatarFallback>
          {`${props.row.original.name.first.at(0)}${props.row.original.name.last.at(0)}`.toUpperCase()}
        </AvatarFallback>
      </Avatar>
    ),
    size: 80,
  }),
  columnHelper.accessor((row) => `${row.name.first} ${row.name.last}`, {
    header: 'Name',
    cell: (props) => (
      <div className="flex flex-col gap-1">
        <span className="font-semibold">{props.getValue()}</span>
        <span className="text-sm text-slate-400 dark:text-slate-500">
          {props.row.original.email}
        </span>
      </div>
    ),
  }),
  columnHelper.accessor('location.country', {
    header: 'Country',
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
  }),
  columnHelper.accessor('registered.date', {
    header: 'Registered On',
    cell: (props) => new Date(props.getValue()).toDateString(),
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <div className="w-full text-center">Actions</div>,
    cell: () => (
      <div className="flex">
        <Button size="icon" variant="ghost">
          <PencilIcon />
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon" variant="ghost">
              <TrashIcon />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription className="!mt-4">
                This action cannot be undone. This will permanently delete this
                account and remove data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="destructive">Delete</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    ),
    size: 116,
  }),
];

export default function UserList() {
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({});

  const {
    data: paginatedUsers,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetUsers();

  const users = useMemo(
    () => paginatedUsers?.pages.flatMap((u) => u.results) ?? [],
    [paginatedUsers?.pages]
  );

  return (
    <div className="w-full py-10">
      <TableHeader
        searchValue={globalFilter}
        setSearchValue={setGlobalFilter}
      />
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <Table<User>
          data={users}
          columns={columns}
          onRowSelectionChange={setRowSelection}
          onGlobalFilterChange={setGlobalFilter}
          state={{ rowSelection, globalFilter }}
          dataFlow="pagination"
          totalRecords={paginatedUsers?.pages[0].info.totalRecords}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </div>
  );
}
