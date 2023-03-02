import AuthPage from '../../pages/auth-page';
import ErrorPage from '../../pages/error-page';

const authRouter = [
  {
    path: '/auth',
    element: <AuthPage />,
    errorElement: <ErrorPage />,
  },
];

export default authRouter;
