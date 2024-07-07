import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ErrorPage, ProtectedRoutes } from './common/components';
import { Auth, Home } from './pages';
import App from './App';

export default createBrowserRouter([
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
