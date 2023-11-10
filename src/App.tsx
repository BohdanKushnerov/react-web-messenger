import Home from '@pages/Home/Home';
import Auth from '@components/Auth/Auth';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RestrictedRoute from '@routes/RestrictedRoute';
import PrivateRoute from '@routes/PrivateRoute';
import { useEffect } from 'react';
import useChatStore from '@zustand/store';
import { auth } from '@myfirebase/config';
import Chat from '@components/Chat/Chat';
import Sidebar from '@components/Sidebar/Sidebar';

function App() {
  const updateCurrentUser = useChatStore(state => state.updateCurrentUser);

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
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
        element: <PrivateRoute component={Home} redirectTo="/authentication" />,
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
