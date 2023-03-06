import ErrorPage from '../../pages/ErrorPage';
import RootRoute from '../../RootRoute';
const rootRouter = [
  {
    path: '/',
    element: <RootRoute />,
    errorElement: <ErrorPage />,
  },
];

export default rootRouter;
