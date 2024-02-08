import { useEffect, useState } from 'react';

const useBrowserTabVisibilityChange = () => {
  const [docHidden, setDocHidden] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setDocHidden(true);
      } else {
        setDocHidden(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return docHidden;
};

export default useBrowserTabVisibilityChange;
