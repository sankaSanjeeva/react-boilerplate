import { Navigate, RouteObject } from 'react-router-dom';
import { UserCreate, UserList, UserView } from './pages';

const userRoutes: RouteObject[] = [
  {
    path: 'users',
    children: [
      { index: true, element: <Navigate to="list" /> },
      { path: 'list', element: <UserList /> },
      { path: 'create', element: <UserCreate /> },
      { path: ':userId', element: <UserView /> },
    ],
  },
];

export default userRoutes;
