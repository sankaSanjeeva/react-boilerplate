import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { user } from '@/test-utils';
import FileInput from '.';

const mockedOnChange = vi.fn();

test('should render file input with default placeholder', () => {
  render(<FileInput />);

  expect(
    screen.getByText("Drag 'n' drop some files here, or click to select files")
  ).toBeInTheDocument();
});

test('should render file input with custom placeholder', () => {
  render(<FileInput placeholder="Drag & images here" />);

  expect(screen.getByText('Drag & images here')).toBeInTheDocument();
});

test('should call onChange callback with selected file', async () => {
  render(<FileInput onChange={mockedOnChange} />);

  const file = new File(['hello'], 'hello.png', { type: 'image/png' });
  const input = screen.getByTestId('file-input') as HTMLInputElement;

  await user.upload(input, file);

  expect(input.files?.[0]).toBe(file);
  expect(mockedOnChange).toBeCalledWith([file]);
});
