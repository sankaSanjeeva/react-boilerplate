import { expect, test, vi } from 'vitest';
import { render, screen, user } from '@/test-utils';
import Header from '.';

const mockManageLogout = vi.fn();
const mockSetTheme = vi.fn();

vi.mock(import('@/contexts'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAuth: () => ({
      token: 'fake-token',
      manageLogout: mockManageLogout,
      manageLogin: vi.fn(),
    }),
    useTheme: () => ({
      theme: 'system',
      setTheme: mockSetTheme,
    }),
  };
});

test('should render header with logo and title', async () => {
  render(<Header />);

  expect(screen.getByAltText('icon')).toBeInTheDocument();
  expect(screen.getByText(import.meta.env.VITE_APP_TITLE)).toBeInTheDocument();
});

test('should render correctly when user is not authenticated', () => {
  render(<Header />);

  expect(screen.queryByText('Docs')).toBeInTheDocument();
});

test('should call manageLogout when click on login', async () => {
  render(<Header />);

  await user.click(screen.getByTestId('logout-button'));
  await user.click(
    screen.getByRole('button', {
      name: 'Logout',
    })
  );

  expect(mockManageLogout).toBeCalled();
});

test('should call setTheme when click on theme button', async () => {
  render(<Header />);

  await user.click(screen.getByTestId('theme-button'));
  await user.click(
    screen.getByRole('menuitem', {
      name: 'Dark',
    })
  );

  expect(mockSetTheme).toBeCalledWith('dark');
});
