import AuthPage from '../../pages/AuthPage';
import ErrorPage from '../../pages/ErrorPage';

const authRouter = [
  {
    path: '/auth',
    element: <AuthPage />,
    errorElement: <ErrorPage />,
  },
];

export default authRouter;
