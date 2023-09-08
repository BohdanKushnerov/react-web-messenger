import { initializeApp } from 'firebase/app';
import {
  browserLocalPersistence,
  getAuth,
  // onAuthStateChanged,
  setPersistence,
} from 'firebase/auth';
import {
  // addDoc,
  // collection,
  // getDocs,
  getFirestore,
  // query,
  // where,
} from 'firebase/firestore';

const {
  VITE_API_KEY,
  VITE_AUTH_DOMAIN,
  VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET,
  VITE_MESSAGING_SENDER_ID,
  VITE_APP_ID,
  VITE_MEASUREMENT_ID,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID,
  measurementId: VITE_MEASUREMENT_ID,
  // databaseURL: "https://DATABASE_NAME.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Установите тип хранения в localStorage.
setPersistence(auth, browserLocalPersistence);
// Отслеживайте изменения состояния аутентификации.

// onAuthStateChanged(auth, user => {
//   if (user) {
//     // Пользователь уже вошел в систему. Вы можете использовать 'auth' объект.
//     console.log('Пользователь вошел в систему:', user);
//     console.log("auth", auth)

    
//   } else {
//     // Пользователь не вошел в систему.
//     console.log('Пользователь не вошел в систему.');
//   }
// });

export { auth, db };
