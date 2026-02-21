// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh6occ9G03rCxn_dGD7EnHe-ONYTT1Pz0",
  authDomain: "feedback-hub-6ee69.firebaseapp.com",
  projectId: "feedback-hub-6ee69",
  storageBucket: "feedback-hub-6ee69.firebasestorage.app",
  messagingSenderId: "34463096727",
  appId: "1:34463096727:web:ca4d26c0b2632f5cd92ed2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;