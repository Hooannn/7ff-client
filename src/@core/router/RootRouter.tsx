import { Suspense } from 'react';
import MainLayout from '../../layouts/Main/Main';
import ErrorPage from '../../pages/ErrorPage';
import MenuPage from '../../pages/MenuPage';
import AboutPage from '../../pages/AboutPage';
import BookingPage from '../../pages/BookingPage';
import HomePage from '../../pages/HomePage';
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
    ],
  },
];

export default rootRouter;
