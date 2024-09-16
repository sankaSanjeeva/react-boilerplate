import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { ErrorPage, ProtectedRoutes } from './components';
import { authRoutes, homeRoutes, userRoutes } from './modules';
import App from './App';

export const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="home" />,
      },
      {
        path: 'auth',
        element: <Outlet />,
        children: [
          { index: true, element: <Navigate to="/auth/login" replace /> },
          ...authRoutes,
        ],
      },
      {
        element: <ProtectedRoutes />,
        // add remaining protected routes here
        children: [...homeRoutes, ...userRoutes],
      },
    ],
  },
];

export default createBrowserRouter(routes);
