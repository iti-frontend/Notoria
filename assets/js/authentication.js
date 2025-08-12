import { signUp, signIn, signOutUser } from "../servces/authServices.js";

// register

export async function register() {
  const email = document.getElementById("InputEmail").value;
  const pass = document.getElementById("InputPassword").value;

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
