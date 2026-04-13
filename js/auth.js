// Learning Hub - Authentication Module

// ===== CHECK IF USER IS LOGGED IN (ON PAGE LOAD) =====
function checkUserLogin() {
  const loggedInUser = localStorage.getItem('currentUser');
  if (!loggedInUser && !isLoginPage() && !isSplashPage()) {
    window.location.href = 'login.html';
  }
}

function isSplashPage() {
  return window.location.pathname.includes('index.html') || 
         window.location.pathname.endsWith('/');
}

function isLoginPage() {
  return window.location.pathname.includes('login.html');
}

// ===== USER REGISTRATION =====
function registerUser(username, email, password, confirmPassword) {
  // Validation
  if (!username || !email || !password || !confirmPassword) {
    return {
      success: false,
      message: 'All fields are required.'
    };
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      message: 'Passwords do not match.'
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      message: 'Password must be at least 6 characters long.'
    };
  }

  // Check if username already exists
  const users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(u => u.username === username || u.email === email)) {
    return {
      success: false,
      message: 'Username or email already exists.'
    };
  }

  // Add new user
  const newUser = {
    id: Date.now(),
    username: username,
    email: email,
    password: password, // Note: In production, use bcrypt or similar
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  return {
    success: true,
    message: 'Registration successful! Please log in.'
  };
}

// ===== USER LOGIN =====
function loginUser(username, password, rememberMe = false) {
  // Validation
  if (!username || !password) {
    return {
      success: false,
      message: 'Username and password are required.'
    };
  }

  // Find user
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => (u.username === username || u.email === username) && u.password === password);

  if (!user) {
    return {
      success: false,
      message: 'Invalid username or password.'
    };
  }

  // Create session token
  const token = generateToken();
  localStorage.setItem('currentUser', JSON.stringify({
    id: user.id,
    username: user.username,
    email: user.email,
    token: token,
    loginTime: new Date().toISOString()
  }));

  if (rememberMe) {
    localStorage.setItem('rememberMe', 'true');
  }

  return {
    success: true,
    message: 'Login successful!'
  };
}

// ===== USER LOGOUT =====
function logoutUser() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('rememberMe');
  window.location.href = 'login.html';
}

// ===== GET CURRENT USER =====
function getCurrentUser() {
  const userString = localStorage.getItem('currentUser');
  return userString ? JSON.parse(userString) : null;
}

// ===== GET CURRENT USER'S USERNAME =====
function getCurrentUsername() {
  const user = getCurrentUser();
  return user ? user.username : null;
}

// ===== GENERATE TOKEN =====
function generateToken() {
  return 'token_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

// ===== VALIDATE SESSION =====
function validateSession() {
  const user = getCurrentUser();
  if (!user) {
    return false;
  }

  const loginTime = new Date(user.loginTime).getTime();
  const currentTime = new Date().getTime();
  const sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours

  if (currentTime - loginTime > sessionTimeout) {
    logoutUser();
    return false;
  }

  return true;
}

// Check user login on page load
window.addEventListener('DOMContentLoaded', checkUserLogin);
