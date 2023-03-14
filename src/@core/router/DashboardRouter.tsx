import { Suspense } from 'react';
import DashboardLayout from '../../layouts/Dashboard';
import DashboardPage from '../../pages/DashboardPage';
import ErrorPage from '../../pages/ErrorPage';
import AuthProtected from '../../components/AuthProtected';
const dashboardRouter = [
  {
    path: '/dashboard',
    element: (
      <Suspense>
        <AuthProtected children={<DashboardLayout />} redirect="/auth" adminOnly />
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
