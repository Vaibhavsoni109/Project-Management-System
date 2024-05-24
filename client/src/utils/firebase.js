// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "project-management-mern.firebaseapp.com",
  projectId: "project-management-mern",
  storageBucket: "project-management-mern.appspot.com",
  messagingSenderId: "701241727303",
  appId: "1:701241727303:web:f4688ba7e75c752545d462"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);