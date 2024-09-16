import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import App from './App';

const appTitle = import.meta.env.VITE_APP_TITLE;

test('render app component', () => {
  const routes = [
    {
      path: '/home',
      element: <App />,
      children: [
        {
          index: true,
          element: <div data-testid="child-route" />,
        },
      ],
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ['/', '/home'],
  });

  render(<RouterProvider router={router} />);

  expect(screen.getByText(appTitle)).toBeInTheDocument();
  expect(screen.getByTestId('child-route')).toBeInTheDocument();
});
