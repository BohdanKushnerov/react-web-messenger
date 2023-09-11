import Home from '@pages/Home/Home';
import Registration from '@components/Registration/Registration';
// import { signOut } from 'firebase/auth';
import { auth } from '@myfirebase/config';
import { useEffect } from 'react';
import useChatStore from '@zustand/store';

function App() {
  const updateCurrentUser = useChatStore(state => state.updateCurrentUser);
  const { currentUser, isLoggedIn } = useChatStore(state => state);

  // console.log(currentUser)

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

  // const handleSignOut = async () => {
  //   const exit = await signOut(auth);
  //   console.log('exit', exit);
  // };

  return (
    <div className="h-screen bg-main-bcg2 bg-no-repeat bg-cover bg-center">
    {/* // <div className="h-screen bg-no-repeat bg-cover bg-center"> */}
      {/* <p>{currentUser?.displayName}</p>
      <button className="border border-gray-600" onClick={handleSignOut}>
        Sign Out
      </button> */}
      {currentUser.displayName === null && <Registration />}
      {isLoggedIn && currentUser.displayName && <Home />}
      {/* <Home /> */}
    </div>
  );
}

export default App;
