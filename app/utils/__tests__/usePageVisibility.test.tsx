import { renderHook } from '@testing-library/react';
import { usePageVisibility } from '../usePageVisibility';

describe('usePageVisibility', () => {
  const originalDocument = global.document;

  beforeEach(() => {
    // Reset document.hidden before each test
    Object.defineProperty(document, 'hidden', {
      configurable: true,
      get: () => false,
    });
  });

  afterAll(() => {
    global.document = originalDocument;
  });

  it('should return true when page is visible', () => {
    Object.defineProperty(document, 'hidden', {
      configurable: true,
      get: () => false,
    });

    const { result } = renderHook(() => usePageVisibility());
    expect(result.current).toBe(true);
  });

  it('should return false when page is hidden', () => {
    Object.defineProperty(document, 'hidden', {
      configurable: true,
      get: () => true,
    });

    const { result } = renderHook(() => usePageVisibility());
    expect(result.current).toBe(false);
  });

  it('should update when visibility changes', () => {
    let hidden = false;
    Object.defineProperty(document, 'hidden', {
      configurable: true,
      get: () => hidden,
    });

    const { result } = renderHook(() => usePageVisibility());
    expect(result.current).toBe(true);

    // Simulate visibility change
    hidden = true;
    document.dispatchEvent(new Event('visibilitychange'));

    expect(result.current).toBe(false);
  });
});
