import {
  login,
  logout,
  register,
  showPassword,
  handleResetPassword,
} from "./modules/authentication.js";
import { setLogoHTML } from "./modules/components.js";
import { checkAuthState } from "../services/authServices.js";

// Check auth state when page loads
checkAuthState();

document.addEventListener("DOMContentLoaded", () => {
  // Initialize components
  setLogoHTML();

  // Initialize events
  const registerBtn = document.getElementById("register");
  if (registerBtn) {
    registerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      register();
    });
  }
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      login(e);
    });
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      logout();
    });
  }

  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", (e) => {
      handleResetPassword(e);
    });
  }

  // ====== function calls
  showPassword();
});
