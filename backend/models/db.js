// Database Model using JSON files

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const USERS_FILE = path.join(DATA_DIR, 'users.json');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');

// Initialize empty files if they don't exist
const initializeFiles = () => {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(CONTENT_FILE)) {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify({
      skills: [],
      stories: [],
      novels: []
    }, null, 2));
  }
};

// Read all users
const getAllUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
};

// Find user by username or email
const findUser = (username, email) => {
  const users = getAllUsers();
  return users.find(u => u.username === username || u.email === email);
};

// Find user by ID
const findUserById = (userId) => {
  const users = getAllUsers();
  return users.find(u => u.id === userId);
};

// Create new user
const createUser = (username, email, password) => {
  const users = getAllUsers();

  // Check if user already exists
  if (users.find(u => u.username === username || u.email === email)) {
    return { success: false, message: 'User already exists' };
  }

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = {
    id: Date.now().toString(),
    username,
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  return {
    success: true,
    message: 'User created successfully',
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    }
  };
};

// Verify password
const verifyPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

// Get all content
const getAllContent = () => {
  try {
    const data = fs.readFileSync(CONTENT_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading content:', error);
    return { skills: [], stories: [], novels: [] };
  }
};

// Initialize database with default content
const initializeContent = () => {
  const content = {
    skills: [
      {
        id: 'skill-1',
        title: 'Programming',
        icon: '💻',
        description: 'Learn Python, HTML, CSS, and JavaScript fundamentals.',
        lessons: 4,
        level: 'Beginner to Advanced',
        content: `
          <h3 style="color: var(--accent-brown); margin-top: 1.5rem; margin-bottom: 1rem;">Python Basics</h3>
          <p>Python is a versatile, beginner-friendly programming language. Learn variables, data types, loops, and functions.</p>
          
          <h3 style="color: var(--accent-brown); margin-top: 1.5rem; margin-bottom: 1rem;">HTML & CSS</h3>
          <p>Create beautiful web pages with HTML for structure and CSS for styling. Master flexbox and grid layouts for responsive design.</p>
          
          <h3 style="color: var(--accent-brown); margin-top: 1.5rem; margin-bottom: 1rem;">JavaScript</h3>
          <p>Add interactivity to your websites with JavaScript. Learn DOM manipulation, event handling, and modern ES6+ features.</p>
          
          <h3 style="color: var(--accent-brown); margin-top: 1.5rem; margin-bottom: 1rem;">Practice Projects</h3>
          <p>Build real-world projects: To-Do App, Weather Dashboard, E-commerce Site, and more. Apply your knowledge in practical scenarios.</p>
        `
      },
      {
        id: 'skill-2',
        title: 'Communication',
        icon: '🗣️',
        description: 'Improve public speaking, presentation, and writing skills.',
        lessons: 3,
        level: 'All Levels',
        content: `
          <h3 style="color: var(--accent-brown); margin-top: 1.5rem; margin-bottom: 1rem;">Public Speaking</h3>
          <p>Overcome nervousness and deliver compelling presentations. Learn voice modulation, body language, and audience engagement techniques.</p>
          
          <h3 style="color: var(--accent-brown); margin-top: 1.5rem; margin-bottom: 1rem;">Business Writing</h3>
          <p>Master professional emails, reports, and proposals. Enhance clarity, conciseness, and persuasion in your written communication.</p>
          
          <h3 style="color: var(--accent-brown); margin-top: 1.5rem; margin-bottom: 1rem;">Listening & Empathy</h3>
          <p>Develop active listening skills and emotional intelligence. Build stronger relationships through empathetic communication.</p>
        `
      },
      {
        id: 'skill-3',
        title: 'Aptitude',
        icon: '🧠',
        description: 'Master logical reasoning, problem-solving, and analytical skills.',
        lessons: 5,
        level: 'Intermediate',
        content: `
          <h3 style="color: var(--accent-brown); margin-top: 1.5rem; margin-bottom: 1rem;">Logical Reasoning</h3>
          <p>Enhance your analytical thinking with logic puzzles, pattern recognition, and deductive reasoning exercises.</p>
          
          <h3 style="color: var(--accent-brown); margin-top: 1.5rem; margin-bottom: 1rem;">Quantitative Analysis</h3>
          <p>Master numerical problem-solving, data interpretation, and mathematical concepts essential for competitive exams.</p>
          
          <h3 style="color: var(--accent-brown); margin-top: 1.5rem; margin-bottom: 1rem;">Verbal Ability</h3>
          <p>Improve reading comprehension, vocabulary, and critical thinking through diverse texts and exercises.</p>
        `
      }
    ],
    stories: [
      {
        id: 'story-1',
        title: 'The Dream Catcher',
        icon: '✨',
        description: 'A young artist discovers that her paintings hold the power to change lives.',
        meta: 'Written by Sarah Mitchell • 15 min read',
        genre: 'Drama',
        content: '<p>Maya had always believed that dreams were just fleeting images of the subconscious mind, until the night she discovered she could paint them.</p><p>It started innocently enough. She painted what she saw in her dreams—abstract landscapes, impossible colors, and emotions made tangible.</p><p>When her first exhibition opened, something extraordinary happened. A man approached her, tears streaming down his face. He said he recognized the painting because he had dreamed it too.</p>'
      },
      {
        id: 'story-2',
        title: 'Midnight Conversations',
        icon: '🌙',
        description: 'Two strangers meet at a café and share their deepest secrets under the moonlight.',
        meta: 'Written by James Chen • 12 min read',
        genre: 'Romance',
        content: '<p>The café was nearly empty at midnight when Alex walked in. That is when she noticed him—a stranger sitting alone with a cup of untouched tea.</p><p>Their eyes met briefly, and something unspoken passed between them. She found herself sitting at his table without knowing why.</p><p>"I am running away," she said, not bothering with introductions.</p>'
      }
    ],
    novels: [
      {
        id: 'novel-1',
        title: 'The Lighthouse Keeper',
        icon: '📘',
        description: 'An isolated lighthouse keeper discovers that solitude holds the key to understanding humanity.',
        meta: 'By Sarah Mitchell • 280 pages • Fiction',
        genre: 'Fiction',
        content: '<h3 style="color: var(--accent-brown); margin-top: 2rem; margin-bottom: 1rem;">CHAPTER 1: THE ARRIVAL</h3><p>The lighthouse stood on the rocky peninsula like a sentinel guarding the secrets of the sea. Thomas arrived on a grey morning, carrying nothing but a suitcase and the weight of a decision he had made months ago.</p><p>As he climbed the spiral stairs, each step echoing through the tower, he wondered if solitude was a refuge or a prison.</p>'
      },
      {
        id: 'novel-2',
        title: 'Echoes of Tomorrow',
        icon: '📗',
        description: 'A scientist discovers a way to communicate with parallel versions of herself across dimensions.',
        meta: 'By James Chen • 320 pages • Science Fiction',
        genre: 'Science Fiction',
        content: '<h3 style="color: var(--accent-brown); margin-top: 2rem; margin-bottom: 1rem;">CHAPTER 2: THE BREAKTHROUGH</h3><p>Dr. Ana Vasquez stared at the data streaming across her screen. For fifteen years, she had pursued this moment. And now, it was actually happening.</p><p>"Dimensional Bridge activated," her AI assistant announced calmly, as if it had not just changed the course of human history.</p>'
      }
    ]
  };

  fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2));
};

// Initialize on startup
initializeFiles();

module.exports = {
  getAllUsers,
  findUser,
  findUserById,
  createUser,
  verifyPassword,
  getAllContent,
  initializeContent
};
