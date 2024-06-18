import { useEffect } from 'react';

import { UseKeyDown } from 'types/hooks/UseKeyDown';

const useKeyDown: UseKeyDown = (inputRef, isShowSearchMessages) => {
  useEffect(() => {
    const handleKeyDown = () => {
      if (isShowSearchMessages === true) return;

      if (document.activeElement !== inputRef.current) {
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputRef, isShowSearchMessages]);
};

export default useKeyDown;
