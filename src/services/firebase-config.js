// firebase-config.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBq8Ak9M9RnT2thDb-vrUUVFFgm9VkulNA",
  authDomain: "mapeet-bb556.firebaseapp.com",
  projectId: "mapeet-bb556",
  storageBucket: "mapeet-bb556.firebasestorage.app",
  messagingSenderId: "57593654750",
  appId: "1:57593654750:web:4ce2005fac1e72e785c14f",
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage, app };
