import { signUp } from "../../services/authServices.js";
import { showToast } from "./components.js";
import { FormValidator } from "./validation.js";

const validator = new FormValidator("registerForm");

export async function register() {
  const registerBtn = document.getElementById("register");

  if (!validator.validateForm()) {
    return;
  }

  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
  const username = document.getElementById("userNameInput").value;
  const phone = document.getElementById("phoneInput").value;

  registerBtn.disabled = true;
  registerBtn.innerHTML = `<span class="loader"></span>`;

  try {
    const user = await signUp(email, password, username, phone);
    validator.clearForm();
    showToast("Account created successfully!", "success");
  } catch (error) {
    console.error("Error during sign-up:", error.message);

    if (error.code === "auth/email-already-in-use") {
      validator.validateField(document.getElementById("emailInput"));
      showToast("This email is already registered");
    } else if (error.code === "auth/weak-password") {
      validator.validateField(document.getElementById("passwordInput"));
      showToast("Password is too weak");
    } else {
      showToast("Registration failed. Please try again");
    }
  } finally {
    registerBtn.disabled = false;
    registerBtn.textContent = "sign up";
  }
}
