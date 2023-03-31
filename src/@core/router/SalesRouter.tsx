import { Suspense } from 'react';
import FragmentLayout from '../../layouts/Fragment';
import CheckoutPage from '../../pages/CheckoutPage';
import ErrorPage from '../../pages/ErrorPage';

const salesRouter = [
  {
    path: '/sales',
    element: (
      <Suspense>
        <FragmentLayout />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
    ],
  },
];

export default salesRouter;
