# 👥 Contributing Guide

How to contribute to this project.

---

## Quick Start

### 1. Fork & Clone

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/library-GASC.git
cd library-GASC

# Add upstream remote
git remote add upstream https://github.com/karthick-codebase/library-GASC.git
```

### 2. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# In another terminal, start backend
npm run server

# Make your changes
# Test locally at http://localhost:5173

# Check code quality
npm run lint
npm run lint:fix
```

### 4. Commit & Push

```bash
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name
```

### 5. Create Pull Request

- Go to GitHub
- Create PR with description of changes
- Wait for review

---

## Commit Message Format

```
feat: add new feature
fix: fix a bug
docs: update documentation
style: format code
refactor: refactor code
test: add tests
chore: update dependencies
```

Example:

```bash
git commit -m "feat: add book search functionality"
```

---

## Code Style

### JavaScript

- Use arrow functions
- Use const/let (not var)
- Add comments for complex logic
- Use meaningful variable names

### React Components

```javascript
// Good
const MyComponent = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Load data
  }, []);

  return <div>...</div>;
};
```

### API Calls

Always use centralized service:

```javascript
import api from "../services/api.js";

const data = await api.getAllBooks();
```

---

## Testing Locally

### Frontend

```bash
npm run dev
# Opens http://localhost:5173
```

### Backend

```bash
npm run server
# Opens http://localhost:3000
```

### Both Together

```bash
# Terminal 1
npm run dev

# Terminal 2
npm run server
```

Then test at http://localhost:5173

---

## File Structure

```
src/
├── services/api.js          ← Add API functions here
├── pages/                   ← Add page components
├── components/
│   ├── common/              ← Reusable components
│   └── layout/              ← Layout components
├── utils/                   ← Helper functions
├── App.jsx                  ← Routing here
└── main.jsx                 ← Entry point
```

---

## Adding a Feature

### 1. Create Component

```javascript
// src/components/MyComponent.jsx
export default function MyComponent() {
  return <div>My Component</div>;
}
```

### 2. Use API

```javascript
import api from "../services/api.js";

const books = await api.getAllBooks();
```

### 3. Add Route (if page)

```javascript
// In App.jsx
<Route path="/my-page" element={<MyPageComponent />} />
```

### 4. Add Navigation

```javascript
// In Sidebar.jsx
<Link to="/my-page">My Page</Link>
```

---

## Common Tasks

### Add a New API Function

Edit `src/services/api.js`:

```javascript
export const myNewFunction = async (param) => {
  try {
    const response = await fetch(`${API_BASE_URL}/endpoint`, { method: "GET" });
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
```

### Modify Database

Edit `src/db.json` directly or use the UI.

### Change Styling

Use Tailwind CSS classes in components.

### Update Documentation

Edit files in `docs/` folder.

---

## Before Submitting PR

- [ ] Code runs locally without errors
- [ ] No console errors (F12)
- [ ] Lint passes: `npm run lint`
- [ ] Fix lint issues: `npm run lint:fix`
- [ ] Database functions work
- [ ] UI looks good on mobile
- [ ] Updated documentation if needed

---

## Guidelines

✅ **DO:**

- Write clear commit messages
- Test your changes locally
- Follow code style
- Update docs for new features
- Use the API service for all requests
- Write clean, readable code

❌ **DON'T:**

- Hardcode URLs (use env variables)
- Skip testing
- Break existing features
- Add console.log spam
- Commit .env files
- Ignore linting errors

---

## Getting Help

1. Read docs in `docs/` folder
2. Check similar code in project
3. Ask in comments on PR
4. Check GitHub issues

---

## Development Commands

| Command            | Purpose                     |
| ------------------ | --------------------------- |
| `npm run dev`      | Start frontend dev server   |
| `npm run server`   | Start backend (JSON Server) |
| `npm run build`    | Build for production        |
| `npm run preview`  | Preview production build    |
| `npm run lint`     | Check code quality          |
| `npm run lint:fix` | Fix linting issues          |
| `npm start`        | Start preview server        |

---

## Useful Links

- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Vite Docs](https://vitejs.dev)

---

**Happy coding!** 🚀
