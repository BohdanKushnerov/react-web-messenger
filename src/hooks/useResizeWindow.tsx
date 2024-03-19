import { useEffect, useState } from 'react';

const useResizeWindow = () => {
  const [isFullScreen, setIsFullScreen] = useState(
    () => window.innerWidth > 639
  );
  const [heightWindow, setHeightWindow] = useState(() => window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 639) {
        setIsFullScreen(false);
      } else {
        setIsFullScreen(true);
      }
      setHeightWindow(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsFullScreen]);

  return { isFullScreen, heightWindow };
};

export default useResizeWindow;
