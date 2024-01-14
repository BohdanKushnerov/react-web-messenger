import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { AppScreenType } from 'types/AppScreenType';

interface IUseResizeWindow {
  (setScreen: (string: AppScreenType) => void, setWindowHeight: (number: number) => void): void;
}

const useResizeWindow: IUseResizeWindow = (setScreen, setWindowHeight) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);

      if (window.innerWidth <= 640) {
        setScreen(pathname === '/' ? 'Sidebar' : 'Chat');
      } else {
        setScreen('FullScreen');
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [pathname, setScreen, setWindowHeight]);
};

export default useResizeWindow;
