import { showToast } from "./components.js";
import { FormValidator } from "./validation.js";
import { signUp, signOutUser, signIn, resetPassword } from "../../services/authServices.js";

let validator = null;
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  validator = new FormValidator("registerForm");
}

export async function register() {
  const registerBtn = document.getElementById("register");

  // Check if validator exists and form is valid
  if (!validator || !validator.validateForm()) {
    return;
  }

  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
  const username = document.getElementById("userNameInput").value;
  const phone = document.getElementById("phoneInput").value;

  registerBtn.disabled = true;
  registerBtn.innerHTML = `<span class="loader"></span>`;

  try {
    const result = await signUp(email, password, username, phone);
    if (result.success) {
      if (validator) {
        validator.clearForm();
      }
      showToast("Account created successfully! Redirecting...", "success");

      setTimeout(() => {
        window.location.href = "home.html";
      }, 1500);
    }
  } catch (error) {
    console.error("Error during sign-up:", error.message);

    if (error.code === "auth/email-already-in-use") {
      if (validator) {
        validator.validateField(document.getElementById("emailInput"));
      }
      showToast("This email is already registered");
    } else if (error.code === "auth/weak-password") {
      if (validator) {
        validator.validateField(document.getElementById("passwordInput"));
      }
      showToast("Password is too weak");
    } else {
      showToast("Registration failed. Please try again");
    }
  } finally {
    registerBtn.disabled = false;
    registerBtn.textContent = "sign up";
  }
}

// Login function
export async function login(e) {
  e.preventDefault();
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
  const loginBtn = document.querySelector("#loginBtn");

  // Enhanced validation
  if (!email || !email.includes("@")) {
    showToast("Please enter a valid email address");
    return;
  }

  if (!password || password.length < 6) {
    showToast("Password must be at least 6 characters");
    return;
  }

  loginBtn.disabled = true;
  loginBtn.innerHTML = `<span class="loader"></span>`;

  try {
    const userCredential = await signIn(email, password);
    showToast("Login successful!", "success");

    // Wait briefly before redirect to allow auth state to update
    setTimeout(() => {
      window.location.href = "home.html";
    }, 500);
  } catch (error) {
    console.error("Login error:", error);
    // Your existing error handling...
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = "Login";
  }
}

// Logout function
export async function logout() {
  try {
    await signOutUser();

    showToast("Logout successful", "success");
  } catch (error) {
    console.error("Error during logout:", error.message);
    showToast("Logout Failed");
  }
}

export function showPassword() {
  const toggleBtns = document.querySelectorAll(".toggle-password");

  toggleBtns.forEach((btn) => {
    const targetId = btn.getAttribute("data-target");
    const input = document.getElementById(targetId);
    const icon = btn.querySelector("i");

    btn.style.display = "none";

    input.addEventListener("input", () => {
      if (input.value.trim().length > 0) {
        btn.style.display = "inline-flex";
      } else {
        btn.style.display = "none";
        input.type = "password";
        icon.classList.remove("icon-eye");
        icon.classList.add("icon-eye-slash");
      }
    });

    btn.addEventListener("click", () => {
      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("icon-eye-slash");
        icon.classList.add("icon-eye");
      } else {
        input.type = "password";
        icon.classList.remove("icon-eye");
        icon.classList.add("icon-eye-slash");
      }
    });
  });
}

// Reset password function
export async function handleResetPassword(e) {
  e.preventDefault();
  const email = document.getElementById("emailInput").value;
  const resetBtn = document.getElementById("resetBtn");

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    showToast("Please enter a valid email address");
    return;
  }

  resetBtn.disabled = true;
  resetBtn.innerHTML = `<span class="loader"></span>`;

  try {
    await resetPassword(email);
    showToast("Reset link sent! Check your email.", "success");
  } catch (error) {
    console.error("Reset error:", error);
    showToast("Failed to send reset link. Try again");
  } finally {
    resetBtn.disabled = false;
    resetBtn.textContent = "Send reset link";
  }
}
