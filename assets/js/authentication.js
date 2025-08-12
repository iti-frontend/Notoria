import { signUp, signIn, signOutUser } from "../servces/authServices.js";

// register

export async function register() {
  const email = document.getElementById("InputEmail").value;
  const pass = document.getElementById("InputPassword").value;
  const name = document.getElementById("InputName").value;
  const phone = document.getElementById("InputPhone").value;

  try {
    const user = await signUp(email, pass, name, phone);
    console.log("User signed up:", user.email);
    console.log("User signed up:", user.uid);
  } catch (error) {
    console.error("Error during sign-up:", error.message);
  }
}

// TODO: login with authServices

//TODO: signout with authServices
