import { useEffect, useState } from 'react';
import axios from 'axios';
import { createColumnHelper } from '@tanstack/react-table';
import { Table } from '@/components';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PencilIcon, TrashIcon } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

type Response<T> = {
  data: T[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

type User = {
  id: number;
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
};

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
    size: 52,
  }),
  columnHelper.display({
    id: 'avatar',
    cell: (props) => (
      <Avatar className="w-14 h-14">
        <AvatarImage src={props.row.original.avatar} />
        <AvatarFallback>
          {`${props.row.original.first_name.at(0)}${props.row.original.last_name.at(0)}`.toUpperCase()}
        </AvatarFallback>
      </Avatar>
    ),
    size: 92,
  }),
  columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
    header: 'Name',
  }),
  columnHelper.accessor('email', {
    header: 'Email',
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <div className="w-full text-center">Actions</div>,
    cell: () => (
      <div className="flex">
        <Button size="icon" variant="ghost">
          <PencilIcon />
        </Button>
        <Button size="icon" variant="ghost">
          <TrashIcon />
        </Button>
      </div>
    ),
    size: 124,
  }),
];

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    axios
      .get<Response<User>>('https://reqres.in/api/users?page=2')
      .then((res) => {
        setUsers(res.data.data);
      });
  }, []);
  return (
    <div className="w-full py-10">
      <Table<User>
        data={users}
        columns={columns}
        onRowSelectionChange={setRowSelection}
        state={{ rowSelection }}
      />
    </div>
  );
}
