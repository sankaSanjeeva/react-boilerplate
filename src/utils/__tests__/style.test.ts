import { expect, test } from 'vitest';
import { cn } from '../style';

test('should combine multiple class names into a single string', () => {
  expect(cn('h-1', 'w-1')).toBe('h-1 w-1');
});

test('should handle null or undefined inputs gracefully', () => {
  expect(cn('h-1', null, undefined)).toBe('h-1');
});

test('should combine class names provided as variable', () => {
  const className = 'w-1';
  expect(cn('h-1', className)).toBe('h-1 w-1');
});

test('should combine conditionally provided class names', () => {
  const isTransparent = true;
  const isBlurry = false;
  expect(
    cn('h-1', isTransparent && 'bg-transparent', isBlurry && ' blur-sm')
  ).toBe('h-1 bg-transparent');
});
