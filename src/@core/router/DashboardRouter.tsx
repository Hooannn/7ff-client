import { Suspense } from 'react';
import DashboardLayout from '../../layouts/Dashboard';
import { DashboardPage, UsersDashboardPage, AdminPage } from '../../pages/DashboardPage';
import ErrorPage from '../../pages/ErrorPage';
import AuthProtector from '../../components/AuthProtector';
const dashboardRouter = [
  {
    path: '/dashboard',
    element: (
      <Suspense>
        <AuthProtector children={<DashboardLayout />} redirect="/auth" adminOnly />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <DashboardPage />,
      },
      {
        path: 'users',
        element: <UsersDashboardPage />,
      },
      {
        path: 'admin',
        element: <AdminPage />,
      },
    ],
  },
];

export default dashboardRouter;
