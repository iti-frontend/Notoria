// import { signUp, signIn, signOutUser } from "../../services/authServices.js";
import { signUp } from "../../services/authServices.js";
import { validator } from "./validation.js";

// register

export async function register() {
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
  const rePassword = document.getElementById("rePasswordInput").value;
  const username = document.getElementById("userNameInput").value;
  const phone = document.getElementById("phoneInput").value;

  // Create form data object for validation
  const formData = {
    username: username,
    email: email,
    password: password,
    rePassword: rePassword,
    phone: phone
  };

  // Validate form data
  const isValid = validator.validateRegistrationForm(formData);

  if (!isValid) {
    // Display validation errors
    validator.displayValidationErrors();
    return; // Stop registration if validation fails
  }

  // Clear any previous validation errors if form is valid
  validator.clearFieldErrors(['userNameInput', 'emailInput', 'passwordInput', 'rePasswordInput', 'phoneInput']);

  try {
    await signUp(email, password, username, phone);
    // console.log("User signed up:", user.email);
    // console.log("User signed up:", user.uid);
  } catch (error) {
    console.error("Error during sign-up:", error.message);
    
    // Display server-side errors
    if (error.message.includes('email-already-in-use')) {
      validator.addError('email', 'This email is already registered');
      validator.displayValidationErrors();
    } else if (error.message.includes('weak-password')) {
      validator.addError('password', 'Password is too weak');
      validator.displayValidationErrors();
    } else {
      // Show generic error message
      alert('Registration failed: ' + error.message);
    }
  }
}

// TODO: login with authServices

//TODO: signout with authServices
