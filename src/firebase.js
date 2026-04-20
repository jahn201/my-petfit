// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // <-- Added this for Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-oDMDzH52JkdfULXofP3iaupKVGjW6jQ",
  authDomain: "petfit-24a2e.firebaseapp.com",
  projectId: "petfit-24a2e",
  storageBucket: "petfit-24a2e.firebasestorage.app",
  messagingSenderId: "325147029905",
  appId: "1:325147029905:web:d242dbc0b05869a1b56a30",
  measurementId: "G-BMS4HFNG3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app); // <-- Added this to use auth in other files