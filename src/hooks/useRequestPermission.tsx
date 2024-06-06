import { useEffect } from 'react';

const useRequestPermission = () => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          // console.log('Notification permission granted.');
        }
      } catch (error) {
        console.error('Failed to request notification permission:', error);
      }
    };

    requestPermission();
  }, []);
};

export default useRequestPermission;
