import { render, screen, within } from '@testing-library/react';
import { createColumnHelper } from '@tanstack/react-table';
import { expect, test } from 'vitest';
import { user } from '@/test-utils';
import Table from '.';

type Product = {
  name: string;
  price: number;
};

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
  }),
  columnHelper.accessor('price', {
    header: 'Price',
    cell: (props) => <span>$ {props.row.original.price}</span>,
  }),
];

const mockData: Product[] = [
  { name: 'Juven', price: 100 },
  { name: 'Frugo', price: 200 },
  { name: 'Nexcite', price: 150 },
];

test('should render table with correct column headers', () => {
  render(<Table columns={columns} data={mockData} />);

  const columnHeader = screen.getAllByRole('row')[0];

  expect(within(columnHeader).getByText('Name')).toBeInTheDocument();
  expect(within(columnHeader).getByText('Price')).toBeInTheDocument();
});

test('should render table with unsorted data', () => {
  render(<Table columns={columns} data={mockData} />);

  const firstRow = screen.getAllByRole('row')[1];

  expect(
    within(firstRow).getByRole('cell', {
      name: 'Juven',
    })
  ).toBeInTheDocument();
  expect(
    within(firstRow).getByRole('cell', {
      name: '$ 100',
    })
  ).toBeInTheDocument();
});

test('should sort in ascending order based on the name.', async () => {
  render(<Table columns={columns} data={mockData} />);

  const columnHeader = screen.getAllByRole('row')[0];

  await user.click(within(columnHeader).getByText('Name'));

  const firstRow = screen.getAllByRole('row')[1];

  expect(
    within(firstRow).getByRole('cell', {
      name: 'Frugo',
    })
  ).toBeInTheDocument();
  expect(
    within(firstRow).getByRole('cell', {
      name: '$ 200',
    })
  ).toBeInTheDocument();
});

test('should sort in descending order based on the name.', async () => {
  render(<Table columns={columns} data={mockData} />);

  const columnHeader = screen.getAllByRole('row')[0];

  await user.click(within(columnHeader).getByText('Name'));
  await user.click(within(columnHeader).getByText('Name'));

  const firstRow = screen.getAllByRole('row')[1];

  expect(
    within(firstRow).getByRole('cell', {
      name: 'Nexcite',
    })
  ).toBeInTheDocument();
  expect(
    within(firstRow).getByRole('cell', {
      name: '$ 150',
    })
  ).toBeInTheDocument();
});
