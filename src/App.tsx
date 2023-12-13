import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// import HomePage from '@pages/HomePage/HomePage';
// import Auth from '@components/Auth/Auth';
// import Chat from '@components/Chat/Chat';
// import Sidebar from '@components/Sidebar/Sidebar';
import AuthPage from '@pages/Auth/Auth';
import SidebarPage from '@pages/SidebarPage/SidebarPage';
import ChatPage from '@pages/ChatPage/ChatPage';
import RestrictedRoute from '@routes/RestrictedRoute';
import PrivateRoute from '@routes/PrivateRoute';
import { auth } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import Layout from '@pages/Layout/Layout';

const App = () => {
  const updateCurrentUser = useChatStore(state => state.updateCurrentUser);

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
        element: <Layout />,
        children: [
          {
            path: '/authentication',
            element: <RestrictedRoute component={AuthPage} redirectTo="/" />,
          },
          {
            path: '/',
            element: (
              <PrivateRoute
                component={SidebarPage}
                redirectTo="/authentication"
              />
            ),
          },
          {
            path: '/:dynamicParam',
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

  return (
    // <Layout>
    <RouterProvider router={router} />
    // </Layout>
  );
};

// const routeElement = useRoutes(router);

// return <Layout>{routeElement}</Layout>;

// return <RouterProvider router={router} />;

export default App;

// const router = createBrowserRouter(
//   [
//     {
//       path: '/authentication',
//       element: <RestrictedRoute component={AuthPage} redirectTo="/" />,
//     },
//     {
//       path: '/',
//       element: (
//         <PrivateRoute component={SidebarPage} redirectTo="/authentication" />
//       ),
//       children: [
//         {
//           path: '/:id',
//           element: (
//             <PrivateRoute component={ChatPage} redirectTo="/authentication" />
//           ),
//         },
//       ],
//     },
//   ],
//   {
//     basename: '/react-web-messenger',
//   }
// );
