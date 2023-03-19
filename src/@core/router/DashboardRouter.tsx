import { Suspense } from 'react';
import DashboardLayout from '../../layouts/Dashboard';
import DashboardPage from '../../pages/DashboardPage';
import ErrorPage from '../../pages/ErrorPage';
import AuthProtector from '../../components/AuthProtector';
const dashboardRouter = [
  {
    path: '/dashboard',
    element: (
      <Suspense>
        {/* <AuthProtector children={<DashboardLayout />} redirect="/auth" adminOnly /> */}
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
