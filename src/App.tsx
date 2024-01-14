import { lazy, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from '@pages/HomePage/HomePage';
import Sidebar from '@components/Sidebar/Sidebar';
import Chat from '@components/Chat/Chat';
const Auth = lazy(() => import('@components/Auth/Auth'));
import RestrictedRoute from '@routes/RestrictedRoute';
import PrivateRoute from '@routes/PrivateRoute';
import { auth } from '@myfirebase/config';
import useChatStore from '@zustand/store';

function App() {
  const updateCurrentUser = useChatStore(state => state.updateCurrentUser);

  console.log('APP')

  useEffect(() => {
    if (localStorage.language) {
      return;
    }

    const userLanguage = navigator.language;

    if (userLanguage === 'en-US') {
      localStorage.setItem('language', 'en');
    } else if (userLanguage === 'uk-UA') {
      localStorage.setItem('language', 'ua');
    } else if (userLanguage === 'ru-RU') {
      localStorage.setItem('language', 'ru');
    } else {
      localStorage.setItem('language', 'en');
    }
  }, []);

  useEffect(() => {
    if (!localStorage.theme) {
      const prefersDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      localStorage.theme = prefersDarkMode ? 'dark' : 'light';
    }

    document.documentElement.classList.toggle(
      'dark',
      localStorage.theme === 'dark'
    );
  }, []);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        updateCurrentUser(authUser);
      } else {
        updateCurrentUser(null);
      }
    });

    return () => unsub();
  }, [updateCurrentUser]);

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
            element: <Sidebar />,
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
