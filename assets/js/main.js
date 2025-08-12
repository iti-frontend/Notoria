import { register } from "./authentication.js";

document.getElementById("register").addEventListener("click", (e) => {
  e.preventDefault();
  register();
});
