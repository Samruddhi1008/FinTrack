import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCf2huDJUKuZTgjpeEKg58RY2FC6u1Abeg",
    authDomain: "finance-management-4b267.firebaseapp.com",
    projectId: "finance-management-4b267",
    storageBucket: "finance-management-4b267.firebasestorage.app",
    messagingSenderId: "535781031770",
    appId: "1:535781031770:web:08ccbec84b55f21bd63d63",
    measurementId: "G-JFS6ST4176"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
