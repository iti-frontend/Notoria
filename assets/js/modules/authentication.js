import { showToast } from "./components.js";
import { FormValidator } from "./validation.js";
import { signUp, signOutUser } from "../../services/authServices.js";

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

      // انتظار قصير قبل إعادة التوجيه للتأكد من اكتمال العمليات
      setTimeout(() => {
        window.location.href = "index.html";
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
