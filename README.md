# Chomp-a-Donut

A virtual donut shop built as a React SPA. Browse a selection of donuts and give them a virtual chomp!

## Tech Stack

- React 19 + TypeScript
- Vite (port 4000)
- React Router 7 (`createBrowserRouter`)
- Tailwind CSS v4
- Vitest + Testing Library + MSW

## Getting Started

```bash
npm install
npm run dev
```

App runs at [http://localhost:4000](http://localhost:4000)

## Scripts

| Command            | Description                         |
| ------------------ | ----------------------------------- |
| `npm run dev`      | Start dev server on port 4000       |
| `npm run build`    | TypeScript check + production build |
| `npm run test`     | Run tests in watch mode             |
| `npm run test:run` | Run tests once (CI)                 |
| `npm run lint`     | ESLint                              |

## Routes

| Path            | Description                            |
| --------------- | -------------------------------------- |
| `/`             | Home page                              |
| `/list`         | Donut listing with chomp functionality |
| `/company/info` | Company information                    |

## Features

- Blue / Pink theme toggle (WCAG AAA contrast)
- Donuts fetched over the network with error handling and retry
- Chomp state persists on refresh via `sessionStorage`, clears on browser close
- Total price of chomped donuts calculated in real time
- Responsive layout
