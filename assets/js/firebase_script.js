// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD59y_O7r2w59GabuSUWd1FMxGTfFzUOlg",
  authDomain: "notoria-72fb2.firebaseapp.com",
  projectId: "notoria-72fb2",
  storageBucket: "notoria-72fb2.firebasestorage.app",
  messagingSenderId: "326212533122",
  appId: "1:326212533122:web:c138e32537a7a74dcb6d9b",
  measurementId: "G-ZHM3HK2S1C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

//=======================register=====================

// document.getElementById("register").addEventListener("click", () => {
//   const email = document.getElementById("InputEmail").value;
//   const pass = document.getElementById("InputPassword").value;

//   createUserWithEmailAndPassword(auth, email, pass)
//     .then((userCredential) => {
//       console.log("User signed up:", userCredential.user);
//     })
//     .catch((error) => {
//       console.error("Error signing up:", error.message);
//     });
// });

document.getElementById("register").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("InputEmail").value;
  const pass = document.getElementById("InputPassword").value;

  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      console.log("User signed in:", userCredential.user);
    })
    .catch((error) => {
      console.error("Error signing in:", error.message);
    });
  onAuthStateChanged(auth, (user) => {
    if (user) {
      document.getElementById("user-info").textContent = JSON.stringify(
        user,
        null,
        2
      );
    } else {
      alert("no user sign in");
      document.getElementById("user-info").textContent = "No user signed in";
    }
  });
});
