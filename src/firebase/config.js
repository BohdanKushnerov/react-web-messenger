import { initializeApp } from 'firebase/app';
import {
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
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
onAuthStateChanged(auth, user => {
  if (user) {
    // Пользователь уже вошел в систему. Вы можете использовать 'auth' объект.
    console.log('Пользователь вошел в систему:', user);
    console.log("auth", auth)

    
  } else {
    // Пользователь не вошел в систему.
    console.log('Пользователь не вошел в систему.');
  }
});

// console.log(db)

// ================ make collection
// try {
//   const docRef = await addDoc(collection(db, 'users'), {
//     name: 'Kateryna',
//     id: 6
//   });
//   console.log('Document written with ID: ', docRef.id);
//   console.log('Document: ', docRef);
// } catch (e) {
//   console.error('Error adding document: ', e);
// }
// ================ gec collection
// try {
// const querySnapshot = await getDocs(collection(db, 'users'));
// querySnapshot.forEach(doc => {
//   // console.log(`${doc.id} => ${doc.data()}`);
//   console.log("doc.data()", doc.data());
// });
// } catch (e) {
// console.error('Error reading document: ', e);
// }
// ================search users
// const usersRef = collection(db, 'users');
// const searchString = 'K';

// const q = query(
//   usersRef,
//   where('name', '>=', searchString),
//   where('name', '<=', searchString + '\uf8ff')
// );
// (async () => {
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach(doc => {
//     console.log(doc.data());
//   });
// })();
// ================
// const obj = {
//   chat: '1 + 2',
//   messages: [{},{},{}],
//   isAllow: true,
// }
// ================

export { auth, db };
