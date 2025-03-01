import { render, screen } from '@testing-library/react';
import { Particle } from '../Particle';

describe('Particle', () => {
  const defaultProps = {
    x: 100,
    y: 200,
    letter: 'A',
  };

  it('renders with correct position and letter', () => {
    render(<Particle {...defaultProps} />);

    const particle = screen.getByText('A');
    expect(particle).toBeInTheDocument();
    expect(particle).toHaveStyle({
      transform: 'translate(100px, 200px)',
    });
  });

  it('renders with correct accessibility attributes', () => {
    render(<Particle {...defaultProps} />);

    const particle = screen.getByText('A');
    expect(particle).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies motion styles correctly', () => {
    render(<Particle {...defaultProps} />);

    const particle = screen.getByText('A');
    expect(particle).toHaveClass('absolute');
    expect(particle).toHaveStyle({
      willChange: 'transform',
    });
  });
});
