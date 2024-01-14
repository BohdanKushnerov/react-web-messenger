import { useEffect, useState } from 'react';

const useResizeWindow = () => {
  const [isFullScreen, setIsFullScreen] = useState(
    () => window.innerWidth > 640
  );

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

  return isFullScreen;
};

export default useResizeWindow;
