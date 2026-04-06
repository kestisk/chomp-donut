import { Link } from 'react-router-dom';
import { buttonVariants } from '../../components/ui/Button.tsx';
import donutMainSvg from '../../assets/donut-main.svg';

export default function HomePage() {
  return (
    <main>
      <section className="bg-primary relative overflow-hidden py-16 text-on-primary transition-colors sm:py-24 lg:py-32">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 sm:flex-row sm:px-6 lg:gap-16 lg:px-8">
          <header className="flex-1 text-center sm:text-left">
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Welcome to <br /> Chomp-a-Donut
            </h1>
            <Link to="/list" className={buttonVariants({ variant: 'cta', className: 'mt-8' })}>
              View Our Donuts
            </Link>
          </header>

          <div className="shrink-0">
            <img
              src={donutMainSvg}
              alt="Delicious glazed donut"
              className="h-48 w-48 drop-shadow-2xl sm:h-64 sm:w-64 lg:h-80 lg:w-80"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold text-heading sm:text-4xl">
            How It Works
          </h2>

          <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                id: 1,
                title: 'Browse',
                desc: 'Explore our delicious range of donuts on the menu page.',
              },
              {
                id: 2,
                title: 'Choose',
                desc: 'Pick your favourite donut and check out the details.',
              },
              {
                id: 3,
                title: 'Chomp!',
                desc: 'Hit the chomp button and virtually devour your treat!',
              },
            ].map((item) => (
              <li
                key={item.id}
                className="rounded-2xl bg-surface p-6 shadow-md border border-border"
              >
                <span className="text-primary-text mb-4 block text-4xl font-bold">{item.id}</span>
                <h3 className="text-lg font-bold text-heading">{item.title}</h3>
                <p className="mt-2 text-body">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
