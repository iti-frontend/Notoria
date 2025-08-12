"use strict";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { auth } from "./firebase.js";
import { db } from "./firebase.js";

// register

export async function signUp(email, password, name, phone) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Store additional user data in Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: name,
      phone: phone,
      email: email,
      createdAt: new Date(),
    });

    console.log("User signed up succeed");
    return user;
  } catch (error) {
    console.error("Error during sign-up:", error.message);
    throw error;
  }
}

//----------------login
export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed in:", userCredential.user.email);
    return userCredential;
  } catch (error) {
    console.error("Error during sign-in:", error.message);
    throw error;
  }
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
