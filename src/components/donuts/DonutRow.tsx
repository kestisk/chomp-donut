import Button from '../ui/Button';
import type { Donut } from '../../types/donut.types';
import { getDonutImage } from '../../lib/donutImage';

interface DonutRowProps {
  donut: Donut;
  isChomped: boolean;
  onChomp: (id: number) => void;
}

export default function DonutRow({ donut, isChomped, onChomp }: DonutRowProps) {
  return (
    <tr
      className={`border-b border-gray-200 transition-opacity duration-300 ${isChomped ? 'opacity-50' : ''}`}
    >
      <td className="px-4 py-3 text-center">
        <img
          src={getDonutImage(donut.imageName)}
          alt={donut.name}
          className="mx-auto h-16 w-16 sm:h-20 sm:w-20"
        />
      </td>
      <td className="px-4 py-3 text-center font-semibold text-heading">{donut.name}</td>
      <td className="px-4 py-3 text-center font-bold text-primary-text">
        &pound;{donut.price.toFixed(2)}
      </td>
      <td className="px-4 py-3 text-center">
        <Button
          variant="primary"
          disabled={isChomped}
          onClick={() => onChomp(donut.id)}
          className="text-sm"
        >
          {isChomped ? 'Chomped! 🍩' : 'Chomp-a-Donut'}
        </Button>
      </td>
    </tr>
  );
}
