# Learning Hub - Full Stack Setup Guide

## Complete Setup (Frontend + Backend)

This guide will help you set up and run the complete Learning Hub application with both frontend and backend.

## Prerequisites

- **Node.js** - Download from [https://nodejs.org/](https://nodejs.org/) (LTS version)
- **Code Editor** - VS Code recommended
- **Terminal** - PowerShell (Windows) or Terminal (Mac/Linux)
- **Browser** - Chrome, Firefox, Safari, or Edge

## Project Structure

```
learning-hub/
├── frontend files (HTML, CSS, JS)
│   ├── index.html
│   ├── login.html
│   ├── home.html
│   ├── skills.html
│   ├── stories.html
│   ├── novels.html
│   ├── css/styles.css
│   ├── js/utils.js
│   ├── js/auth.js
│   └── js/api-client.js (NEW - connects to backend)
│
└── backend/ (NEW - Node.js API Server)
    ├── server.js
    ├── package.json
    ├── .env
    ├── middleware/auth.js
    ├── routes/auth.js
    ├── routes/content.js
    ├── models/db.js
    └── data/
        ├── users.json (auto-created)
        └── content.json (auto-created)
```

## Step-by-Step Setup

### STEP 1: Install Backend Dependencies

```bash
# Open terminal in the backend folder
cd "c:\Users\HP\OneDrive\learn hub\backend"

# Install all dependencies
npm install

# Wait for completion (should see: added XX packages)
```

Expected packages installed:
- express (web framework)
- cors (cross-origin)
- jsonwebtoken (JWT)
- bcryptjs (password hashing)
- dotenv (configuration)
- nodemon (auto-reload)

### STEP 2: Verify Configuration

Check that `backend/.env` exists with:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:8000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345678
JWT_EXPIRE=24h
```

### STEP 3: Start Backend Server

**Terminal 1 - Backend:**

```bash
cd "c:\Users\HP\OneDrive\learn hub\backend"

# Start development server
npm run dev

# Or use production mode
npm start
```

Expected output:
```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║          🎓 Learning Hub API Server Started 🚀            ║
║                                                            ║
║  Server is running on: http://localhost:5000              ║
║  Environment: development                                 ║
║  Frontend URL: http://localhost:8000                      ║
║                                                            ║
║  📚 API Documentation: http://localhost:5000/api          ║
║  ❤️  Health Check: http://localhost:5000/api/health       ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

### STEP 4: Start Frontend Server

**Terminal 2 - Frontend:**

```bash
cd "c:\Users\HP\OneDrive\learn hub"

# Using Python
python -m http.server 8000

# Or with Node.js
npx http-server

# Or with npm (if you add a script)
npm start
```

Expected output:
```
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/)
```

### STEP 5: Open in Browser

1. Open your browser
2. Go to: **http://localhost:8000**
3. You should see the Learning Hub splash screen
4. Application will auto-redirect to login page

## Testing the Setup

### Test 1: Create Account

1. Click "Sign up"
2. Enter:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
3. Click "Create Account"
4. Should see: ✅ "Registration successful! Please log in."

### Test 2: Login

1. Enter the credentials from Test 1
2. Click "Sign In"
3. Should see: ✅ "Login successful!"
4. Should redirect to home page with "Hi, testuser!" greeting

### Test 3: Browse Content

1. Click on "Skills" card
2. Click on "Programming" skill
3. Should see detailed content
4. Click back and try other sections

### Test 4: Session Persistence

1. Refresh the page
2. Should still be logged in (no redirect to login)
3. User data should be loaded from backend

### Test 5: Logout

1. Click "Logout" button (top-right)
2. Should redirect to login page
3. Refresh page
4. Should stay on login page (session cleared)

## API Testing

### Test Backend Health Check

```bash
# Open browser or terminal
curl http://localhost:5000/api/health

# Expected response:
{
  "success": true,
  "message": "Learning Hub API is running",
  "timestamp": "2024-04-13T...",
  "version": "1.0.0"
}
```

### Test Registration via API

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "apitest",
    "email": "api@example.com",
    "password": "test123456",
    "confirmPassword": "test123456"
  }'
```

### Test Login via API

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "apitest",
    "password": "test123456"
  }'
```

Should return token like:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {...}
}
```

## Browser Console Debugging

1. Open Developer Tools: **F12**
2. Go to **Console** tab
3. You'll see API calls being made

Example logs:
```javascript
// Successful login
[api-client.js] Login successful

// API call
[network] POST http://localhost:5000/api/auth/login

// Frontend shows
"Login successful!"
```

## File Changes Needed

The frontend automatically works with the backend because:

1. **index.html** - No changes needed (just redirects)
2. **login.html** - Uses API (already setup)
3. **home.html** - Uses API (already setup)
4. **js/api-client.js** - NEW file that handles all API calls
5. **js/auth.js** - Works with both localStorage and backend
6. **js/utils.js** - Navigation helpers (unchanged)

## Running in Different Modes

### Mode 1: Frontend Only (localStorage)

```bash
# Just open frontend
http://localhost:8000

# Uses browser localStorage (no backend needed)
```

### Mode 2: Frontend + Backend (API)

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd ..
python -m http.server 8000

# Open: http://localhost:8000
```

### Mode 3: Production

```bash
# Build
npm run build

# Deploy backend to server (Heroku, AWS, DigitalOcean)
# Deploy frontend build folder to CDN or hosting

# Configure API_URL for production
# In js/api-client.js, change:
# const API_URL = 'https://api.yourdomain.com/api';
```

## Troubleshooting

### Problem: "Cannot connect to backend"

**Solution:**
```bash
# 1. Check backend is running
curl http://localhost:5000/api/health

# 2. Check port is not in use
netstat -ano | findstr :5000

# 3. Check firewall (Windows Defender)
# Add Node.js to firewall whitelist
```

### Problem: "Registration fails with network error"

**Solution:**
```bash
# 1. Verify backend is running on port 5000
# 2. Check CORS is enabled in server.js
# 3. Check frontend URL in .env matches CLIENT_URL
# 4. Check console for exact error message (F12)
```

### Problem: "Token expired after refresh"

**Solution:**
- This is normal after 24 hours
- User needs to login again
- To extend: change JWT_EXPIRE in .env

### Problem: "Data not persisting"

**Solution:**
```bash
# 1. Check data folder exists
# backend/data/users.json
# backend/data/content.json

# 2. Check file permissions (read/write)
# 3. Check server console for errors
```

### Problem: "Page looks broken"

**Solution:**
```bash
# 1. Hard refresh browser
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)

# 2. Clear browser cache
# F12 → Application → Clear All

# 3. Check CSS file is loading
# F12 → Network → Look for styles.css
```

## Performance Tips

### Backend Performance

```javascript
// Add caching (in routes/content.js)
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // 10 minutes

app.get('/api/content/skills', (req, res) => {
  if (cache.has('skills')) {
    return res.json(cache.get('skills'));
  }
  // ... fetch from db
});
```

### Frontend Performance

```javascript
// Cache API responses (in api-client.js)
const responseCache = {};

async function getCachedSkills() {
  if (responseCache.skills) {
    return responseCache.skills;
  }
  const result = await apiGetAllSkills();
  responseCache.skills = result;
  return result;
}
```

## Security Considerations

### Current Development Setup

✅ Good for development and learning
⚠️ Not for production

### Before Production

```javascript
// 1. Change JWT secret
JWT_SECRET=generate-a-truly-random-secure-string-minimum-32-chars

// 2. Use HTTPS
CLIENT_URL=https://yourdomain.com

// 3. Add rate limiting
npm install express-rate-limit

// 4. Add input validation
npm install joi

// 5. Add security headers
npm install helmet

// 6. Use database (MongoDB/PostgreSQL)

// 7. Enable CORS properly
const allowedOrigins = [
  'https://yourdomain.com',
  'https://www.yourdomain.com'
];
```

## What's Next

### Add More Features

1. **User Progress Tracking**
   - Track which skills/stories user has read
   - Add bookmarks/favorites

2. **Search Functionality**
   - Search skills, stories, novels
   - Filter by category

3. **Comments System**
   - Users can comment on content
   - Reply to comments

4. **User Profiles**
   - Custom user bio
   - Profile picture
   - Statistics (skills learned, books read)

5. **Content Management**
   - Admin panel to add content
   - Edit existing content
   - Delete content

### Database Migration

Replace JSON files with MongoDB:

```javascript
// Install MongoDB driver
npm install mongoose

// Create schemas and models
// Update db.js to use MongoDB
// Change connection string in .env
```

### Deployment

Host on:
- **Backend**: Heroku, Railway, Render, AWS, DigitalOcean
- **Frontend**: Vercel, Netlify, GitHub Pages, AWS S3

## Useful Commands

```bash
# Backend
cd backend
npm install              # Install dependencies
npm run dev             # Development (with auto-reload)
npm start               # Production mode
npm test                # Run tests (if configured)

# Frontend
python -m http.server 8000    # Python server
npx http-server               # Node.js server
npx live-server 8000          # Live server with reload
```

## File Locations

- **Frontend**: `c:\Users\HP\OneDrive\learn hub\`
- **Backend**: `c:\Users\HP\OneDrive\learn hub\backend\`
- **User Data**: `c:\Users\HP\OneDrive\learn hub\backend\data\users.json`
- **Content Data**: `c:\Users\HP\OneDrive\learn hub\backend\data\content.json`

## Quick Reference

| Component | Port | URL | Command |
|-----------|------|-----|---------|
| Frontend | 8000 | http://localhost:8000 | `python -m http.server 8000` |
| Backend | 5000 | http://localhost:5000 | `npm run dev` |
| Backend API | 5000 | http://localhost:5000/api | Auto-started |
| Backend Health | 5000 | http://localhost:5000/api/health | Auto-started |

## Support

For issues:
1. Check browser console (F12)
2. Check terminal for errors
3. Check `.env` configuration
4. Refer to `BACKEND_SETUP.md` for detailed API docs
5. Check code comments

---

**You're all set! Happy coding! 🚀📚✨**
