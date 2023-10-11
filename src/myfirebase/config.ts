import { initializeApp } from 'firebase/app';
import {
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
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
// const storage = getStorage(app, `gs://${VITE_STORAGE_BUCKET}`);
const storage = getStorage(app, "gs://react-web-messenger-dc6c4.appspot.com");

setPersistence(auth, browserLocalPersistence);

onAuthStateChanged(auth, user => {
  if (user) {
    // Пользователь уже вошел в систему. Вы можете использовать 'auth' объект.
    console.log('Пользователь вошел в систему:', user);
    console.log('auth', auth);
  } else {
    // Пользователь не вошел в систему.
    console.log('Пользователь не вошел в систему.');
  }
});

export { auth, db, database, storage };
