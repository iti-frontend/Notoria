import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD59y_O7r2w59GabuSUWd1FMxGTfFzUOlg",
  authDomain: "notoria-72fb2.firebaseapp.com",
  projectId: "notoria-72fb2",
  storageBucket: "notoria-72fb2.firebasestorage.app",
  messagingSenderId: "326212533122",
  appId: "1:326212533122:web:c138e32537a7a74dcb6d9b",
  measurementId: "G-ZHM3HK2S1C",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
