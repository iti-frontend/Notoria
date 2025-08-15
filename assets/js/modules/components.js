// logo
export function setLogoHTML() {
  const logo = document.getElementById("logo");
  if (!logo) {
    return;
  }
  logo.innerHTML = `<svg class="w-100 h-100" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Gradients -->
    <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ff66c4"/>
      <stop offset="100%" style="stop-color:#9c27b0"/>
    </linearGradient>
    
    <linearGradient id="noteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff"/>
      <stop offset="100%" style="stop-color:#f8f9fa"/>
    </linearGradient>
    
    <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a0033;stop-opacity:0.3"/>
      <stop offset="100%" style="stop-color:#1a0033;stop-opacity:0"/>
    </linearGradient>
    
    <!-- Filters -->
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
      <feOffset dx="2" dy="4" result="offset"/>
      <feFlood flood-color="#1a0033" flood-opacity="0.3"/>
      <feComposite in2="offset" operator="in"/>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Background Circle -->
  <circle cx="60" cy="60" r="55" fill="url(#primaryGradient)" filter="url(#shadow)"/>
  
  <!-- Note Pages Stack -->
  <!-- Back page -->
  <rect x="25" y="35" width="50" height="60" rx="4" ry="4" 
        fill="#e4a5d1" opacity="0.6" transform="rotate(-3 50 65)"/>
  
  <!-- Middle page -->
  <rect x="28" y="32" width="50" height="60" rx="4" ry="4" 
        fill="#f0d0e8" opacity="0.8" transform="rotate(2 53 62)"/>
  
  <!-- Front page -->
  <rect x="30" y="30" width="50" height="60" rx="4" ry="4" 
        fill="url(#noteGradient)" stroke="url(#primaryGradient)" stroke-width="1"/>
  
  <!-- Note Lines -->
  <line x1="35" y1="40" x2="70" y2="40" stroke="#ff66c4" stroke-width="1" opacity="0.6"/>
  <line x1="35" y1="45" x2="75" y2="45" stroke="#ff66c4" stroke-width="1" opacity="0.4"/>
  <line x1="35" y1="50" x2="65" y2="50" stroke="#ff66c4" stroke-width="1" opacity="0.6"/>
  <line x1="35" y1="55" x2="72" y2="55" stroke="#ff66c4" stroke-width="1" opacity="0.4"/>
  
  <!-- Pen/Pencil -->
  <g transform="translate(65, 65) rotate(45)">
    <!-- Pen body -->
    <rect x="-1" y="-12" width="2" height="20" rx="1" fill="url(#primaryGradient)"/>
    <!-- Pen tip -->
    <polygon points="-1,8 1,8 0,12" fill="#1a0033"/>
    <!-- Pen clip -->
    <rect x="-0.5" y="-10" width="1" height="4" rx="0.5" fill="#ffffff" opacity="0.8"/>
  </g>
  
  <!-- Decorative Elements -->
  <!-- Small dots around the logo -->
  <circle cx="20" cy="25" r="2" fill="#ff66c4" opacity="0.6">
    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="95" cy="35" r="1.5" fill="#9c27b0" opacity="0.8">
    <animate attributeName="opacity" values="0.8;0.4;0.8" dur="3s" repeatCount="indefinite"/>
  </circle>
  <circle cx="15" cy="85" r="1" fill="#ff66c4" opacity="0.7">
    <animate attributeName="opacity" values="0.7;1;0.7" dur="2.5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="100" cy="90" r="2" fill="#9c27b0" opacity="0.5">
    <animate attributeName="opacity" values="0.5;0.9;0.5" dur="4s" repeatCount="indefinite"/>
  </circle>
  
  <!-- Letter "N" integration -->
  <path d="M 40 70 L 40 80 L 45 75 L 45 80 L 47 80 L 47 70 L 42 75 L 42 70 Z" 
        fill="url(#primaryGradient)" opacity="0.8"/>
</svg>`;
}

// toast
export function showToast(message, type = "danger", delay = 3000) {
  let ToastContainer = document.querySelector(".toast-container");
  if (!ToastContainer) {
    ToastContainer = document.createElement("div");
    ToastContainer.className =
      "toast-container position-fixed bottom-0 end-0 p-3";
    document.body.appendChild(ToastContainer);
  }

  const toastContent = `<div class="toast align-items-center text-bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>`;

  ToastContainer.insertAdjacentHTML("beforeend", toastContent);

  const toastEl = ToastContainer.lastElementChild;
  const toast = new bootstrap.Toast(toastEl, { delay });

  toast.show();

  toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
}
