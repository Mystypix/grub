import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(firebase);
