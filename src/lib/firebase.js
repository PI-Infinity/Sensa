// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxcO_3h1pyIG0bsDjZKu7jFfPUeJK1S-4",
  authDomain: "sensa-99b10.firebaseapp.com",
  projectId: "sensa-99b10",
  storageBucket: "sensa-99b10.firebasestorage.app",
  messagingSenderId: "466242303248",
  appId: "1:466242303248:web:4dc99982385c56a7d6a195",
  measurementId: "G-3QVJT8481Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
