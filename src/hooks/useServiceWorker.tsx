import { useEffect } from 'react';

const useServiceWorker = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker
          .register('/firebase-messaging-sw.js', {
            scope: '/firebase-cloud-messaging-push-scope',
          })
          .then(
            function () {
              // console.log('Worker registration successful', registration.scope);
              console.log('Worker registration successful');
            },
            function (err) {
              console.log('Worker registration failed', err);
            }
          )
          .catch(function (err) {
            console.log(err);
          });
      });
    } else {
      console.log('Service Worker is not supported by browser.');
    }
    if (!('PushManager' in window)) {
      console.log('No Push API Support!');
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          // console.log('Permission granted for Notification');
        }
      });
    }
  }, []);
};

export default useServiceWorker;
