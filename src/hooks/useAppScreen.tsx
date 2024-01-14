import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { AppScreenType } from 'types/AppScreenType';

interface IUseAppScreen {
  (setScreen: (appScreen: AppScreenType) => void): void;
}

const useAppScreen: IUseAppScreen = setScreen => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.innerWidth <= 640) {
      if (pathname === '/') {
        setScreen('Sidebar');
      } else {
        setScreen('Chat');
      }
    } else {
      // setScreen('FullScreen');
    }
  }, [pathname, setScreen]);
};

export default useAppScreen;
