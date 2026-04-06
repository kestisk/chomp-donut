import donut1 from '../assets/donut-1.svg';
import donut2 from '../assets/donut-2.svg';
import donut3 from '../assets/donut-3.svg';

const imageMap: Record<string, string> = {
  'donut-1': donut1,
  'donut-2': donut2,
  'donut-3': donut3,
};

export function getDonutImage(imageName: string): string {
  return imageMap[imageName] ?? donut1;
}
