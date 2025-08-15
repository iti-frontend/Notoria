import { signUp, signIn, signOutUser } from "../../services/authServices.js";
import { showAlertModal } from "./components.js";
import { validator } from "./validation.js";

// register

export async function register() {
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
  const rePassword = document.getElementById("rePasswordInput").value;
  const username = document.getElementById("userNameInput").value;
  const phone = document.getElementById("phoneInput").value;
  const registerBtn = document.getElementById("register");

  // Create form data object for validation
  const formData = {
    username: username,
    email: email,
    password: password,
    rePassword: rePassword,
    phone: phone,
  };

  // Validate form data
  const isValid = validator.validateRegistrationForm(formData);

  if (!isValid) {
    // Display validation errors
    validator.displayValidationErrors();
    return; // Stop registration if validation fails
  }

  // Clear any previous validation errors if form is valid
  validator.clearFieldErrors([
    "userNameInput",
    "emailInput",
    "passwordInput",
    "rePasswordInput",
    "phoneInput",
  ]);
  registerBtn.disabled = true;
  registerBtn.innerHTML = `<span class="loader"></span>`;
  try {
    await signUp(email, password, username, phone);
    console.log("Signup successful - auth listener will handle redirect");


  } catch (error) {
    console.error("Error during sign-up:", error.message);

    // Display server-side errors
    if (error.message.includes("email-already-in-use")) {
      validator.addError("email", "This email is already registered");
      validator.displayValidationErrors();
    } else if (error.message.includes("weak-password")) {
      validator.addError("password", "Password is too weak");
      validator.displayValidationErrors();
    } else {
      // Show generic error message
      showAlertModal("Registration Failed", error.message);
    }
  } finally {
    registerBtn.disabled = false;
    registerBtn.textContent = "sign up";
  }
}

// // Login function
// export async function login() {
//   const email = document.getElementById("emailInput").value;
//   const password = document.getElementById("passwordInput").value;
//   const loginBtn = document.querySelector('button[type="button"]');

//   // Basic validation
//   if (!email || !password) {
//     showAlertModal("Validation Error", "Please fill in all fields");
//     return;
//   }

//   // Disable button and show loading
//   loginBtn.disabled = true;
//   loginBtn.innerHTML = `<span class="loader"></span>`;

//   try {
//     await signIn(email, password);
//     console.log("Login successful - auth listener will handle redirect");
//   } catch (error) {
//     console.error("Error during login:", error.message);
    
//     // Display user-friendly error messages
//     if (error.message.includes("user-not-found")) {
//       showAlertModal("Login Failed", "No user found with this email address");
//     } else if (error.message.includes("wrong-password")) {
//       showAlertModal("Login Failed", "Incorrect password");
//     } else if (error.message.includes("invalid-email")) {
//       showAlertModal("Login Failed", "Invalid email address");
//     } else if (error.message.includes("too-many-requests")) {
//       showAlertModal("Login Failed", "Too many failed attempts. Please try again later");
//     } else {
//       showAlertModal("Login Failed", error.message);
//     }
//   } finally {
//     loginBtn.disabled = false;
//     loginBtn.textContent = "Login";
//   }
// }

// Logout function
export async function logout() {
  try {
    await signOutUser();
    console.log("Logout successful - auth listener will handle redirect");
  } catch (error) {
    console.error("Error during logout:", error.message);
    showAlertModal("Logout Failed", error.message);
  }
}
