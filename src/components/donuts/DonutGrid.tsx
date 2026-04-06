import Button from '../ui/Button';
import DonutRow from './DonutRow';
import type { Donut } from '../../types/donut.types';

type DonutGridProps = {
  donuts: Donut[];
  chomped: Record<number, boolean>;
  totalPrice: number;
  hasAnyChomped: boolean;
  allChomped: boolean;
  onChomp: (id: number) => void;
  onReset: () => void;
};

export default function DonutGrid({
  donuts,
  chomped,
  totalPrice,
  hasAnyChomped,
  allChomped,
  onChomp,
  onReset,
}: DonutGridProps) {
  if (donuts.length === 0) {
    return (
      <div className="mt-10 text-center text-muted">
        <p className="text-lg font-semibold">No donuts available right now.</p>
        <p className="mt-1 text-sm">Check back soon!</p>
        <p className="mt-4 font-bold text-primary-text">Total: &pound;0.00</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {allChomped && (
        <div className="mb-6 rounded-xl bg-surface p-4 text-center shadow-md">
          <p className="text-lg font-extrabold text-heading">🎉 You chomped them all! Legend.</p>
          <p className="mt-1 text-sm text-muted">Hit reset to start the madness again.</p>
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl shadow-md">
        <table className="w-full bg-surface text-sm sm:text-base">
          <thead>
            <tr className="bg-primary text-white">
              <th className="px-4 py-3 text-center text-on-primary">Image</th>
              <th className="px-4 py-3 text-center text-on-primary">Name</th>
              <th className="px-4 py-3 text-center text-on-primary ">Price</th>
              <th className="px-4 py-3 text-center text-on-primary">Action</th>
            </tr>
          </thead>
          <tbody>
            {donuts.map((donut) => (
              <DonutRow
                key={donut.id}
                donut={donut}
                isChomped={!!chomped[donut.id]}
                onChomp={onChomp}
              />
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-primary bg-surface">
              <td colSpan={2} className="px-4 py-3 text-right font-bold text-heading">
                Total Chomped:
              </td>
              <td className="px-4 py-3 text-center font-extrabold text-primary-text">
                &pound;{totalPrice.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-center">
                <Button
                  variant="secondary"
                  disabled={!hasAnyChomped}
                  onClick={onReset}
                  className="text-sm"
                >
                  Reset
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
