import { createBrowserRouter, Outlet } from 'react-router-dom';
import { ErrorPage, ProtectedRoutes } from './common/components';
import { Auth, Home } from './pages';

export default createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <Auth />,
      },
      {
        element: <ProtectedRoutes />,
        // add remaining protected routes here
        children: [{ path: 'home', element: <Home /> }],
      },
    ],
  },
]);
