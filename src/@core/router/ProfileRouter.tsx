import { Suspense } from 'react';
import MainLayout from '../../layouts/Main/Main';
import ErrorPage from '../../pages/ErrorPage';
import AuthProtector from '../../components/AuthProtector';
import { Navigate } from 'react-router-dom';
import { AccountEditPage, ChangeAvatarPage, ChangePasswordPage, MyOrdersPage, MyReservationsPage } from '../../pages/ProfilePage';

const profileRouter = [
  {
    path: '/profile',
    element: (
      <Suspense>
        <AuthProtector children={<MainLayout />} redirect="/auth" />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Navigate to="/profile/edit" replace />,
      },
      {
        path: 'edit',
        element: <AccountEditPage />,
      },
      {
        path: 'change-avatar',
        element: <ChangeAvatarPage />,
      },
      {
        path: 'change-password',
        element: <ChangePasswordPage />,
      },
      {
        path: 'orders',
        element: <MyOrdersPage />,
      },
      {
        path: 'reservations',
        element: <MyReservationsPage />,
      },
    ],
  },
];

export default profileRouter;
