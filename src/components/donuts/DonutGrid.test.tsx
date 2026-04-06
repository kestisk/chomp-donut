import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DonutGrid from './DonutGrid';

const mockDonuts = [
  { id: 1, name: 'Pink heart', price: 1.99, imageName: 'donut-1' },
  { id: 2, name: 'The tiger', price: 1.79, imageName: 'donut-2' },
];

const defaultProps = {
  donuts: mockDonuts,
  chomped: {},
  totalPrice: 0,
  hasAnyChomped: false,
  allChomped: false,
  onChomp: vi.fn(),
  onReset: vi.fn(),
};

describe('DonutGrid', () => {
  it('shows empty message and £0.00 when donuts array is empty', () => {
    render(<DonutGrid {...defaultProps} donuts={[]} />);
    expect(screen.getByText('No donuts available right now.')).toBeInTheDocument();
    expect(screen.getByText(/£0\.00/)).toBeInTheDocument();
  });

  it('shows correct total price', () => {
    render(
      <DonutGrid {...defaultProps} chomped={{ 1: true }} totalPrice={1.99} hasAnyChomped={true} />,
    );
    const tfoot = document.querySelector('tfoot');
    expect(tfoot).toHaveTextContent('£1.99');
  });

  it('Reset button is disabled when no donuts chomped', () => {
    render(<DonutGrid {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Reset' })).toBeDisabled();
  });

  it('Reset button is enabled when donuts are chomped', () => {
    render(
      <DonutGrid {...defaultProps} chomped={{ 1: true }} totalPrice={1.99} hasAnyChomped={true} />,
    );
    expect(screen.getByRole('button', { name: 'Reset' })).not.toBeDisabled();
  });

  it('calls onReset when Reset button clicked', () => {
    const onReset = vi.fn();
    render(
      <DonutGrid
        {...defaultProps}
        chomped={{ 1: true }}
        totalPrice={1.99}
        hasAnyChomped={true}
        onReset={onReset}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(onReset).toHaveBeenCalledOnce();
  });
});
