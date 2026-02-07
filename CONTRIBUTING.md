# Contributing to Library GASC

Thank you for your interest in contributing to the Library GASC project! This document provides guidelines and instructions for contributing.

## Getting Started

### 1. Fork the Repository

- Visit https://github.com/karthick-codebase/library-GASC
- Click the "Fork" button to create your own copy

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/library-GASC.git
cd library-GASC
```

### 3. Add Upstream Remote

```bash
git remote add upstream https://github.com/karthick-codebase/library-GASC.git
```

### 4. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

## Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# In another terminal, start JSON Server
npm run server

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix
```

## Making Changes

### Code Style

- Follow the existing code style in the project
- Use ESLint: `npm run lint:fix` before committing
- Use meaningful variable and function names
- Add comments for complex logic

### Component Guidelines

- Keep components small and focused
- Use hooks for state management
- Use the centralized API service from `src/services/api.js`
- Add proper error handling

### Commits

```bash
# Make sure to write clear commit messages
git commit -m "feat: add book search functionality"
# or
git commit -m "fix: resolve API timeout issue"
# or
git commit -m "docs: update deployment guide"
```

### Commit Message Format

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `style:` for formatting
- `refactor:` for code restructuring
- `test:` for test additions
- `chore:` for maintenance

## Testing Your Changes

1. **Run the Application**

```bash
npm run dev
npm run server  # in another terminal
```

2. **Test Manually**

- Navigate through the app
- Test the feature/fix you added
- Check for console errors
- Test on different screen sizes

3. **Check Linting**

```bash
npm run lint
```

## Submitting Changes

### 1. Sync with Upstream

```bash
git fetch upstream
git rebase upstream/main
```

### 2. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 3. Create a Pull Request

- Go to your fork on GitHub
- Click "Compare & pull request"
- Add a descriptive title and description
- Reference any related issues: `Fixes #123`
- Click "Create pull request"

## Pull Request Guidelines

### PR Description Should Include

- **What**: What changes are being made?
- **Why**: Why are these changes needed?
- **How**: How were the changes implemented?
- **Testing**: How were the changes tested?

### Example PR Description

```markdown
## Description

Add search functionality to the books page

## Why

Users need to be able to search for books by title, author, or accession number to find books quickly.

## How

- Added search input field to ViewBooksPage
- Implemented filter logic in useEffect hook
- Used the centralized API service to fetch books

## Testing

- Tested search with various keywords
- Verified filtering works correctly
- Checked responsive design on mobile

Fixes #42
```

## Code Review Process

1. **Wait for Feedback**
   - Maintainers will review your PR
   - Be patient and respectful

2. **Address Feedback**
   - Make requested changes
   - Push updates to the same branch
   - PR will auto-update

3. **Approval and Merge**
   - Once approved, maintainers will merge your PR
   - Delete your feature branch

## Reporting Bugs

### Before Creating an Issue

- Check existing issues to avoid duplicates
- Test with the latest version
- Collect error messages and logs

### Bug Report Template

```markdown
## Description

Brief description of the bug

## Steps to Reproduce

1. Step 1
2. Step 2
3. Step 3

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Environment

- Browser: [e.g., Chrome, Firefox]
- OS: [e.g., Windows, macOS, Linux]
- Node version: [e.g., 18.0.0]

## Additional Context

Screenshots, console errors, etc.
```

## Suggesting Enhancements

### Enhancement Request Template

```markdown
## Description

Brief description of the enhancement

## Use Case

Why would this enhancement be useful?

## Proposed Solution

How could this be implemented?

## Alternatives

Have you considered other approaches?
```

## Project Structure Reference

```
library-GASC/
├── src/
│   ├── services/api.js         # ⭐ Use this for all API calls
│   ├── pages/                  # Page components
│   ├── components/             # Reusable components
│   ├── assets/                 # Static assets
│   ├── App.jsx                 # Root component
│   └── main.jsx                # Entry point
├── public/                      # Static files
├── docs/                        # Documentation
├── package.json                # Dependencies
├── vite.config.js              # Vite config
└── render.yaml                 # Deployment config
```

## Important Files Not to Modify

- `.github/workflows/` - CI/CD configuration
- `render.yaml` - Deployment configuration (discuss first)
- `package.json` - Dependencies (discuss first)

## API Service Usage

When making API calls, always use the centralized service:

```javascript
// ✅ Good
import { getAllBooks, addBook } from "../services/api";

const books = await getAllBooks();
const newBook = await addBook(bookData);

// ❌ Bad
const res = await fetch("http://localhost:3000/books");
```

## Commit Workflow Example

```bash
# 1. Create and switch to feature branch
git checkout -b feat/add-book-search

# 2. Make changes and test
npm run dev
npm run lint:fix

# 3. Stage and commit
git add .
git commit -m "feat: add book search functionality"

# 4. Push to fork
git push origin feat/add-book-search

# 5. Create PR on GitHub
# (Visit GitHub and click Compare & pull request)
```

## Community Guidelines

- Be respectful and inclusive
- Provide constructive feedback
- Help other contributors
- Ask questions if something is unclear
- Share knowledge and experience

## Need Help?

- **Questions**: Open a discussion on GitHub
- **Documentation**: Check API_DOCUMENTATION_INDEX.md
- **Deployment**: Refer to DEPLOYMENT_GUIDE.md
- **Issues**: Open an issue with detailed information

## Recognition

Contributors will be recognized in:

- The project README
- GitHub contributors page
- Release notes

---

**Thank you for contributing to Library GASC! 🎉**

---

For more information, see:

- [README.md](README.md)
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- [API_DOCUMENTATION_INDEX.md](API_DOCUMENTATION_INDEX.md)
