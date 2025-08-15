import { register, login } from "./modules/authentication.js";
import { setLogoHTML } from "./modules/components.js";
import { validator } from "./modules/validation.js";
import { checkAuthState } from "../services/authServices.js";

// Check auth state when page loads
checkAuthState();

document.addEventListener("DOMContentLoaded", () => {
  // Initialize components
  setLogoHTML();
  
  // Initialize real-time validation
  validator.setupRealTimeValidation();

  // Initialize events
  const registerBtn = document.getElementById("register");
  if (registerBtn) {
    registerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      register();
    });
  }

  // Add login button event listener
  // const loginBtn = document.querySelector('button[type="button"]');
  // if (loginBtn && loginBtn.textContent.trim() === "Login") {
  //   loginBtn.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     login();
  //   });
  // }
});
