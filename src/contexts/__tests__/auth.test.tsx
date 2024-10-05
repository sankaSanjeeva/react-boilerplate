import { PropsWithChildren } from 'react';
import { render, renderHook, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { TOKEN_STORAGE_KEY } from '@/constants';
import { AuthProvider, useAuth } from '../auth';

const mockNavigate = vi.fn();

vi.mock(import('react-router-dom'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const queryClient = new QueryClient();
const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>{children}</AuthProvider>
  </QueryClientProvider>
);

function TestComponent() {
  const { token } = useAuth();
  return <div>{token ? 'Authenticated' : 'Not Authenticated'}</div>;
}

afterEach(() => {
  localStorage.clear();
});

describe('useAuth', () => {
  test('should return the context when used within AuthProvider', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
      { wrapper }
    );

    expect(screen.getByText('Not Authenticated')).toBeInTheDocument();
  });

  test('should throw an error when used outside of AuthProvider', () => {
    expect(() => render(<TestComponent />)).toThrow(
      'useAuth must be used within a AuthProvider'
    );
  });
});

describe('AuthProvider', () => {
  test('should initialize token from localStorage when component mounts', () => {
    localStorage.setItem(TOKEN_STORAGE_KEY, 'test-token');

    const { result } = renderHook(useAuth, { wrapper });

    expect(result.current.token).toBe('test-token');
  });

  test('should throw error when token is not provided in manageLogin', () => {
    const { result } = renderHook(useAuth, { wrapper });

    expect(() => result.current.manageLogin('')).toThrow('A token is required');
  });

  test('should navigate to home when token is provided in manageLogin', () => {
    const { result } = renderHook(useAuth, { wrapper });

    result.current.manageLogin('sample-token');

    expect(localStorage.getItem(TOKEN_STORAGE_KEY)).toBe('sample-token');
    expect(mockNavigate).toBeCalledWith('/home');

    mockNavigate.mockClear();
  });

  test('should navigate to auth when call manageLogout', () => {
    const { result } = renderHook(useAuth, { wrapper });

    result.current.manageLogout();

    expect(localStorage.getItem(TOKEN_STORAGE_KEY)).toBeNull();
    expect(mockNavigate).toBeCalledWith('/auth');

    mockNavigate.mockClear();
  });
});
