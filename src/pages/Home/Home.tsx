import Chat from '@components/Chat/Chat';
import Sidebar from '@components/Sidebar/Sidebar';
import { useState, useEffect } from 'react';

export type TScreen = 'Sidebar' | 'Chat';

function Home() {
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [screen, setScreen] = useState<TScreen>('Sidebar');

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);

    setIsMobileScreen(window.innerWidth <= 640);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={isMobileScreen ? '' : 'flex h-screen'}>
      {isMobileScreen ? (
        screen === 'Sidebar' ? (
          <Sidebar setScreen={setScreen} />
        ) : (
          <Chat setScreen={setScreen} />
        )
      ) : (
        <>
          <Sidebar />
          <Chat />
        </>
      )}
    </div>
  );
}

export default Home;
