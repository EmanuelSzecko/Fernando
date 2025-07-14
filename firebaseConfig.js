// firebaseConfig.js

// Importações necessárias do SDK do Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Suas credenciais do projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBKBKeMVMusiHd4bnf_tacJ-seC3jOjQrs",
  authDomain: "appfilme-d17d1.firebaseapp.com",
  projectId: "appfilme-d17d1",
  storageBucket: "appfilme-d17d1.firebasestorage.app",
  messagingSenderId: "1016807950172",
  appId: "1:1016807950172:web:6e0de9c98bc5b49a5f2399"
};

// Inicializa o Firebase com a configuração
const app = initializeApp(firebaseConfig);

// Exporta os serviços para autenticação e banco de dados (Firestore)
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
