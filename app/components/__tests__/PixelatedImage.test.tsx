import { fireEvent, render, screen } from '@testing-library/react';
import { PixelatedImage } from '../PixelatedImage';

// Mock the usePageVisibility hook
jest.mock('~/utils/usePageVisibility', () => ({
  usePageVisibility: () => true,
}));

describe('PixelatedImage', () => {
  const defaultProps = {
    imageUrl: 'test-image.jpg',
    gridSize: 50,
  };

  beforeEach(() => {
    // Mock createImageBitmap
    global.createImageBitmap = jest.fn();

    // Mock canvas context
    const mockContext = {
      drawImage: jest.fn(),
      getImageData: jest.fn(() => ({
        data: new Uint8ClampedArray(100),
      })),
    };

    jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => mockContext as any);
  });

  it('renders with correct container attributes', () => {
    render(<PixelatedImage {...defaultProps} />);

    const container = screen.getByRole('region');
    expect(container).toHaveAttribute('aria-label', 'Interactive pixelated image');
  });

  it('handles keyboard interaction', () => {
    render(<PixelatedImage {...defaultProps} />);

    const interactiveArea = screen.getByRole('img');
    fireEvent.keyDown(interactiveArea, { key: 'Enter' });
    fireEvent.keyDown(interactiveArea, { key: ' ' });

    expect(interactiveArea).toHaveAttribute(
      'aria-label',
      'Pixelated interactive image that responds to touch and mouse movement',
    );
  });

  it('initializes with correct dimensions', () => {
    render(<PixelatedImage {...defaultProps} />);

    const container = screen.getByRole('img');
    expect(container).toHaveClass(
      'relative h-full max-h-[300px] w-full max-w-[300px] md:max-h-[600px] md:max-w-[600px]',
    );
  });

  it('handles pointer events', () => {
    render(<PixelatedImage {...defaultProps} />);

    const container = screen.getByRole('img');
    fireEvent.pointerDown(container);
    fireEvent.pointerMove(container, { clientX: 100, clientY: 100 });
    fireEvent.pointerUp(container);

    // Since the actual movement is handled by RAF, we just ensure the events don't crash
    expect(container).toBeInTheDocument();
  });
});
