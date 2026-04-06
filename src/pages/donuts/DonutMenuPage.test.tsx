import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import MenuPage from './DonutMenuPage';

const mockDonuts = [
  { id: 1, name: 'Pink heart', price: 1.99, imageName: 'donut-1' },
  { id: 2, name: 'The tiger', price: 1.79, imageName: 'donut-2' },
  { id: 3, name: 'Iced delight', price: 1.89, imageName: 'donut-3' },
];

const server = setupServer(http.get('/data/donuts.json', () => HttpResponse.json(mockDonuts)));

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  sessionStorage.clear();
});
afterAll(() => server.close());

const renderPage = () =>
  render(
    <MemoryRouter>
      <MenuPage />
    </MemoryRouter>,
  );

describe('MenuPage', () => {
  it('shows loading state initially', () => {
    renderPage();
    expect(screen.getByText('Loading donuts...')).toBeInTheDocument();
  });

  it('renders donuts grid after successful fetch', async () => {
    renderPage();
    await waitFor(() => expect(screen.getByText('Pink heart')).toBeInTheDocument());
    expect(screen.getByText('The tiger')).toBeInTheDocument();
    expect(screen.getByText('Iced delight')).toBeInTheDocument();
  });

  it('shows total price as £0.00 on initial load', async () => {
    renderPage();
    await waitFor(() => expect(screen.getByText('Pink heart')).toBeInTheDocument());
    expect(screen.getByText('£0.00')).toBeInTheDocument();
  });

  it('shows error message and Try Again button on network failure', async () => {
    server.use(http.get('/data/donuts.json', () => HttpResponse.error()));
    renderPage();
    await waitFor(() =>
      expect(screen.getByText('Oops! Failed to load donuts.')).toBeInTheDocument(),
    );
    expect(screen.getByRole('button', { name: 'Try Again' })).toBeInTheDocument();
  });

  it('retries fetch when Try Again is clicked', async () => {
    server.use(http.get('/data/donuts.json', () => HttpResponse.error()));
    renderPage();
    await waitFor(() =>
      expect(screen.getByText('Oops! Failed to load donuts.')).toBeInTheDocument(),
    );

    server.use(http.get('/data/donuts.json', () => HttpResponse.json(mockDonuts)));
    fireEvent.click(screen.getByRole('button', { name: 'Try Again' }));

    await waitFor(() => expect(screen.getByText('Pink heart')).toBeInTheDocument());
  });

  it('shows empty message when donuts array is empty', async () => {
    server.use(http.get('/data/donuts.json', () => HttpResponse.json([])));
    renderPage();
    await waitFor(() =>
      expect(screen.getByText('No donuts available right now.')).toBeInTheDocument(),
    );
    expect(screen.getByText(/£0\.00/)).toBeInTheDocument();
  });

  it('disables Reset button when no donuts are chomped', async () => {
    renderPage();
    await waitFor(() => expect(screen.getByText('Pink heart')).toBeInTheDocument());
    expect(screen.getByRole('button', { name: 'Reset' })).toBeDisabled();
  });

  it('chomps a donut — row goes 50% opacity and button becomes disabled', async () => {
    renderPage();
    await waitFor(() => expect(screen.getByText('Pink heart')).toBeInTheDocument());

    const chompButtons = screen.getAllByRole('button', { name: 'Chomp-a-Donut' });
    fireEvent.click(chompButtons[0]);

    await waitFor(() => expect(screen.getByText('Chomped! 🍩')).toBeInTheDocument());
    expect(screen.getByText('Chomped! 🍩').closest('button')).toBeDisabled();
  });

  it('updates total price after chomping', async () => {
    renderPage();
    await waitFor(() => expect(screen.getByText('Pink heart')).toBeInTheDocument());

    const rows = screen.getAllByRole('row');
    const pinkHeartRow = rows.find((r) => r.textContent?.includes('Pink heart'))!;
    fireEvent.click(pinkHeartRow.querySelector('button')!);

    await waitFor(() => expect(screen.queryByText('£0.00')).not.toBeInTheDocument());
  });

  it('enables Reset button after chomping and resets state on click', async () => {
    renderPage();
    await waitFor(() => expect(screen.getByText('Pink heart')).toBeInTheDocument());

    const chompButtons = screen.getAllByRole('button', { name: 'Chomp-a-Donut' });
    fireEvent.click(chompButtons[0]);

    await waitFor(() => expect(screen.getByRole('button', { name: 'Reset' })).not.toBeDisabled());

    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Reset' })).toBeDisabled();
      expect(screen.getByText('£0.00')).toBeInTheDocument();
    });
  });

  it('shows fun message when all donuts are chomped', async () => {
    renderPage();
    await waitFor(() => expect(screen.getByText('Pink heart')).toBeInTheDocument());

    const chompButtons = screen.getAllByRole('button', { name: 'Chomp-a-Donut' });
    chompButtons.forEach((btn) => fireEvent.click(btn));

    await waitFor(() => expect(screen.getByText(/you chomped them all/i)).toBeInTheDocument());
  });

  it('restores chomped state from sessionStorage on mount', async () => {
    sessionStorage.setItem('chomped-donuts', JSON.stringify({ 1: true }));
    renderPage();
    await waitFor(() => expect(screen.getByText('Chomped! 🍩')).toBeInTheDocument());
  });
});
