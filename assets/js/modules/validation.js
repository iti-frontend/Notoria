// Validation module for form inputs using MDB

export class FormValidator {
  constructor() {
    this.errors = {};
  }

  // Clear all validation errors
  clearErrors() {
    this.errors = {};
  }

  // Add error for a specific field
  addError(fieldName, message) {
    this.errors[fieldName] = message;
  }

  // Check if there are any errors
  hasErrors() {
    return Object.keys(this.errors).length > 0;
  }

  // Get errors object
  getErrors() {
    return this.errors;
  }

  // Username validation
  validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    
    if (!username || username.trim() === '') {
      this.addError('username', 'Username is required');
      return false;
    }
    
    if (username.length < 3) {
      this.addError('username', 'Username must be at least 3 characters long');
      return false;
    }
    
    if (username.length > 20) {
      this.addError('username', 'Username must be less than 20 characters');
      return false;
    }
    
    if (!usernameRegex.test(username)) {
      this.addError('username', 'Username can only contain letters, numbers, and underscores');
      return false;
    }
    
    return true;
  }

  // Email validation
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || email.trim() === '') {
      this.addError('email', 'Email is required');
      return false;
    }
    
    if (!emailRegex.test(email)) {
      this.addError('email', 'Please enter a valid email address');
      return false;
    }
    
    return true;
  }

  // Password validation
  validatePassword(password) {
    if (!password || password.trim() === '') {
      this.addError('password', 'Password is required');
      return false;
    }
    
    if (password.length < 8) {
      this.addError('password', 'Password must be at least 8 characters long');
      return false;
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
      this.addError('password', 'Password must contain at least one lowercase letter');
      return false;
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
      this.addError('password', 'Password must contain at least one uppercase letter');
      return false;
    }
    
    if (!/(?=.*\d)/.test(password)) {
      this.addError('password', 'Password must contain at least one number');
      return false;
    }
    
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      this.addError('password', 'Password must contain at least one special character (@$!%*?&)');
      return false;
    }
    
    return true;
  }

  // Confirm password validation
  validatePasswordConfirmation(password, confirmPassword) {
    if (!confirmPassword || confirmPassword.trim() === '') {
      this.addError('rePassword', 'Please confirm your password');
      return false;
    }
    
    if (password !== confirmPassword) {
      this.addError('rePassword', 'Passwords do not match');
      return false;
    }
    
    return true;
  }

  // Phone validation
  validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    
    if (!phone || phone.trim() === '') {
      this.addError('phone', 'Phone number is required');
      return false;
    }
    
    // Remove spaces and dashes for validation
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    
    if (cleanPhone.length < 10) {
      this.addError('phone', 'Phone number must be at least 10 digits long');
      return false;
    }
    
    if (!phoneRegex.test(cleanPhone)) {
      this.addError('phone', 'Please enter a valid phone number');
      return false;
    }
    
    return true;
  }

  // Validate all registration form fields
  validateRegistrationForm(formData) {
    this.clearErrors();
    
    const { username, email, password, rePassword, phone } = formData;
    
    const isUsernameValid = this.validateUsername(username);
    const isEmailValid = this.validateEmail(email);
    const isPasswordValid = this.validatePassword(password);
    const isPasswordConfirmValid = this.validatePasswordConfirmation(password, rePassword);
    const isPhoneValid = this.validatePhone(phone);
    
    return isUsernameValid && isEmailValid && isPasswordValid && isPasswordConfirmValid && isPhoneValid;
  }

  // Display validation errors in the UI
  displayValidationErrors() {
    // Clear previous error states
    this.clearFieldErrors(['userNameInput', 'emailInput', 'passwordInput', 'rePasswordInput', 'phoneInput']);
    
    // Display errors for each field
    Object.keys(this.errors).forEach(fieldName => {
      this.showFieldError(fieldName, this.errors[fieldName]);
    });
  }

  // Clear field errors
  clearFieldErrors(fieldIds) {
    fieldIds.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      const feedback = document.getElementById(`${fieldId}Feedback`);
      
      if (field) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
      }
      
      if (feedback) {
        feedback.textContent = '';
        feedback.style.display = 'none';
      }
    });
  }

  // Show field error
  showFieldError(fieldName, message) {
    const fieldMap = {
      'username': 'userNameInput',
      'email': 'emailInput',
      'password': 'passwordInput',
      'rePassword': 'rePasswordInput',
      'phone': 'phoneInput'
    };
    
    const fieldId = fieldMap[fieldName];
    const field = document.getElementById(fieldId);
    const feedback = document.getElementById(`${fieldId}Feedback`);
    
    if (field) {
      field.classList.remove('is-valid');
      field.classList.add('is-invalid');
    }
    
    if (feedback) {
      feedback.textContent = message;
      feedback.style.display = 'block';
    }
  }

  // Show field success
  showFieldSuccess(fieldId) {
    const field = document.getElementById(fieldId);
    const feedback = document.getElementById(`${fieldId}Feedback`);
    
    if (field) {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
    }
    
    if (feedback) {
      feedback.textContent = '';
      feedback.style.display = 'none';
    }
  }

  // Real-time validation for individual fields
  setupRealTimeValidation() {
    const fields = [
      { id: 'userNameInput', validator: 'validateUsername' },
      { id: 'emailInput', validator: 'validateEmail' },
      { id: 'passwordInput', validator: 'validatePassword' },
      { id: 'rePasswordInput', validator: 'validatePasswordConfirmation' },
      { id: 'phoneInput', validator: 'validatePhone' }
    ];
    
    fields.forEach(({ id, validator }) => {
      const field = document.getElementById(id);
      if (field) {
        field.addEventListener('blur', () => {
          this.validateSingleField(id, validator);
        });
        
        field.addEventListener('input', () => {
          // Remove error state on input
          field.classList.remove('is-invalid');
          const feedback = document.getElementById(`${id}Feedback`);
          if (feedback) {
            feedback.style.display = 'none';
          }
        });
      }
    });
  }

  // Validate single field
  validateSingleField(fieldId, validatorMethod) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    const value = field.value;
    const fieldMap = {
      'userNameInput': 'username',
      'emailInput': 'email', 
      'passwordInput': 'password',
      'rePasswordInput': 'rePassword',
      'phoneInput': 'phone'
    };
    
    const fieldName = fieldMap[fieldId];
    
    // Clear previous error for this field
    delete this.errors[fieldName];
    
    let isValid = false;
    
    switch (validatorMethod) {
      case 'validateUsername':
        isValid = this.validateUsername(value);
        break;
      case 'validateEmail':
        isValid = this.validateEmail(value);
        break;
      case 'validatePassword':
        isValid = this.validatePassword(value);
        break;
      case 'validatePasswordConfirmation':
        const password = document.getElementById('passwordInput').value;
        isValid = this.validatePasswordConfirmation(password, value);
        break;
      case 'validatePhone':
        isValid = this.validatePhone(value);
        break;
    }
    
    if (isValid) {
      this.showFieldSuccess(fieldId);
    } else {
      this.showFieldError(fieldName, this.errors[fieldName]);
    }
  }
}

// Export singleton instance
export const validator = new FormValidator();
