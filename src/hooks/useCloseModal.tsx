import { useEffect } from 'react';

import { UseCloseModal } from 'types/hooks/UseCloseModal';

const useCloseModal: UseCloseModal = callback => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback]);
};

export default useCloseModal;
