import ErrorPage from '../../pages/error-page';
import RootRoute from '../../RootRoute';
const rootRouter = [
  {
    path: '/',
    element: <RootRoute />,
    errorElement: <ErrorPage />,
  },
];

export default rootRouter;
