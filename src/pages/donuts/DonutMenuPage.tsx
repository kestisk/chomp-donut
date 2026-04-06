import { useState, useEffect, useCallback } from 'react';
import DonutGrid from '../../components/donuts/DonutGrid';
import Button from '../../components/ui/Button';
import type { Donut } from './../../types/donut.types';

type ChompedState = Record<number, boolean>;

const SESSION_KEY = 'chomped-donuts';

function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function loadChompedFromSession(): ChompedState {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as ChompedState) : {};
  } catch {
    return {};
  }
}

export default function MenuPage() {
  const [donuts, setDonuts] = useState<Donut[]>([]);
  const [chomped, setChomped] = useState<ChompedState>(loadChompedFromSession);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDonuts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/data/donuts.json');
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = (await res.json()) as Donut[];
      setDonuts(shuffleArray(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load donuts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchDonuts();
  }, [fetchDonuts]);

  const handleChomp = (id: number) => {
    setChomped((prev) => {
      const next = { ...prev, [id]: true };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(next));
      return next;
    });
  };

  const handleReset = () => {
    setChomped({});
    sessionStorage.removeItem(SESSION_KEY);
  };

  const chompedDonuts = donuts.filter((d) => chomped[d.id]);
  const totalPrice = chompedDonuts.reduce((sum, d) => sum + d.price, 0);
  const allChomped = donuts.length > 0 && donuts.every((d) => chomped[d.id]);
  const hasAnyChomped = Object.keys(chomped).length > 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <h1 className="text-center text-3xl font-extrabold text-heading sm:text-4xl">Our Donuts</h1>
      <p className="mt-2 text-center text-muted">Pick a donut and give it a chomp!</p>

      {loading && (
        <div className="mt-16 text-center">
          <p className="animate-pulse text-lg font-semibold text-muted">Loading donuts...</p>
        </div>
      )}

      {error && !loading && (
        <div className="mt-10 rounded-xl bg-surface p-6 text-center shadow-md">
          <p className="font-semibold text-red-600">Oops! Failed to load donuts.</p>
          <p className="mt-1 text-sm text-muted">{error}</p>
          <Button variant="primary" className="mt-4" onClick={fetchDonuts}>
            Try Again
          </Button>
        </div>
      )}

      {!loading && !error && (
        <DonutGrid
          donuts={donuts}
          chomped={chomped}
          totalPrice={totalPrice}
          hasAnyChomped={hasAnyChomped}
          allChomped={allChomped}
          onChomp={handleChomp}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
