import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env["VITE_APIKEY"],
  appId: import.meta.env["VITE_APPID"],
  authDomain: import.meta.env["VITE_AUTHDOMAIN"],
  databaseURL: import.meta.env["VITE_DATABASEURL"],
  measurementId: import.meta.env["VITE_MEASUREMENTID"],
  messagingSenderId: import.meta.env["VITE_MESSAGINGSENDERID"],
  projectId: import.meta.env["VITE_PROJECTID"],
  storageBucket: import.meta.env["VITE_STORAGEBUCKET"],
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase);
export const firestore = getFirestore(firebase);
