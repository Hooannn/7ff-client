import { Suspense } from 'react';
import MainLayout from '../../layouts/Main/Main';
import ErrorPage from '../../pages/ErrorPage';
import MenuPage from '../../pages/MenuPage';
import AboutPage from '../../pages/AboutPage';
import BookingPage from '../../pages/BookingPage';
import HomePage from '../../pages/HomePage';
import CartPage from '../../pages/CartPage';
import ProductPage from '../../pages/ProductPage';
import AuthProtector from '../../components/AuthProtector';

const rootRouter = [
  {
    path: '/',
    element: (
      <Suspense>
        <MainLayout />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'menu',
        element: <MenuPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'booking',
        element: <BookingPage />,
      },
      {
        path: 'cart',
        element: <AuthProtector children={<CartPage />} redirect="/auth" />,
      },
      {
        path: 'product/:productId',
        element: <ProductPage />,
      },
    ],
  },
];

export default rootRouter;
