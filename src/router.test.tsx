import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { TOKEN_STORAGE_KEY } from './constants';
import { routes } from './router';

const appTitle = import.meta.env.VITE_APP_TITLE;
const fakeToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

test('should render the error page for invalid routes', () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/invalid'],
  });

  render(<RouterProvider router={router} />);

  expect(
    screen.getByText('Sorry, an unexpected error has occurred.')
  ).toBeInTheDocument();
  expect(screen.getByText('Not Found')).toBeInTheDocument();
});

test('should render login screen correctly when there is no active login session', () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
  });

  render(<RouterProvider router={router} />);

  expect(screen.getByText(appTitle)).toBeInTheDocument();
  expect(
    screen.getByRole('button', {
      name: /login/i,
    })
  ).toBeInTheDocument();
});

test('should render home screen correctly when there is an active login session', () => {
  localStorage.setItem(TOKEN_STORAGE_KEY, fakeToken);

  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
  });

  render(<RouterProvider router={router} />);

  expect(screen.getByText(appTitle)).toBeInTheDocument();
  expect(
    screen.getByRole('link', {
      name: 'Docs',
    })
  ).toBeInTheDocument();

  localStorage.removeItem(TOKEN_STORAGE_KEY);
});
