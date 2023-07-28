import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDly7zMScnW8V25qBiHzoe49-YB2d0NfTU",
  authDomain: "sociopath-c7cd1.firebaseapp.com",
  projectId: "sociopath-c7cd1",
  storageBucket: "sociopath-c7cd1.appspot.com",
  messagingSenderId: "986605934648",
  appId: "1:986605934648:web:db4f9f1bc36c49d4cfaecd",
  measurementId: "G-ZX1W3X1K5L",
};

const app = initializeApp(firebaseConfig);

// Google Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
