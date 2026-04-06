import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DonutRow from './DonutRow';

const mockDonut = { id: 1, name: 'Pink heart', price: 1.99, imageName: 'donut-1' };

describe('DonutRow', () => {
  it('renders active Chomp button when not chomped', () => {
    render(<DonutRow donut={mockDonut} isChomped={false} onChomp={vi.fn()} />);
    const button = screen.getByRole('button', { name: 'Chomp-a-Donut' });
    expect(button).not.toBeDisabled();
  });

  it('disables button and shows Chomped text when chomped', () => {
    render(<DonutRow donut={mockDonut} isChomped={true} onChomp={vi.fn()} />);
    const button = screen.getByRole('button', { name: /chomped/i });
    expect(button).toBeDisabled();
  });

  it('applies opacity-50 class to row when chomped', () => {
    const { container } = render(<DonutRow donut={mockDonut} isChomped={true} onChomp={vi.fn()} />);
    expect(container.querySelector('tr')).toHaveClass('opacity-50');
  });

  it('calls onChomp with correct id when button clicked', () => {
    const onChomp = vi.fn();
    render(<DonutRow donut={mockDonut} isChomped={false} onChomp={onChomp} />);
    fireEvent.click(screen.getByRole('button', { name: 'Chomp-a-Donut' }));
    expect(onChomp).toHaveBeenCalledWith(1);
  });
});
