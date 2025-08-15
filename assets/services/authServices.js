"use strict";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { auth, db } from "./firebase.js";
import { showAlertModal } from "../js/modules/components.js";

// register
export async function signUp(email, password, name, phone) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      // Store additional user data in Firestore
     await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        phone: phone,
        email: email,
      });
    }).then(() => {
       console.log("Registration complete - user will be redirected by auth state listener");
    })
    .catch((error) => {
      showAlertModal("Error signing in:", error.message);
    });
  // console.log("User signed up successfully");
}

// //----------------login
// export async function signIn(email, password) {
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     console.log("User signed in:", userCredential.user.email);
//     return userCredential;
//   } catch (error) {
//     console.error("Error during sign-in:", error.message);
//     throw error;
//   }
// }

export function checkAuthState() {
  onAuthStateChanged(auth, (user) => {
    const currentPage = window.location.pathname;
    console.log("Auth state changed - user:", user);
    
    if (user) {
      console.log("User is logged in:", user.uid);
      // Only redirect to index.html if we're NOT already there
      if (!currentPage.includes('index.html') && currentPage !== '/') {
        console.log("Redirecting to index.html from:", currentPage);
        window.location.href = "index.html";
      }
    } else {
      console.log("No user logged in");
      // Only redirect to login if we're on a protected page (index.html)
      if (currentPage.includes('index.html') || currentPage === '/') {
        console.log("Redirecting to login.html from:", currentPage);
        window.location.href = "login.html";
      }
    }
  });
}

//----------------logout
export async function signOutUser() {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error during sign-out:", error.message);
  }
}
