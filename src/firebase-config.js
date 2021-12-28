// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBb6jnD0KJgdjIbW3r2JsTGWjSVs8eeyZ4",
  authDomain: "bozorov-blog.firebaseapp.com",
  projectId: "bozorov-blog",
  storageBucket: "bozorov-blog.appspot.com",
  messagingSenderId: "1003524865486",
  appId: "1:1003524865486:web:3ca7629aee1cb3e38d3f9f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
