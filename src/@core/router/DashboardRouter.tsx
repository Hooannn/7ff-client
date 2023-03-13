import { Suspense } from 'react';
import DashboardLayout from '../../layouts/Dashboard';
import DashboardPage from '../../pages/DashboardPage';
import ErrorPage from '../../pages/ErrorPage';

const dashboardRouter = [
  {
    path: '/dashboard',
    element: (
      <Suspense>
        <DashboardLayout />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <DashboardPage />,
      },
    ],
  },
];

export default dashboardRouter;
