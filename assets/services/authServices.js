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

export async function signUp(email, password, name, phone) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      phone,
      email,
    });

    return user;
  } catch (error) {
    throw error;
  }
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
