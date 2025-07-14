// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKBKeMVMusiHd4bnf_tacJ-seC3jOjQrs",
  authDomain: "appfilme-d17d1.firebaseapp.com",
  projectId: "appfilme-d17d1",
  storageBucket: "appfilme-d17d1.firebasestorage.app",
  messagingSenderId: "1016807950172",
  appId: "1:1016807950172:web:6e0de9c98bc5b49a5f2399"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
