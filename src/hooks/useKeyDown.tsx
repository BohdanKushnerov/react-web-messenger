import { useEffect } from 'react';

import { UseKeyDown } from 'types/hooks/UseKeyDown';

const useKeyDown: UseKeyDown = inputRef => {
  useEffect(() => {
    const handleKeyDown = () => {
      if (document.activeElement !== inputRef.current) {
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputRef]);
};

export default useKeyDown;
