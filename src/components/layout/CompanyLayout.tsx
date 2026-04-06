import { Outlet, Link } from 'react-router-dom';
import donutMainSvg from '../../assets/donut-main.svg';

const navLinkBase = 'text-lg font-bold text-on-company transition-colors hover:underline';

export default function CompanyLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-company-light">
      <header className="bg-company sticky top-0 z-50 shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={donutMainSvg} alt="Chomp-a-Donut logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-on-company">Chomp-a-Donut</span>
          </Link>

          <nav className="flex items-center gap-4 sm:gap-6">
            <Link to="/" className={navLinkBase}>
              Home
            </Link>
            <Link
              to="/company/info"
              className={`${navLinkBase} underline decoration-2 underline-offset-4`}
            >
              Company Info
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
