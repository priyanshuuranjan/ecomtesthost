// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQpzmIIn8CtDN_QrIaFsNRbkfLjIu6jYE",
  authDomain: "kf-ecommerce.firebaseapp.com",
  projectId: "kf-ecommerce",
  storageBucket: "kf-ecommerce.appspot.com",
  messagingSenderId: "848659364359",
  appId: "1:848659364359:web:f3061143636433c91608a2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);

const auth = getAuth(app);

export { fireDB, auth,app };
