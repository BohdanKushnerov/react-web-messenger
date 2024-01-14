import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { AppScreenType } from 'types/AppScreenType';

interface IUseAppScreen {
  (setScreen: (appScreen: AppScreenType) => void): void;
}

const useAppScreen: IUseAppScreen = setScreen => {
  const { pathname } = useLocation();

  const handleScreenChange = useMemo(() => {
    return () => {
      if (window.innerWidth <= 640) {
        if (pathname === '/') {
          setScreen('Sidebar');
        } else {
          setScreen('Chat');
        }
      } else {
        // setScreen('FullScreen');
      }
    };
  }, [pathname, setScreen]);

  useEffect(() => {
    handleScreenChange();
  }, [handleScreenChange]);
};

export default useAppScreen;
