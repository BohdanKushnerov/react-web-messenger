import { useEffect } from 'react';
import { toast } from 'react-toastify';

const useServiceWorker = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker
          .register('/firebase-messaging-sw.js', {
            scope: '/firebase-cloud-messaging-push-scope',
          })
          .catch(function (err) {
            toast.warn(err);
          });
      });
    } else {
      toast.warn('Service Worker is not supported by browser.');
    }
    if (!('PushManager' in window)) {
      toast.warn('No Push API Support!');
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);
};

export default useServiceWorker;
