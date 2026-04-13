# Backend Quick Reference

## What Each File Does

### 📁 Root Files

#### `server.js` (Main Entry Point)
- The main Express server file
- Sets up all routes and middleware
- Starts the server on port 5000
- Handles CORS for frontend communication
- Provides API documentation at `/api`

Run with: `npm run dev` or `npm start`

#### `package.json` (Dependencies)
- Lists all Node.js packages needed
- Defines scripts: `npm start` and `npm run dev`
- Contains version and description

### 📁 middleware/ - Request Processing

#### `auth.js` (JWT Authentication)
Contains two functions:
- `verifyToken()` - Checks if request has valid JWT token
- `generateToken()` - Creates new JWT token for user

Used on protected routes (like `/api/auth/profile`)

### 📁 routes/ - API Endpoints

#### `auth.js` (User Authentication)
Endpoints:
- `POST /register` - Create new account
- `POST /login` - Login user, get JWT token
- `GET /profile` - Get logged-in user info
- `POST /logout` - Logout (token invalidated)
- `POST /verify` - Check if token is valid

#### `content.js` (Learning Content)
Endpoints:
- `GET /skills` - All skills
- `GET /skills/:id` - Specific skill
- `GET /stories` - All stories
- `GET /stories/:id` - Specific story
- `GET /novels` - All novels
- `GET /novels/:id` - Specific novel
- `GET /all` - Everything

### 📁 models/ - Database

#### `db.js` (Data Storage)
Contains functions:
- `getAllUsers()` - Read all users from users.json
- `findUser()` - Find user by username or email
- `createUser()` - Register new user
- `verifyPassword()` - Check password with bcrypt
- `getAllContent()` - Read all content
- `initializeContent()` - Set up default content

Currently uses JSON files (can be upgraded to MongoDB)

### 📁 data/ - Data Files (Auto-created)

#### `users.json` (User Accounts)
Stores:
- User ID (timestamp)
- Username (unique)
- Email (unique)
- Hashed password (bcryptjs)
- Creation date

#### `content.json` (Learning Content)
Stores:
- Skills array
- Stories array
- Novels array

### 📁 Config Files

#### `.env` (Environment Variables)
Settings for the server:
- `PORT` - Which port to run on (5000)
- `JWT_SECRET` - Secret key for tokens
- `CLIENT_URL` - Frontend URL (for CORS)
- `NODE_ENV` - development or production

#### `.gitignore` (Git Settings)
Tell Git what NOT to include:
- `node_modules/` - Dependencies folder
- `.env` - Sensitive info
- `*.log` - Log files

## Request Flow

### Register New User

```
Browser
  ↓
POST /api/auth/register
  ↓
server.js routes authRoutes
  ↓
routes/auth.js (register function)
  ↓
models/db.js (createUser)
  ↓
Hash password with bcryptjs
  ↓
Save to data/users.json
  ↓
Response → Browser
```

### Login User

```
Browser (with username + password)
  ↓
POST /api/auth/login
  ↓
routes/auth.js (login function)
  ↓
models/db.js (findUser + verifyPassword)
  ↓
Password match? ✓
  ↓
middleware/auth.js (generateToken)
  ↓
JWT token created
  ↓
Token sent to Browser
```

### Get Protected Resource

```
Browser (with JWT token in header)
  ↓
GET /api/auth/profile
  ↓
middleware/auth.js (verifyToken)
  ↓
Token valid? ✓
  ↓
routes/auth.js (profile function)
  ↓
User data retrieved
  ↓
Response → Browser
```

### Get Public Content

```
Browser
  ↓
GET /api/content/skills
  ↓
routes/content.js (no auth needed)
  ↓
models/db.js (getAllContent)
  ↓
Read from data/content.json
  ↓
Skills sent to Browser
```

## Authentication Explained

### Without Backend (Frontend Only)
- User data stored in browser localStorage
- Not secure for production
- No server-side validation

### With Backend (What We Have)

**JWT Token System:**
1. User logs in
2. Backend verifies password
3. Backend creates JWT token (24-hour expiration)
4. Token sent to browser
5. Browser stores token
6. For each request, browser sends token in header
7. Backend verifies token before processing request

**Benefits:**
✓ Secure server-side storage
✓ Passwords hashed with bcryptjs
✓ Token authentication instead of passing credentials
✓ Can logout by invalidating token
✓ Can track sessions per user

## Adding New Content

### Add a Skill

Edit `models/db.js` → `initializeContent()`:

```javascript
{
  id: 'skill-4',
  title: 'Web Design',
  icon: '🎨',
  description: 'Learn UI/UX and design principles',
  lessons: 3,
  level: 'All Levels',
  content: '<p>Your content here</p>'
}
```

### Add a Story

Same location, add to `stories` array:

```javascript
{
  id: 'story-7',
  title: 'New Story',
  icon: '📖',
  description: '...',
  meta: 'Author • Time',
  genre: 'Fiction',
  content: '<p>Story text here</p>'
}
```

Restart server for changes to take effect.

## Testing

### Test with cURL (Terminal)

```bash
# Check if server is running
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"t@t.com","password":"123456","confirmPassword":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"123456"}'

# Get skills
curl http://localhost:5000/api/content/skills
```

### Test with Browser

Open in browser:
- Health check: http://localhost:5000/api/health
- API docs: http://localhost:5000/api
- Skills: http://localhost:5000/api/content/skills

### Test with Postman

1. Download Postman
2. Create request
3. Set URL and method
4. Add headers if needed
5. Click Send

## Debugging

### Check Server Logs

Look at terminal where `npm run dev` is running:
```
[timestamp] POST /api/auth/login
[timestamp] GET /api/content/skills
```

### Check Frontend Console

Press F12 in browser:
- Console tab shows API calls
- Network tab shows request/response
- Storage tab shows tokens

### Check Data Files

Look at:
- `backend/data/users.json` - See registered users
- `backend/data/content.json` - See all content

### Common Issues

| Issue | Solution |
|-------|----------|
| Port 5000 in use | Change PORT in .env |
| CORS errors | Check CLIENT_URL in .env |
| Token errors | Restart server, login again |
| Password wrong | Check password was hashed correctly |
| Content missing | Check data/content.json file exists |
| npm install fails | Delete node_modules, run npm install again |

## Performance

### Current Setup
- ✓ Fast for development
- ✓ Good for learning
- ✗ Not optimized for production

### Optimizations

1. **Caching** - Cache frequently accessed content
2. **Database** - Use MongoDB for scalability
3. **Rate Limiting** - Prevent brute force attacks
4. **Compression** - Compress responses
5. **Load Balancing** - Distribute traffic

## Security

### Current (Development)
```javascript
// Password NOT hashed in code
password: 'plaintext'  // ❌ Bad!

// Token expires in 24 hours
JWT_EXPIRE=24h  // ✓ Good

// CORS only allows localhost
CLIENT_URL=http://localhost:8000  // ✓ Good
```

### For Production
```javascript
// Always hash passwords
password: bcrypt.hashSync(input, 10)  // ✓ Good!

// Short token expiration
JWT_EXPIRE=1h  // ✓ Better

// Use HTTPS
CLIENT_URL=https://secure-domain.com  // ✓ Good!

// Change secret
JWT_SECRET=super-long-random-string-32-chars  // ✓ Required!
```

## File Size

Current setup:
- `server.js` - ~150 lines
- `auth.js` (middleware) - ~50 lines
- `auth.js` (routes) - ~150 lines
- `content.js` (routes) - ~100 lines
- `db.js` (models) - ~250 lines
- Total: ~700 lines of backend code

## Scripts

All in `package.json`:

```json
{
  "start": "node server.js",        // Production
  "dev": "nodemon server.js"        // Development
}
```

Run with:
```bash
npm start          // Production mode
npm run dev        // Development mode (auto-reload)
npm install        // Install dependencies
```

## Environment Variables

### Development
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=basic-secret-key
JWT_EXPIRE=24h
```

### Production
```env
PORT=80 (or 443 for HTTPS)
NODE_ENV=production
JWT_SECRET=super-long-random-secure-string-minimum-32-chars
JWT_EXPIRE=7d
```

## Upgrade Path

### Phase 1: Current (JSON files)
✓ Good for learning and prototyping
✓ No database setup needed

### Phase 2: Database (MongoDB)
✓ Better for real data
✓ Scalable
- Install mongoose
- Create schemas
- Update db.js

### Phase 3: Enhanced (Production Ready)
✓ Full features
- Rate limiting
- Caching
- Monitoring
- Load balancing

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Start server: `npm run dev`
3. ✅ Test health check: http://localhost:5000/api/health
4. ✅ Start frontend: `python -m http.server 8000`
5. ✅ Test registration and login
6. ✅ Explore API endpoints

## Support Files

- `BACKEND_SETUP.md` - Detailed setup guide
- `FULL_STACK_SETUP.md` - Frontend + Backend guide
- `README.md` - Overall project docs

---

**You're ready to go! 🚀**
