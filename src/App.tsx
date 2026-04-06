import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import CompanyLayout from './components/layout/CompanyLayout';
import HomePage from './pages/home/HomePage';
import CompanyInfo from './pages/company/CompanyInfo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: '/company',
    element: <CompanyLayout />,
    children: [
      { index: true, element: <CompanyInfo /> },
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
