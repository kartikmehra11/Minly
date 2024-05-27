// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxnQmzL4hD26z-Cm_E21UrjVaLqxJC6Q4",
  authDomain: "smolurl-df898.firebaseapp.com",
  projectId: "smolurl-df898",
  storageBucket: "smolurl-df898.appspot.com",
  messagingSenderId: "711216791076",
  appId: "1:711216791076:web:e68a9d8c13da25561da2b1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

if (process.env.NODE_ENV === "development") {
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
}
