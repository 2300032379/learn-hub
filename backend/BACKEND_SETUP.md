# Learning Hub Backend - Setup & Documentation

## Overview

The Learning Hub backend is a Node.js/Express API server that handles:
- User authentication (registration, login, verification)
- Content management (skills, stories, novels)
- JWT token-based security
- CORS support for cross-origin requests

## Technology Stack

- **Framework**: Express.js (fast, lightweight web framework)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs (secure password storage)
- **Storage**: JSON files (for simplicity; easily migratable to MongoDB/PostgreSQL)
- **Configuration**: dotenv (environment variables)
- **Development**: nodemon (auto-reload on changes)

## Project Structure

```
backend/
├── server.js                 # Main Express server
├── package.json              # Dependencies and scripts
├── .env                      # Environment configuration
├── middleware/
│   └── auth.js              # JWT verification & token generation
├── routes/
│   ├── auth.js              # Authentication endpoints
│   └── content.js           # Content endpoints (skills, stories, novels)
├── models/
│   └── db.js                # Database operations (JSON file-based)
└── data/
    ├── users.json           # User data (auto-created)
    └── content.json         # Content data (auto-created)
```

## Installation & Setup

### Step 1: Install Node.js
Download and install Node.js from [https://nodejs.org/](https://nodejs.org/)
(Choose LTS version for stability)

### Step 2: Install Backend Dependencies

```bash
# Navigate to backend folder
cd backend

# Install all dependencies
npm install

# Or with yarn
yarn install
```

This installs:
- `express` - Web framework
- `cors` - Cross-origin requests
- `jsonwebtoken` - JWT handling
- `bcryptjs` - Password hashing
- `dotenv` - Environment variables
- `nodemon` - Auto-reload (devDependency)

### Step 3: Configure Environment

Files are already created, but you can customize `.env`:

```env
PORT=5000                          # Server port
NODE_ENV=development               # Environment
CLIENT_URL=http://localhost:8000   # Frontend URL
JWT_SECRET=your_super_secret...    # Change in production!
JWT_EXPIRE=24h                     # Token expiration
```

### Step 4: Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
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

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. **Register User**
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "User created successfully. Please log in.",
  "user": {
    "id": "1712973015234",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "User already exists"
}
```

#### 2. **Login User**
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1712973015234",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

#### 3. **Verify Token**
```http
POST /api/auth/verify
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (Valid):**
```json
{
  "success": true,
  "message": "Token is valid.",
  "user": {
    "userId": "1712973015234",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

#### 4. **Get User Profile**
```http
GET /api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "1712973015234",
    "username": "john_doe",
    "email": "john@example.com",
    "createdAt": "2024-04-13T10:30:15.234Z"
  }
}
```

#### 5. **Logout**
```http
POST /api/auth/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful. Please clear your token on the client."
}
```

### Content Endpoints

#### 1. **Get All Skills**
```http
GET /api/content/skills
```

#### 2. **Get Specific Skill**
```http
GET /api/content/skills/skill-1
```

#### 3. **Get All Stories**
```http
GET /api/content/stories
```

#### 4. **Get Specific Story**
```http
GET /api/content/stories/story-1
```

#### 5. **Get All Novels**
```http
GET /api/content/novels
```

#### 6. **Get Specific Novel**
```http
GET /api/content/novels/novel-1
```

#### 7. **Get All Content**
```http
GET /api/content/all
```

## Authentication Flow

```
1. User Registration
   ├─ POST /api/auth/register
   └─ User data stored (password hashed with bcryptjs)

2. User Login
   ├─ POST /api/auth/login
   ├─ Credentials verified
   ├─ JWT token generated (24-hour expiration)
   └─ Token sent to client

3. Protected Requests
   ├─ Client includes token in Authorization header
   ├─ Backend verifies token with JWT
   └─ Request processed if valid

4. Token Refresh
   ├─ Client can verify token with POST /api/auth/verify
   └─ If expired, user must login again

5. Logout
   ├─ Client removes token from localStorage
   └─ Backend logs out (token becomes invalid)
```

## JWT Token Structure

Token includes:
```json
{
  "userId": "user_id",
  "username": "username",
  "email": "user@example.com",
  "iat": 1712973015,
  "exp": 1713059415
}
```

## Data Storage

### Users File (backend/data/users.json)
```json
[
  {
    "id": "1712973015234",
    "username": "john_doe",
    "email": "john@example.com",
    "password": "$2a$10$hashed_password...",
    "createdAt": "2024-04-13T10:30:15.234Z"
  }
]
```

### Content File (backend/data/content.json)
```json
{
  "skills": [
    {
      "id": "skill-1",
      "title": "Programming",
      "icon": "💻",
      "description": "...",
      "lessons": 4,
      "level": "Beginner to Advanced",
      "content": "<html>..."
    }
  ],
  "stories": [...],
  "novels": [...]
}
```

## CORS Configuration

The backend accepts requests from:
```
http://localhost:8000 (default frontend)
```

To change, edit `server.js` or `.env`:
```javascript
CLIENT_URL = 'http://your-frontend-url'
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad request
- `401` - Unauthorized
- `404` - Not found
- `500` - Server error

## Testing the API

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"123456","confirmPassword":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"123456"}'

# Get all skills
curl http://localhost:5000/api/content/skills
```

### Using Postman

1. Open Postman
2. Create new request
3. Set method (POST, GET, etc.)
4. Set URL (e.g., http://localhost:5000/api/auth/login)
5. Add headers: `Content-Type: application/json`
6. For auth endpoints, add: `Authorization: Bearer <token>`
7. Add body (JSON) for POST requests
8. Click Send

### Using Frontend API Client

See `js/api-client.js` for JavaScript functions:

```javascript
// Register
const result = await apiRegister('john', 'john@example.com', 'pass123', 'pass123');

// Login
const loginResult = await apiLogin('john', 'pass123', true);

// Get skills
const skills = await apiGetAllSkills();
```

## Production Deployment

### Before Going Live:

1. **Change JWT Secret**
   ```env
   JWT_SECRET=use-a-very-long-random-secure-string-minimum-32-characters
   ```

2. **Set Node Environment**
   ```env
   NODE_ENV=production
   ```

3. **Use Database**
   - Replace JSON files with MongoDB or PostgreSQL
   - Update `models/db.js`

4. **Add Rate Limiting**
   - Install `express-rate-limit`
   - Prevent brute force attacks

5. **Enable HTTPS**
   - Use SSL/TLS certificates
   - Redirect HTTP to HTTPS

6. **Environment Variables**
   - Never commit `.env` to git
   - Use `.env.example` as template
   - Set environment variables in hosting platform

7. **Security Headers**
   - Add `helmet` package for security headers

8. **Input Validation**
   - Add `joi` or `yup` for data validation

Example production `.env`:
```env
PORT=80
NODE_ENV=production
CLIENT_URL=https://yourdomain.com
JWT_SECRET=your-very-secure-random-string
JWT_EXPIRE=7d
DB_HOST=mongo-server-ip
DB_PORT=27017
DB_NAME=learning_hub_prod
DB_USER=db_user
DB_PASSWORD=secure_password
```

## Troubleshooting

### Port Already in Use
```bash
# Windows: Change PORT in .env
PORT=5001

# Or kill the process using port 5000
# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### CORS Errors
- Check `CLIENT_URL` in `.env`
- Ensure frontend and backend URLs match CORS config

### Token Expired
- Token expires after 24 hours (default)
- User must login again to get new token

### Database Errors
- Check `data/` folder exists
- Ensure proper read/write permissions
- Check JSON file syntax

## Migration to MongoDB

To use MongoDB instead of JSON files:

1. Install mongoose:
   ```bash
   npm install mongoose
   ```

2. Create models:
   ```javascript
   // models/User.js
   const userSchema = new mongoose.Schema({
     username: String,
     email: String,
     password: String,
     createdAt: { type: Date, default: Date.now }
   });

   // models/Content.js
   const contentSchema = new mongoose.Schema({...});
   ```

3. Update database operations in `models/db.js`

4. Configure MongoDB connection in `.env`

## Support & Documentation

- [Express.js Documentation](https://expressjs.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [bcryptjs Documentation](https://github.com/dcodeIO/bcrypt.js)
- [CORS Explanation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## Next Steps

1. ✅ Start the backend server (`npm run dev`)
2. ✅ Test API endpoints (use Postman or curl)
3. ✅ Verify frontend connects correctly
4. ✅ Add more content to `backend/data/content.json`
5. ✅ Customize according to your needs

---

**Happy coding! 🚀**
