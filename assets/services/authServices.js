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
  getDoc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { auth, db } from "./firebase.js";

export async function signUp(email, password, name, phone) {
  try {
    // إنشاء المستخدم أولاً
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // حفظ البيانات الإضافية في Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: name,
      phone: phone,
      email: email,
      createdAt: new Date().toISOString(),
      isProfileComplete: true // علامة للتأكد من اكتمال البيانات
    });
    
    console.log("User created and data saved successfully");
    return { success: true, user: user };
    
  } catch (error) {
    console.error("Error during sign up:", error.message);
    // إذا فشل حفظ البيانات، نحذف المستخدم المُنشأ
    if (error.code !== 'auth/email-already-in-use' && auth.currentUser) {
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
  onAuthStateChanged(auth, async (user) => {
    const currentPage = window.location.pathname;
    console.log("Auth state changed:", user?.uid || "No user");
    
    if (user) {
      try {
        // التحقق من وجود بيانات المستخدم في Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists() && userDoc.data().isProfileComplete) {
          // المستخدم مكتمل البيانات - يمكن إعادة التوجيه
          if (!currentPage.includes('index.html') && currentPage !== '/') {
            console.log("Redirecting authenticated user to dashboard");
            window.location.href = "index.html";
          }
        } else {
          // المستخدم موجود لكن البيانات غير مكتملة - انتظار
          console.log("User exists but profile incomplete, waiting...");
          // يمكن إضافة منطق إضافي هنا إذا لزم الأمر
        }
      } catch (error) {
        console.error("Error checking user data:", error);
        // في حالة خطأ، نتعامل مع المستخدم كمستخدم مكتمل البيانات
        if (!currentPage.includes('index.html') && currentPage !== '/') {
          window.location.href = "index.html";
        }
      }
    } else {
      // لا يوجد مستخدم مسجل الدخول
      if (currentPage.includes('index.html') || currentPage === '/') {
        console.log("No user, redirecting to login");
        window.location.href = "login.html";
      }
    }
  });
}

// دالة للتحقق من حالة المستخدم ووجود البيانات
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

// دالة للانتظار حتى اكتمال بيانات المستخدم
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
        // إعادة المحاولة بعد 500ms
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
