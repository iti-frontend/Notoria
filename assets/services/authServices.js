"use strict";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
  setDoc,
  doc,
  getDoc,
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
      name: name,
      phone: phone,
      email: email,
      createdAt: new Date().toISOString(),
      isProfileComplete: true,
    });

    console.log("User created and data saved successfully");
    return { success: true, user: user };
  } catch (error) {
    console.error("Error during sign up:", error.message);
    if (error.code !== "auth/email-already-in-use" && auth.currentUser) {
      try {
        await auth.currentUser.delete();
        console.log("Rolled back user creation due to Firestore error");
      } catch (deleteError) {
        console.error("Error rolling back user creation:", deleteError.message);
      }
    }
    throw error;
  }
}

//----------------login
// In authServices.js - add this export
export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    console.error("Error during sign-in:", error.message);
    throw error;
  }
}

export function checkAuthState() {
  onAuthStateChanged(auth, async (user) => {
    const currentPage = window.location.pathname;
    console.log("Auth state changed:", user?.uid || "No user");

    const publicRoutes = [
      "/index.html",
      "/register.html",
      "/forgot-password.html",
      "/",
    ];

    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists() && userDoc.data().isProfileComplete) {
          // If user is authenticated but on a public page, redirect to home
          if (publicRoutes.some((route) => currentPage.endsWith(route))) {
            console.log(
              "Authenticated user on public page, redirecting to home"
            );
            window.location.href = "home.html";
          }
        } else if (userDoc.exists() && !userDoc.data().isProfileComplete) {
          // User needs to complete profile - allow access to profile completion page
          if (!publicRoutes.some((route) => currentPage.endsWith(route))) {
            console.log("Unauthenticated access - redirecting to login");
            window.location.href = "index.html";
          }
        }
      } catch (error) {
        console.error("Error checking user data:", error);
      }
    } else {
      // If no user and not on a public page, redirect to login
      if (!publicRoutes.some((route) => currentPage.endsWith(route))) {
        console.log("No user, redirecting to login");
        window.location.href = "index.html";
      }
    }
  });
}

export async function getUserData(userId) {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export function waitForUserData(userId, maxAttempts = 10) {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const checkData = async () => {
      attempts++;
      const userData = await getUserData(userId);

      if (userData && userData.isProfileComplete) {
        resolve(userData);
      } else if (attempts >= maxAttempts) {
        reject(new Error("Timeout waiting for user data"));
      } else {
        setTimeout(checkData, 500);
      }
    };

    checkData();
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

//----------------reset password
export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    console.error("Error sending reset email:", error.message);
    throw error;
  }
}
