// Learning Hub - Utility Functions

// ===== NAVIGATION =====
function goToPage(pageId) {
  // Hide all pages
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));

  // Show the target page
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
    window.scrollTo(0, 0);
  }
}

function goBack() {
  window.history.back();
}

// ===== REDIRECT TO HOME =====
function goToHome() {
  window.location.href = 'home.html';
}

// ===== REDIRECT TO LOGIN =====
function goToLogin() {
  window.location.href = 'login.html';
}

// ===== REDIRECT TO SPECIFIC PAGE =====
function navigateTo(page) {
  window.location.href = page;
}

// ===== SHOW/HIDE ELEMENTS =====
function showElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.remove('hidden');
    element.classList.add('visible');
  }
}

function hideElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.add('hidden');
    element.classList.remove('visible');
  }
}

function toggleElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.toggle('hidden');
    element.classList.toggle('visible');
  }
}

// ===== SET MESSAGE (SUCCESS/ERROR) =====
function showMessage(message, type = 'info') {
  let messageElement = document.getElementById('message-box');

  if (!messageElement) {
    messageElement = document.createElement('div');
    messageElement.id = 'message-box';
    messageElement.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      padding: 1rem;
      border-radius: 8px;
      z-index: 1000;
      animation: slideDown 0.3s ease-out;
      max-width: 400px;
    `;
    document.body.appendChild(messageElement);
  }

  messageElement.textContent = message;
  messageElement.style.backgroundColor = type === 'success' ? '#c8e6c9' : type === 'error' ? '#ffcdd2' : '#e3f2fd';
  messageElement.style.color = type === 'success' ? '#2e7d32' : type === 'error' ? '#c62828' : '#1565c0';
  messageElement.style.display = 'block';

  setTimeout(() => {
    messageElement.style.display = 'none';
  }, 3000);
}

// ===== SHOW LOADING STATE =====
function showLoading(buttonElement) {
  if (buttonElement) {
    buttonElement.disabled = true;
    buttonElement.innerHTML = '<span style="opacity: 0.6;">Processing...</span>';
  }
}

function hideLoading(buttonElement, originalText) {
  if (buttonElement) {
    buttonElement.disabled = false;
    buttonElement.innerHTML = originalText;
  }
}

// ===== FORMAT DATE =====
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// ===== FORMAT TIME SINCE =====
function timeSince(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  
  return Math.floor(seconds) + ' seconds ago';
}

// ===== SCROLL TO ELEMENT =====
function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// ===== DEBOUNCE FUNCTION =====
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// ===== VALIDATE EMAIL =====
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// ===== COPY TO CLIPBOARD =====
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showMessage('Copied to clipboard!', 'success');
  }).catch(() => {
    showMessage('Failed to copy', 'error');
  });
}

// ===== LOCAL STORAGE HELPERS =====
function getFromLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function removeFromLocalStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}
