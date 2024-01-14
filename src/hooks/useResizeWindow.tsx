import { useEffect } from 'react';

interface IUseResizeWindow {
  (setIsFullScreen: (boolean: boolean) => void): void;
}

const useResizeWindow: IUseResizeWindow = setIsFullScreen => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setIsFullScreen(false);
      } else {
        setIsFullScreen(true);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsFullScreen]);
};

export default useResizeWindow;
