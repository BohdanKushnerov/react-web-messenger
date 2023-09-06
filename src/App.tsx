import Home from '@pages/Home/Home';
import Registration from '@components/Registration/Registration';
import { signOut } from 'firebase/auth';
import { auth } from './firebase/config';

function App() {

  const handleSignOut = async () => {
    const exit = await signOut(auth);
    console.log('exit', exit);
  }
  return (
    // <div className="h-screen bg-main-bcg bg-no-repeat bg-cover bg-center">
    <div className="h-screen bg-no-repeat bg-cover bg-center">
      <button className='border-gray-600' onClick={handleSignOut}>Sign Out</button>
      <Registration />
      <Home />
    </div>
  );
}

export default App;
