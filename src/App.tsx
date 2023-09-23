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
            path: ':id',
            element: <Chat />,
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

// 1. генерация иконки по имени и фамилии
// 2. надо добавить useDefferedValue на поиск
// 3. online/offline
// 4. сделать спрайт svg
// 5. надо добавить возможность загружать фото в профиль и заменить АВАТАР ПО ИМЕНИ
// 6. сорт списка чатлистов по времени последнего сообщения


// 7. добавить чат на екран сразу после клика в поиске