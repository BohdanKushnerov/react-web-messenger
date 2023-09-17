import { useEffect } from 'react';

import Home from '@pages/Home/Home';
import Registration from '@components/Registration/Registration';
import { auth } from '@myfirebase/config';
import useChatStore from '@zustand/store';

function App() {
  const updateCurrentUser = useChatStore(state => state.updateCurrentUser);
  const { currentUser, isLoggedIn } = useChatStore(state => state);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // Пользователь авторизован
        updateCurrentUser(authUser);
      } else {
        // Пользователь не авторизован
        updateCurrentUser(null);
      }
    });

    // Отписываемся от слежения при размонтировании компонента
    return () => unsubscribe();
  }, [updateCurrentUser]);

  return (
    <div className="h-screen bg-main-bcg2 bg-no-repeat bg-cover bg-center">
      {currentUser.displayName === null && <Registration />}
      {isLoggedIn && currentUser.displayName && <Home />}
      {/* <Home /> */}
    </div>
  );
}

export default App;

// react avatar