"use strict";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { auth, db } from "./firebase.js";

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
      window.location.href = "index.html";
      console.log("iam done");
      // open("index.html","_self");
      
    })
    .catch((error) => {
      console.error("Error signing in:", error.message);
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

// //----------------logout
// export async function signOutUser() {
//   try {
//     await signOut(auth);
//     console.log("User signed out");
//   } catch (error) {
//     console.error("Error during sign-out:", error.message);
//   }
// }
