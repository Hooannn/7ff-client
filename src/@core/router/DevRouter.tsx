import Dev from "../../dev-page";
import ErrorPage from "../../error-page";
const devRouter = [
  {
    path: "/dev",
    element: <Dev />,
    errorElement: <ErrorPage />,
  },
];

export default devRouter;
