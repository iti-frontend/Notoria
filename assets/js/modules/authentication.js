// import { signUp, signIn, signOutUser } from "../../services/authServices.js";
import { signUp } from "../../services/authServices.js";

// register

export async function register() {
  const email = document.getElementById("emailInput").value;
  const pass = document.getElementById("passwordInput").value;
  const name = document.getElementById("userNameInput").value;
  const phone = document.getElementById("phoneInput").value;

  try {
    await signUp(email, pass, name, phone);
    // console.log("User signed up:", user.email);
    // console.log("User signed up:", user.uid);
  } catch (error) {
    console.error("Error during sign-up:", error.message);
  }
}

// TODO: login with authServices

//TODO: signout with authServices
