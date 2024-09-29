/* eslint-disable import/no-extraneous-dependencies */
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, ThemeProvider } from './contexts';
import { ErrorPage } from './components';

const queryClient = new QueryClient();

function AllTheProviders({
  children,
  path = '/',
}: {
  children: React.ReactNode;
  path?: string;
}) {
  const routes = [
    {
      path,
      element: (
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      ),
      errorElement: <ErrorPage />,
    },
  ];

  const router = createMemoryRouter(routes, { initialEntries: ['/'] });

  return <RouterProvider router={router} />;
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
  path?: string
) =>
  render(ui, {
    wrapper: ({ children }) => <AllTheProviders {...{ children, path }} />,
    ...options,
  });

export const user = userEvent.setup();
export * from '@testing-library/react';
export { customRender as render };
