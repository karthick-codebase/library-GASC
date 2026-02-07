# 🗺️ System Architecture & Data Flow

Visual guide to how the system works.

---

## Architecture Overview

```
┌────────────────────────────────────────────────────────┐
│                    USER BROWSER                        │
│  https://library-gasc-frontend.onrender.com            │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │  React Application                               │ │
│  │  - Pages (Dashboard, Books, Borrow, Return)     │ │
│  │  - Components (Forms, Tables, Charts)           │ │
│  │  - Styling (Tailwind CSS)                       │ │
│  └─────────────────────┬──────────────────────────┘ │
│                        │                             │
│                        │ API Calls                   │
│                        ▼                             │
└────────────────────────────────────────────────────────┘
                        │
                        │ VITE_API_URL
                        │ https://backend.onrender.com
                        ▼
┌────────────────────────────────────────────────────────┐
│                  BACKEND SERVER                        │
│  https://library-gasc-backend.onrender.com             │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │  JSON Server                                     │ │
│  │  - GET /books - Get all books                  │ │
│  │  - POST /books - Add book                      │ │
│  │  - PUT /books/:id - Update book                │ │
│  │  - DELETE /books/:id - Delete book             │ │
│  │  - GET /borrowedBooks - Get records            │ │
│  │  - POST/PUT/DELETE /borrowedBooks              │ │
│  └─────────────────────┬──────────────────────────┘ │
│                        │                             │
│                        ▼                             │
│  ┌──────────────────────────────────────────────────┐ │
│  │  Database (src/db.json)                          │ │
│  │  - books: [book objects]                        │ │
│  │  - borrowedBooks: [borrow records]              │ │
│  └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

---

## API Service (Centralized)

All frontend API calls go through one service:

```javascript
// Location: src/services/api.js
// 11 functions for all operations

// Books
-getAllBooks() -
  getBookByAccNo(accNo) -
  addBook(bookData) -
  updateBook(id, bookData) -
  deleteBook(id) -
  // Borrowed Books
  getAllBorrowedBooks() -
  getBorrowedBooksByRegisterNo(regNo) -
  getBorrowedBooksByAccNo(accNo) -
  addBorrowRecord(data) -
  updateBorrowRecord(id, data) -
  deleteBorrowRecord(id);
```

---

## Data Flow Example: Adding a Book

```
User fills form on frontend
        ↓
Click "Add Book" button
        ↓
Frontend calls: api.addBook(bookData)
        ↓
Request sent to: POST /books (backend)
        ↓
JSON Server validates data
        ↓
Saves to src/db.json
        ↓
Returns response with new book
        ↓
Frontend receives response
        ↓
Updates page (new book appears)
        ↓
User sees "Book Added" message
```

---

## Development vs Production

### Development (Local)

```
Frontend: http://localhost:5173  (npm run dev)
Backend:  http://localhost:3000  (npm run server)
Code:     Your computer
```

### Production (Render)

```
Frontend: https://library-gasc-frontend.onrender.com
Backend:  https://library-gasc-backend.onrender.com
Code:     GitHub → Render (auto-deploy)
```

---

## Deployment Flow

```
1. Write code locally
        ↓
2. Test with npm run dev + npm run server
        ↓
3. git push to GitHub
        ↓
4. Render detects push (webhook)
        ↓
5. Frontend service redeploys
   - npm install && npm run build
   - npm run start
        ↓
6. Backend service redeploys
   - npm install
   - npx json-server --watch src/db.json --port $PORT
        ↓
7. Users access live application
```

---

## Component Structure

```
src/
├── services/
│   └── api.js                    ← All API calls here
├── pages/                        ← 9 page components
│   ├── DashboardPage
│   ├── ViewBooksPage
│   ├── AddBookPage
│   ├── UpdateBookPage
│   ├── DeleteBookPage
│   ├── BorrowBookPage
│   ├── ReturnBookPage
│   ├── StudentHistoryPage
│   └── HomePage
├── components/
│   ├── common/                   ← Reusable UI components
│   └── layout/                   ← Layout components
├── utils/
│   └── bookAvailability.js       ← Helper functions
├── App.jsx                       ← Main app + routing
├── main.jsx                      ← Entry point
├── db.json                       ← Sample database
└── index.css                     ← Global styles
```

---

## Key Technologies

| Layer           | Technology   | Version |
| --------------- | ------------ | ------- |
| Frontend        | React        | 19.2.0  |
| Routing         | React Router | 7.10.1  |
| Styling         | Tailwind CSS | 4.1.17  |
| Build           | Vite         | 7.2.4   |
| Backend         | JSON Server  | 0.17.4  |
| Runtime         | Node.js      | 18+     |
| Version Control | Git          | Latest  |
| Deployment      | Render       | Cloud   |

---

## Environment Variables

### Development (.env.local)

```
VITE_API_URL=http://localhost:3000
VITE_API_PORT=3000
```

### Production (Render Dashboard)

```
VITE_API_URL=https://library-gasc-backend.onrender.com
NODE_ENV=production
```

---

## Auto-Deployment Process

Every git push triggers:

1. GitHub webhook notification to Render
2. Render fetches latest code from GitHub
3. Runs build command
4. Restarts service
5. Live within 2-3 minutes

No manual deployment needed!

---

## Database Persistence

⚠️ **Important**: Free tier Render resets data between redeploys.

For persistent data, upgrade to paid plan.

---

**Next**: See deployment files for step-by-step instructions!
