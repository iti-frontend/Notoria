import {
  login,
  logout,
  register,
  showPassword,
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

  // ====== function calls
  showPassword();
});
