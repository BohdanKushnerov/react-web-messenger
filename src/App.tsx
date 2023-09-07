import Home from '@pages/Home/Home';
// import Registration from '@components/Registration/Registration';
import { User, signOut } from 'firebase/auth';
import { auth } from './firebase/config';
import { useState, useEffect } from 'react';


function App() {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(authUser => {
        if (authUser) {
          // Пользователь авторизован
          setUser(authUser);
        } else {
          // Пользователь не авторизован
          setUser(null);
        }
      });

      // Отписываемся от слежения при размонтировании компонента
      return () => unsubscribe();
    }, []);

  const handleSignOut = async () => {
    const exit = await signOut(auth);
    console.log('exit', exit);
  }

  return (
    // <div className="h-screen bg-main-bcg bg-no-repeat bg-cover bg-center">
    <div className="h-screen bg-no-repeat bg-cover bg-center">
      <button className="border-gray-600" onClick={handleSignOut}>
        Sign Out
      </button>
      {/* <Registration /> */}
      {user && <Home />}
    </div>
  );
}

export default App;
