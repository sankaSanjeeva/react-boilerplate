import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from '.';

const routes = [
  {
    path: '/',
    element: <div data-testid="working-page" />,
    errorElement: <ErrorPage />,
  },
];

test('should render if there is no any errors', () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
  });

  render(<RouterProvider router={router} />);

  expect(screen.getByTestId('working-page')).toBeInTheDocument();
});

test('should render if there is any error', () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/invalid'],
  });

  render(<RouterProvider router={router} />);

  expect(screen.getByTestId('error-page')).toBeInTheDocument();
});
