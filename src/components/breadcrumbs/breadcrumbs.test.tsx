import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, Link, RouterProvider } from 'react-router-dom';
import Breadcrumbs from '.';

const routes = [
  {
    path: '/users',
    handle: {
      crumb: () => (
        <Link
          to="/users"
          className="hover:text-sky-700 dark:hover:text-sky-400"
        >
          Users
        </Link>
      ),
    },
    element: <Breadcrumbs />,
    children: [
      {
        path: 'create',
        handle: {
          crumb: () => <span>Create</span>,
        },
        element: <div />,
      },
    ],
  },
];

test('should render links', () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/', '/users'],
  });

  render(<RouterProvider router={router} />);

  expect(
    screen.getByRole('link', {
      name: 'Users',
    })
  ).toBeInTheDocument();
});

test('should render nested items', () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/', '/users', '/users/create'],
  });

  render(<RouterProvider router={router} />);

  expect(screen.getByText('Create')).toBeInTheDocument();
});
