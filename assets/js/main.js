import { register } from "./modules/authentication.js";
import { setLogoHTML } from "./modules/components.js";

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
});
