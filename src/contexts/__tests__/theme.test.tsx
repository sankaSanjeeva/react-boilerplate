import { afterEach, describe, expect, test } from 'vitest';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../theme';
import { THEME_STORAGE_KEY } from '@/constants';

function TestComponent() {
  const { theme } = useTheme();
  return <div>{theme}</div>;
}

afterEach(() => {
  localStorage.clear();
});

describe('useTheme', () => {
  test('should return the context when used within ThemeProvider', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('system')).toBeInTheDocument();
  });

  test('should throw an error when used outside of ThemeProvider', () => {
    expect(() => render(<TestComponent />)).toThrow(
      'useTheme must be used within a ThemeProvider'
    );
  });
});

describe('AuthProvider', () => {
  test('should pick system as the theme if theme not found in localStorage', () => {
    const { result } = renderHook(useTheme, {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    });

    expect(result.current.theme).toBe('system');
  });

  test('should pick custom as the theme if theme found in localStorage', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');

    const { result } = renderHook(useTheme, {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    });

    expect(result.current.theme).toBe('dark');
  });

  test('should change theme to new theme when change theme', async () => {
    const { result } = renderHook(useTheme, {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    });

    result.current.setTheme('light');

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
    await waitFor(() => {
      expect(result.current.theme).toBe('light');
    });
  });
});
