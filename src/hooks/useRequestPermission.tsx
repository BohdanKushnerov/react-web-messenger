import { useEffect } from 'react';
import { toast } from 'react-toastify';

const useRequestPermission = () => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        if (!('Notification' in window)) {
          toast.warn('This browser does not support notifications.');
          return;
        }

        if (Notification.permission === 'granted') {
          return;
        }

        const handleUserGesture = async () => {
          try {
            await Notification.requestPermission();
          } catch (error) {
            console.error('Failed to request notification permission:', error);
          }
        };

        document.addEventListener('click', handleUserGesture);

        return () => {
          document.removeEventListener('click', handleUserGesture);
        };
      } catch (error) {
        console.error('Failed to request notification permission:', error);
      }
    };

    requestPermission();
  }, []);
};

export default useRequestPermission;
