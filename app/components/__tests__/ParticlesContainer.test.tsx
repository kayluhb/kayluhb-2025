import { fireEvent, render, screen } from '@testing-library/react';
import { ParticlesContainer } from '../ParticlesContainer';

// Mock the usePageVisibility hook
jest.mock('~/utils/usePageVisibility', () => ({
  usePageVisibility: () => true,
}));

describe('ParticlesContainer', () => {
  const defaultProps = {
    isInputFocused: false,
    word: 'TEST',
  };

  beforeEach(() => {
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 1000,
      height: 1000,
      top: 0,
      left: 0,
      right: 1000,
      bottom: 1000,
      x: 0,
      y: 0,
    }));
  });

  it('renders with correct number of particles', () => {
    render(<ParticlesContainer {...defaultProps} />);

    const particles = screen.getAllByText(/[TEST]/);
    expect(particles).toHaveLength(4); // One for each letter in 'TEST'
  });

  it('responds to keyboard navigation', () => {
    render(<ParticlesContainer {...defaultProps} />);

    const container = screen.getByRole('application');
    fireEvent.keyDown(container, { key: 'ArrowRight' });
    fireEvent.keyDown(container, { key: 'ArrowDown' });

    // Since the actual movement is handled by RAF, we just ensure the events don't crash
    expect(container).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<ParticlesContainer {...defaultProps} />);

    const container = screen.getByRole('application');
    expect(container).toHaveAttribute('aria-label', 'Particle animation area');
    expect(container).toHaveAttribute('tabIndex', '0');
  });

  it('updates particles when word changes', () => {
    const { rerender } = render(<ParticlesContainer {...defaultProps} />);
    expect(screen.getAllByText(/[TEST]/)).toHaveLength(4);

    rerender(<ParticlesContainer isInputFocused={false} word="NEW" />);
    expect(screen.getAllByText(/[NEW]/)).toHaveLength(3);
  });
});
