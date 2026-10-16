// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8Jv_DJBVxmhd6luL2n0bZFSLT0xIcFGs",
  authDomain: "zeus-suspensiones.firebaseapp.com",
  projectId: "zeus-suspensiones",
  storageBucket: "zeus-suspensiones.firebasestorage.app",
  messagingSenderId: "198604250734",
  appId: "1:198604250734:web:c8e2c5ee0a4eb12523107f",
  measurementId: "G-WXR91Y8J1J"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);