"use strict";

export class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.inputs = this.form.querySelectorAll("input");
    this.errors = {};
    this.setup();
  }

  setup() {
    this.inputs.forEach((input) => {
      input.addEventListener("input", () => this.validateField(input));
      input.addEventListener("blur", () => this.validateField(input));
    });
  }

  getRules(input) {
    switch (input.id) {
      case "emailInput":
        return [
          { test: (v) => v.length > 0, message: "Email is required" },
          {
            test: (v) => /\S+@\S+\.\S+/.test(v),
            message: "Invalid email format",
          },
        ];
      case "passwordInput":
        return [
          {
            test: (v) => v.length >= 6,
            message: "Password must be 6+ characters",
          },
        ];
      case "rePasswordInput":
        return [
          {
            test: (v) => v === this.form.querySelector("#passwordInput").value,
            message: "Passwords do not match",
          },
        ];
      case "userNameInput":
        return [
          { test: (v) => v.length > 0, message: "Username is required" },
          {
            test: (v) => v.length > 3,
            message: "Username is must be greater than 3 char.",
          },
        ];
      case "phoneInput":
        return [
          {
            test: (v) => /^\d{11}$/.test(v),
            message: "Phone must be 11 digits",
          },
        ];
      default:
        return [];
    }
  }

  validateField(input) {
    const feedbackEl = input.parentElement.querySelector(".invalid-feedback");
    const value = input.value.trim();
    const rules = this.getRules(input);

    let errorMsg = "";
    for (const rule of rules) {
      if (!rule.test(value)) {
        errorMsg = rule.message;
        break;
      }
    }

    if (errorMsg) {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      if (feedbackEl) feedbackEl.textContent = errorMsg;
      this.errors[input.id] = errorMsg;
      return false;
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      if (feedbackEl) feedbackEl.textContent = "";
      delete this.errors[input.id];
      return true;
    }
  }

  validateForm() {
    let isValid = true;
    this.inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    return isValid;
  }

  clearErrors() {
    this.errors = {};
    this.inputs.forEach((input) => {
      input.classList.remove("is-invalid", "is-valid");
      const feedbackEl = input.parentElement.querySelector(".invalid-feedback");
      if (feedbackEl) feedbackEl.textContent = "";
    });
  }

  clearForm() {
    this.inputs.forEach((input) => {
      input.value = "";
    });
    this.clearErrors();
  }
}
