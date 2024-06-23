import { initializeApp } from 'firebase/app';
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken } from 'firebase/messaging';
import { getStorage } from 'firebase/storage';

const {
  VITE_API_KEY,
  VITE_AUTH_DOMAIN,
  VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET,
  VITE_MESSAGING_SENDER_ID,
  VITE_APP_ID,
  VITE_MEASUREMENT_ID,
  VITE_DB_URL,
  VITE_VAPID_KEY,
} = import.meta.env || ({} as NodeJS.Process['env']);

const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID,
  measurementId: VITE_MEASUREMENT_ID,
  databaseURL: VITE_DB_URL,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app, `gs://${VITE_STORAGE_BUCKET}`);

const messaging = getMessaging();

const myVapidKey = VITE_VAPID_KEY;

export const requestForToken = async () => {
  try {
    return await getToken(messaging, { vapidKey: myVapidKey });
  } catch (error) {
    console.log(
      'No registration token available. Request permission to generate one.',
      error
    );
  }
};

setPersistence(auth, browserLocalPersistence);

export { auth, db, database, storage, messaging };
