import { useEffect } from 'react';

type UseCloseModal = (callback: () => void) => void;

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
