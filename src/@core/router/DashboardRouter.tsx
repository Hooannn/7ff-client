import { Suspense } from 'react';
import DashboardLayout from '../../layouts/Dashboard';
import { DashboardPage, UsersDashboardPage } from '../../pages/DashboardPage';
import ErrorPage from '../../pages/ErrorPage';
import AuthProtector from '../../components/AuthProtector';
import AdminPage from '../../pages/DashboardPage/Admin/AdminPage';
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
      {
        path: 'admin',
        element: (
          <AuthProtector redirect="/auth" adminOnly>
            <AdminPage />
          </AuthProtector>
        ),
        children: [
          {
            path: 'users',
            element: <UsersDashboardPage />,
          },
        ],
      },
    ],
  },
];

export default dashboardRouter;
