const {
  VITE_EXAMPLE,
} = import.meta.env;

export const example = {
  example: VITE_EXAMPLE
}

// export const firebaseConfig = {
//   apiKey: VITE_API_KEY,
//   authDomain: VITE_AUTH_DOMAIN,
//   projectId: VITE_PROJECT_ID,
//   storageBucket: VITE_STORAGE_BUCKET,
//   messagingSenderId: VITE_MESSAGING_SENDER_ID,
//   appId: VITE_APP_ID,
//   measurementId: VITE_MEASUREMENT_ID,
// };