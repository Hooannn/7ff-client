import { Suspense } from 'react';
import MainLayout from '../../layouts/Main/Main';
import ErrorPage from '../../pages/ErrorPage';
import AuthProtector from '../../components/AuthProtector';
import { Navigate } from 'react-router-dom';
import { AccountEditPage, ChangeAvatarPage } from '../../pages/ProfilePage';
import ChangePasswordPage from '../../pages/ProfilePage/ChangePasswordPage';

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
    ],
  },
];

export default profileRouter;
