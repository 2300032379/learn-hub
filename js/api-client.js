// Learning Hub - API Client Module (uses backend)
// Updated to work with Node.js/Express backend

const API_URL = 'http://localhost:5000/api'; // Backend URL

// ===== TOKEN MANAGEMENT =====
function setAuthToken(token) {
  if (token) {
    localStorage.setItem('authToken', token);
  }
}

function getAuthToken() {
  return localStorage.getItem('authToken');
}

function clearAuthToken() {
  localStorage.removeItem('authToken');
}

// ===== API HEADERS =====
function getHeaders(includeAuth = true) {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
}

// ===== AUTHENTICATION API CALLS =====

async function apiRegister(username, email, password, confirmPassword) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ username, email, password, confirmPassword })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Registration failed'
      };
    }

    return {
      success: true,
      message: data.message,
      user: data.user
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection.'
    };
  }
}

async function apiLogin(username, password, rememberMe = false) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Login failed'
      };
    }

    // Save token
    setAuthToken(data.token);

    // Save user info
    localStorage.setItem('currentUser', JSON.stringify({
      id: data.user.id,
      username: data.user.username,
      email: data.user.email,
      loginTime: new Date().toISOString()
    }));

    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    }

    return {
      success: true,
      message: data.message,
      token: data.token,
      user: data.user
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection.'
    };
  }
}

async function apiLogout() {
  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: getHeaders(true)
    });
  } catch (error) {
    console.error('Logout error:', error);
  }

  // Clear local storage
  clearAuthToken();
  localStorage.removeItem('currentUser');
  localStorage.removeItem('rememberMe');
}

async function apiVerifyToken() {
  try {
    const response = await fetch(`${API_URL}/auth/verify`, {
      method: 'POST',
      headers: getHeaders(true)
    });

    return response.ok;
  } catch (error) {
    console.error('Token verification error:', error);
    return false;
  }
}

async function apiGetProfile() {
  try {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'GET',
      headers: getHeaders(true)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch profile');
    }

    return {
      success: true,
      user: data.user
    };
  } catch (error) {
    console.error('Get profile error:', error);
    return {
      success: false,
      message: error.message
    };
  }
}

// ===== CONTENT API CALLS =====

async function apiGetAllSkills() {
  try {
    const response = await fetch(`${API_URL}/content/skills`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch skills');
    }

    return {
      success: true,
      data: data.data
    };
  } catch (error) {
    console.error('Get skills error:', error);
    return {
      success: false,
      data: [],
      message: error.message
    };
  }
}

async function apiGetSkill(id) {
  try {
    const response = await fetch(`${API_URL}/content/skills/${id}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch skill');
    }

    return {
      success: true,
      data: data.data
    };
  } catch (error) {
    console.error('Get skill error:', error);
    return {
      success: false,
      message: error.message
    };
  }
}

async function apiGetAllStories() {
  try {
    const response = await fetch(`${API_URL}/content/stories`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch stories');
    }

    return {
      success: true,
      data: data.data
    };
  } catch (error) {
    console.error('Get stories error:', error);
    return {
      success: false,
      data: [],
      message: error.message
    };
  }
}

async function apiGetStory(id) {
  try {
    const response = await fetch(`${API_URL}/content/stories/${id}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch story');
    }

    return {
      success: true,
      data: data.data
    };
  } catch (error) {
    console.error('Get story error:', error);
    return {
      success: false,
      message: error.message
    };
  }
}

async function apiGetAllNovels() {
  try {
    const response = await fetch(`${API_URL}/content/novels`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch novels');
    }

    return {
      success: true,
      data: data.data
    };
  } catch (error) {
    console.error('Get novels error:', error);
    return {
      success: false,
      data: [],
      message: error.message
    };
  }
}

async function apiGetNovel(id) {
  try {
    const response = await fetch(`${API_URL}/content/novels/${id}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch novel');
    }

    return {
      success: true,
      data: data.data
    };
  } catch (error) {
    console.error('Get novel error:', error);
    return {
      success: false,
      message: error.message
    };
  }
}

// ===== UTILITY =====

async function checkBackendStatus() {
  try {
    const response = await fetch(`${API_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('Backend status check failed:', error);
    return false;
  }
}
