import { Link, Navigate, RouteObject } from 'react-router-dom';
import { UserCreate, UserList, UserView } from './pages';

const userRoutes: RouteObject[] = [
  {
    path: 'users',
    handle: {
      crumb: () => (
        <Link
          to="/users"
          className="hover:text-sky-700 dark:hover:text-sky-400"
        >
          Users
        </Link>
      ),
    },
    children: [
      { index: true, element: <Navigate to="list" /> },
      {
        path: 'list',
        element: <UserList />,
        handle: {
          crumb: () => <span>List</span>,
        },
      },
      {
        path: 'create',
        element: <UserCreate />,
        handle: {
          crumb: () => <span>Create</span>,
        },
      },
      {
        path: ':userId',
        element: <UserView />,
        handle: {
          crumb: () => <span>Details</span>,
        },
      },
    ],
  },
];

export default userRoutes;
