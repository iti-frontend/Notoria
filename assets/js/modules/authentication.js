import { signUp, signIn, signOutUser } from "../../services/authServices.js";

// register

export async function register() {
  const email = document.getElementById("emailInput").value;
  const pass = document.getElementById("passwordInput").value;

  if (!email || !pass) {
    console.warn("Email and password are required");
    return;
  }

  try {
    const userCredential = await signUp(email, pass);
    console.log("User signed up:", userCredential.user.email);
    console.log("User signed up:", userCredential.user.uid);
  } catch (error) {
    console.error("Error during sign-up:", error.message);
  }
}

// TODO: login with authServices

//TODO: signout with authServices
