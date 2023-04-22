import { Suspense } from 'react';
import FragmentLayout from '../../layouts/Fragment';
import CheckoutPage from '../../pages/CheckoutPage';
import OrderConfirmationPage from '../../pages/OrderConfirmationPage/OrderConfirmationPage';
import ErrorPage from '../../pages/ErrorPage';
import AuthProtector from '../../components/AuthProtector';

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
        element: <AuthProtector children={<CheckoutPage />} redirect="/auth" />,
      },
      {
        path: 'confirmation/:orderId',
        element: <AuthProtector children={<OrderConfirmationPage />} redirect="/auth" />,
      },
    ],
  },
];

export default salesRouter;
