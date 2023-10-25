// import { getMessaging, onMessage } from "firebase/messaging";
// import { onBackgroundMessage } from "firebase/messaging/sw";

// const messaging = getMessaging();

// onMessage(messaging, payload => {
//   console.log('Message received. ', payload);
//   // ...
// });

// onBackgroundMessage(messaging, payload => {
//   console.log(
//     '[firebase-messaging-sw.js] Received background message ',
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     // icon: '/firebase-logo.png',
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// messaging.onBackgroundMessage(payload => {
//   console.log(
//     '[firebase-messaging-sw.js] Received background message ',
//     payload
//   );
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };
//   return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions
//   );
// });
// self.addEventListener('notificationclick', event => {
//   console.log(event);
// });
