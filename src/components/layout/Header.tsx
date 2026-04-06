import { NavLink, Link } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';
import donutMainSvg from '../../assets/donut-main.svg';

export default function Header() {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `text-lg font-bold text-on-primary transition-colors hover:underline ${
      isActive ? 'underline decoration-2 underline-offset-4' : ''
    }`;

  return (
    <header className="bg-primary sticky top-0 z-50 shadow-lg transition-colors">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={donutMainSvg} alt="Logo" className="h-10 w-10" />
          <span className="hidden text-lg font-bold text-on-primary sm:block sm:text-xl">
            Chomp-a-Donut
          </span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/list" className={navClass}>
            Donuts
          </NavLink>
          <NavLink to="/company/info" className={navClass}>
            Company
          </NavLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
