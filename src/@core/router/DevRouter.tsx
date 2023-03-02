import Dev from '../../pages/dev-page';
import ErrorPage from '../../pages/error-page';

const devRouter = [
  {
    path: '/dev',
    element: <Dev />,
    errorElement: <ErrorPage />,
  },
];

export default devRouter;
