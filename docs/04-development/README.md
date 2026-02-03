# 👥 Development Guides

For developers working on the project.

---

## Files in This Folder

1. **contributing.md** - How to contribute code
2. **development-setup.md** - Local dev environment
3. **code-style.md** - Code standards & guidelines
4. **api-service.md** - Using the centralized API service

---

## Quick Start Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start backend (in another terminal)
npm run server

# Check code quality
npm run lint

# Fix linting issues
npm run lint:fix
```

Development server runs at: `http://localhost:5173`  
Backend API runs at: `http://localhost:3000`

---

## Making Changes

1. **Create a branch**

   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make changes**
   - Edit files locally
   - Test with `npm run dev`

3. **Commit changes**

   ```bash
   git add .
   git commit -m "description of changes"
   ```

4. **Push to GitHub**

   ```bash
   git push origin feature/your-feature
   ```

5. **Create Pull Request** on GitHub

---

## Using the API Service

All API calls go through `src/services/api.js`:

```javascript
import api from "./services/api";

// Get all books
const books = await api.getAllBooks();

// Add a book
await api.addBook(bookData);

// Get borrowed books for student
const records = await api.getBorrowedBooksByRegisterNo("2024001");
```

See `api-service.md` for complete function reference.

---

## Code Quality

Run before committing:

```bash
npm run lint:fix
```

Check for issues:

```bash
npm run lint
```

---

**Ready to contribute?** Check the relevant guide!
