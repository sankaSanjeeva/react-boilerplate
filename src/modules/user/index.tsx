import { Navigate, RouteObject } from 'react-router-dom';
import { UserCreate, UserList, UserView } from './pages';

const userRoutes: RouteObject[] = [
  {
    path: 'user',
    children: [
      { index: true, element: <Navigate to="list" /> },
      { path: 'list', element: <UserList /> },
      { path: 'create', element: <UserCreate /> },
      { path: 'view', element: <UserView /> },
    ],
  },
];

export default userRoutes;
