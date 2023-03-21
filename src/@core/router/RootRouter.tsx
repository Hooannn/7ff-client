import { Suspense } from 'react';
import MainLayout from '../../layouts/Main/Main';
import ErrorPage from '../../pages/ErrorPage';
import RootRoute from '../../pages/HomePage';
const rootRouter = [
  {
    path: '/',
    element: (
      <Suspense>
        <MainLayout />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <RootRoute />,
      },
    ],
  },
];

export default rootRouter;
