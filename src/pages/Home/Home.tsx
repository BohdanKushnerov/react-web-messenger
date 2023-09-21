import Chat from '@components/Chat/Chat';
import Sidebar from '@components/Sidebar/Sidebar';
import { useState, useEffect } from 'react';

export type TScreen = 'Sidebar' | 'Chat';

function Home() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [screen, setScreen] = useState<TScreen>('Sidebar');

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setIsMobileScreen(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);

    setIsMobileScreen(window.innerWidth <= 640);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        height: `${windowHeight}px`,
        overflow: 'hidden',
      }}
    >
      {isMobileScreen ? (
        screen === 'Sidebar' ? (
          <Sidebar setScreen={setScreen} />
        ) : (
          <Chat setScreen={setScreen} />
        )
      ) : (
        <div
          style={{
            display: 'flex',
            height: `${windowHeight}px`,
            overflow: 'hidden',
          }}
        >
          <Sidebar />
          <Chat />
        </div>
      )}
    </div>
  );
}

export default Home;
