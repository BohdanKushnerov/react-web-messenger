import { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';
const Auth = lazy(() => import('@pages/AuthPage/AuthPage'));
const HomePage = lazy(() => import('@pages/HomePage/HomePage'));
const ChatPage = lazy(() => import('@pages/ChatPage/ChatPage'));

const router = createBrowserRouter(
  [
    {
      path: '/authentication',
      element: <RestrictedRoute component={Auth} redirectTo="/" />,
    },
    {
      path: '/',
      element: (
        <PrivateRoute component={HomePage} redirectTo="/authentication" />
      ),
      children: [
        {
          path: '/:id',
          element: (
            <PrivateRoute component={ChatPage} redirectTo="/authentication" />
          ),
        },
      ],
    },
  ],
  {
    basename: '/react-web-messenger',
  }
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
