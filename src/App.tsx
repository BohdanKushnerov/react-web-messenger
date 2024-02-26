import { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from '@pages/HomePage/HomePage';
const Auth = lazy(() => import('@components/Auth/Auth'));
import RestrictedRoute from '@routes/RestrictedRoute';
import PrivateRoute from '@routes/PrivateRoute';
import useOnAuthStateChanged from '@hooks/useOnAuthStateChanged';
import useDefaultLanguage from '@hooks/useDefaultLanguage';
import useDefaultTheme from '@hooks/useDefaultTheme';
import Sidebar from '@components/Sidebar/Sidebar';
import Chat from '@components/Chat/Chat';

function App() {
  useOnAuthStateChanged();
  useDefaultLanguage();
  useDefaultTheme();

  console.log('APP');

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
            path: '/',
            element: (
              <PrivateRoute component={Sidebar} redirectTo="/authentication" />
            ),
          },
          {
            path: '/:id',
            element: (
              <PrivateRoute component={Chat} redirectTo="/authentication" />
            ),
          },
        ],
      },
    ],
    {
      basename: '/react-web-messenger',
    }
  );

  return <RouterProvider router={router} />;
}

export default App;
