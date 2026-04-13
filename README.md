# Learning Hub - Full Stack Web Application

A modern, responsive learning platform with a beautiful nude pastel aesthetic. This project includes user authentication, content management, and a clean, minimal UI design.

## Project Overview

Learning Hub is a full-stack web application built with vanilla HTML, CSS, and JavaScript. It features user authentication, multiple content categories (Skills, Stories, Novels), and a responsive design that works seamlessly on desktop and mobile devices.

## Features

✨ **Splash Screen** - Beautiful intro page with automatic redirect to login
🔐 **Authentication System** - Secure login/signup with localStorage persistence
📚 **Skills Section** - Learn programming, communication, and aptitude skills
📖 **Stories Section** - Browse and read short stories with rich content
📕 **Novels Section** - Access full-length novels and literary works
📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
🎨 **Nude Pastel Aesthetic** - Soft beige, cream, blush pink color palette
✨ **Smooth Animations** - Fade-in effects and hover transitions
💾 **Session Management** - LocalStorage-based session persistence

## Project Structure

```
learning-hub/
├── index.html              # Splash screen
├── login.html              # Login/Signup page
├── home.html               # Dashboard/Home page
├── skills.html             # Skills and learning content
├── stories.html            # Short stories section
├── novels.html             # Novels section
├── css/
│   └── styles.css          # Main stylesheet with nude pastel theme
├── js/
│   ├── auth.js             # Authentication logic
│   ├── utils.js            # Utility functions and navigation
│   └── README.md           # This file
└── assets/
    └── images/             # Image storage directory
```

## Color Palette (Nude Pastel)

- **Cream**: #faf8f5
- **Soft Beige**: #f5f0e8
- **Light Brown**: #d4c4b4
- **Blush Pink**: #f5e0e0
- **Warm Taupe**: #c9b9a8
- **Accent Brown**: #8b7355
- **Text Dark**: #4a4a4a
- **Text Light**: #6b6b6b

## Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No server required for basic functionality

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   # or download the ZIP file
   ```

2. **Navigate to the project directory**
   ```bash
   cd learning-hub
   ```

3. **Open in browser**
   - Open `index.html` in your web browser, or
   - Use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Python 2
     python -m SimpleHTTPServer 8000
     
     # Using Node.js http-server
     npx http-server
     ```
   - Then navigate to `http://localhost:8000`

## Usage

### 1. **Splash Screen**
   - Opens automatically when you access the app
   - Auto-redirects to login after 2.5 seconds
   - No user interaction needed

### 2. **Authentication**
   - **Sign Up**: Create a new account with username, email, and password
   - **Sign In**: Login with username/email and password
   - **Remember Me**: Optional checkbox to stay logged in
   - Passwords must be at least 6 characters
   - Data is stored in browser's localStorage

### 3. **Dashboard**
   - View personalized greeting with your username
   - Access three main categories: Skills, Stories, Novels
   - Click on any category card to explore content

### 4. **Skills Section**
   - **Programming**: Learn Python, HTML, CSS, JavaScript
   - **Communication**: Improve public speaking and writing skills
   - **Aptitude**: Master logical reasoning and problem-solving
   - Click on any skill to view detailed learning content

### 5. **Stories Section**
   - Browse 6 curated short stories
   - Click to read full story content
   - Each story includes reading time and genre information

### 6. **Novels Section**
   - Access 6 full-length novels
   - Read excerpts from various chapters
   - Each novel includes author, page count, and genre

### 7. **Navigation**
   - Back button on top-left to return to previous section
   - Logout button on top-right to end session
   - All navigation is smooth with fade-in animations

## Features in Detail

### Authentication System

**localStorage Implementation:**
- User data is stored in browser's localStorage
- Session tokens are generated for each login
- Session timeout: 24 hours
- "Remember Me" feature for persistent login

**User Data Structure:**
```javascript
{
  id: timestamp,
  username: "username",
  email: "user@example.com",
  password: "hashed_in_production",
  createdAt: "ISO_date_string"
}
```

### Session Management

The app automatically:
- Checks user login status on page load
- Redirects to login if not authenticated
- Validates session tokens
- Logs out users on timeout (24 hours)
- Keeps users logged in across browser refreshes

### Content Management

All content is stored locally in JavaScript objects:
- Skills content is embedded in `skills.html`
- Stories are defined in `stories.html`
- Novels are defined in `novels.html`

This approach makes it easy to migrate to a backend database later.

## Customization

### Changing Colors

Edit the CSS variables in `css/styles.css`:
```css
:root {
  --cream: #faf8f5;
  --soft-beige: #f5f0e8;
  --light-brown: #d4c4b4;
  -- blush-pink: #f5e0e0;
  /* ... more colors */
}
```

### Adding New Content

1. **Add a new skill** in `skills.html`:
   ```javascript
   skillsData: {
     newSkill: {
       title: 'New Skill Title',
       content: '<p>Content here</p>'
     }
   }
   ```

2. **Add a new story** in `stories.html`:
   ```javascript
   storiesData: {
     story7: {
       title: 'New Story',
       meta: 'Author • 15 min read',
       content: '<p>Story content here</p>'
     }
   }
   ```

3. **Add a new novel** in `novels.html`:
   Similar structure to stories

### Modifying Forms

Edit the form fields in `login.html` to add more fields. Update the validation in the JavaScript accordingly.

## JavaScript Modules

### auth.js
- `registerUser()` - Create new account
- `loginUser()` - Authenticate user
- `logoutUser()` - End session
- `getCurrentUser()` - Get logged-in user info
- `validateSession()` - Check session validity

### utils.js
- `goToPage()` - Navigate between pages
- `showMessage()` - Display notifications
- `navigateTo()` - Redirect to page
- `copyToClipboard()` - Copy text functionality
- `formatDate()` - Format dates
- `debounce()` - Function debouncing
- `validateEmail()` - Email validation

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: below 480px

## Performance Considerations

- Lightweight vanilla JavaScript (no frameworks)
- CSS animations use transform and opacity for smooth performance
- LocalStorage for quick data access
- Minimal external dependencies

## Security Notes

### Current Implementation (Development Only)
- ⚠️ Passwords are stored in plain text in localStorage
- ⚠️ No encryption for sensitive data
- ⚠️ Session tokens are simple

### Production Recommendations
- Use HTTPS for all communications
- Implement bcrypt or similar for password hashing
- Use secure authentication tokens (JWT)
- Implement proper backend authentication
- Add CSRF protection
- Validate input on both client and server
- Use secure cookies with httpOnly flag
- Implement rate limiting for login attempts

## Future Enhancements

### Potential Features
- Backend API with Node.js/Flask
- Database integration (MongoDB, PostgreSQL)
- User progress tracking
- Bookmarking/favorites system
- Search functionality
- Reading progress indicators
- Comments and discussions
- User profiles
- Content recommendations
- Email verification
- Password reset functionality
- Social login (Google, GitHub)

### Technical Improvements
- Migrate to TypeScript
- Implement state management
- Add service workers for offline support
- E2E testing with Cypress
- Unit testing framework
- Build process with Webpack
- SCSS preprocessing

## Troubleshooting

### Can't Login After Sign Up
- Clear browser localStorage and try again
- Check browser console for errors (F12)
- Ensure cookies are enabled

### Page Not Loading Properly
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser compatibility
- Ensure all CSS/JS files are in correct directories

### Session Timing Out
- Sessions expire after 24 hours of inactivity
- Click "Remember Me" on login for persistent sessions
- Logout and login again to refresh session

### Form Validation Errors
- Username must be unique
- Email must be valid format
- Password must be at least 6 characters
- Passwords must match in signup form

## Development Tips

1. **Use Browser DevTools**
   - Open DevTools (F12)
   - Check Console for errors
   - Inspect Elements for debugging
   - View localStorage under Application/Storage

2. **View LocalStorage Data**
   ```javascript
   // In browser console
   console.log(localStorage.getItem('users'));
   console.log(localStorage.getItem('currentUser'));
   ```

3. **Clear Data**
   ```javascript
   // In browser console
   localStorage.clear();
   location.reload();
   ```

4. **Test Authentication**
   - Create test account
   - Logout and login to verify
   - Refresh page to test session persistence
   - Check session timeout (24 hours)

## License

This project is free to use and modify for personal and educational purposes.

## Support

For issues or suggestions, please create an issue with detailed information:
- Browser and version
- Steps to reproduce
- Console error messages
- Screenshots if applicable

## Author

Created as a modern learning platform with a focus on clean design and user experience.

---

**Enjoy your learning journey! 📚✨**
