import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import CompanyLayout from './components/layout/CompanyLayout';
import HomePage from './pages/home/HomePage';
import MenuPage from './pages/donuts/DonutMenuPage';
import CompanyInfo from './pages/company/CompanyInfo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'list', element: <MenuPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
  {
    path: '/company',
    element: <CompanyLayout />,
    children: [
      { index: true, element: <Navigate to="/company/info" replace /> },
      { path: 'info', element: <CompanyInfo /> },
      { path: '*', element: <Navigate to="/company/info" replace /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
