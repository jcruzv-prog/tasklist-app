"use client";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkIZfz9BvXs_cnwBEr1ICtkBZ7WNvN3co",
  authDomain: "todo-app-8cee4.firebaseapp.com",
  projectId: "todo-app-8cee4",
  storageBucket: "todo-app-8cee4.appspot.com",
  messagingSenderId: "776675867031",
  appId: "1:776675867031:web:aa6111bd8aa5869dadecd2",
  measurementId: "G-KXFKBVDYZF",
};

// Initialize Firebase
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
