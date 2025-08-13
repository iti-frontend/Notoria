import { register } from "./modules/authentication.js";
import { setLogoHTML } from "./modules/components.js";
import { validator } from "./modules/validation.js";

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
});
