importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: 'process.env.VITE_API_KEY',
  authDomain: 'process.env.VITE_AUTH_DOMAIN',
  projectId: 'process.env.VITE_PROJECT_ID',
  storageBucket: 'process.env.VITE_STORAGE_BUCKET',
  messagingSenderId: 'process.env.VITE_MESSAGING_SENDER_ID',
  appId: 'process.env.VITE_APP_ID',
  measurementId: 'process.env.VITE_MEASUREMENT_ID',
  databaseURL: 'process.env.VITE_DB_URL',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(async function (payload) {
  await self.registration.showNotification(payload.data.title, {
    body: payload.data.body,
  });
});
