import { RouteObject } from 'react-router-dom';
import { Login } from './pages';

const authRoutes: RouteObject[] = [
  { path: 'login', element: <Login /> },
  /**
   * Add remaining auth related components
   */
  // { path: 'signUp', element: <SignUp /> },
];

export default authRoutes;
