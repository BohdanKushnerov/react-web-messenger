import { useEffect, useRef, useState } from 'react';

const throttleResizeTime = 100;

const useResizeWindow = () => {
  const [isFullScreen, setIsFullScreen] = useState(
    () => window.innerWidth > 639
  );
  const [heightWindow, setHeightWindow] = useState(() => window.innerHeight);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 639) {
        setIsFullScreen(false);
      } else {
        setIsFullScreen(true);
      }

      const height = window?.visualViewport?.height ?? window.innerHeight;
      setHeightWindow(height);
    };

    const throttledResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(handleResize, throttleResizeTime);
    };

    window.addEventListener('resize', throttledResize);

    return () => {
      window.removeEventListener('resize', throttledResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  return { isFullScreen, heightWindow };
};

export default useResizeWindow;
