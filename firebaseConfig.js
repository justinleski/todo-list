// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiFl-dKrW3kuf1JLxQAnZqDzrp2IZALb8",
  authDomain: "todo-list-f7532.firebaseapp.com",
  projectId: "todo-list-f7532",
  storageBucket: "todo-list-f7532.appspot.com",
  messagingSenderId: "44650266781",
  appId: "1:44650266781:web:1f426171c79a9c2f44d474"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);