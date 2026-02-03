# 🔌 Centralized API Service

Guide to using the centralized API service.

---

## Overview

All API calls go through one service: `src/services/api.js`

This provides:

- ✅ Consistent error handling
- ✅ Single URL configuration
- ✅ Easy to maintain
- ✅ No hardcoded URLs in components

---

## Location

```
src/
└── services/
    └── api.js
```

---

## Functions Available

### Books

#### getAllBooks()

Get all books.

```javascript
import api from "../services/api.js";

const books = await api.getAllBooks();
// Returns: Array of book objects
```

#### getBookByAccNo(accNo)

Get book by accession number.

```javascript
const book = await api.getBookByAccNo("A001");
// Returns: Single book object or null
```

#### addBook(bookData)

Add new book.

```javascript
const newBook = await api.addBook({
  accNo: "A002",
  title: "Book Title",
  author: "Author Name",
  genre: "Fiction",
  price: "299",
  publisher: "Pub Name",
  supplier: "Supplier Name",
  callNo: "FIC-002",
});
// Returns: Created book with ID
```

#### updateBook(id, bookData)

Update existing book.

```javascript
const updated = await api.updateBook(1, {
  title: "Updated Title",
  price: "399",
});
// Returns: Updated book object
```

#### deleteBook(id)

Delete book by ID.

```javascript
await api.deleteBook(1);
// Returns: Success message
```

---

### Borrowed Books

#### getAllBorrowedBooks()

Get all borrow records.

```javascript
const records = await api.getAllBorrowedBooks();
// Returns: Array of borrow records
```

#### getBorrowedBooksByRegisterNo(registerNo)

Get records for specific student.

```javascript
const records = await api.getBorrowedBooksByRegisterNo("2024001");
// Returns: Array of student's borrow records
```

#### getBorrowedBooksByAccNo(accNo)

Get records for specific book.

```javascript
const records = await api.getBorrowedBooksByAccNo("A001");
// Returns: Array of records for that book
```

#### addBorrowRecord(data)

Create new borrow record.

```javascript
const record = await api.addBorrowRecord({
  registerNo: "2024001",
  studentName: "John Doe",
  accNo: "A001",
  bookTitle: "Book Title",
  issueDate: "2024-01-15",
  status: "Borrowed",
  remarks: "",
});
// Returns: Created record with ID
```

#### updateBorrowRecord(id, data)

Update borrow record (for returns).

```javascript
const record = await api.updateBorrowRecord(1, {
  returnDate: "2024-01-22",
  status: "Returned",
  remarks: "Good condition",
});
// Returns: Updated record
```

#### deleteBorrowRecord(id)

Delete borrow record.

```javascript
await api.deleteBorrowRecord(1);
// Returns: Success message
```

---

## Error Handling

All functions include try-catch:

```javascript
try {
  const books = await api.getAllBooks();
  // Success
  console.log(books);
} catch (error) {
  // Error handling
  console.error("Failed to load books:", error.message);
}
```

Common errors:

- Network error → Backend not running
- 404 → Endpoint not found
- 500 → Server error

---

## Using in Components

### Example 1: Load Data on Mount

```javascript
import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await api.getAllBooks();
        setBooks(data);
      } catch (error) {
        console.error("Failed to load:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {books.map((book) => (
        <div key={book.id}>{book.title}</div>
      ))}
    </div>
  );
}
```

### Example 2: Add New Item

```javascript
const handleAddBook = async (formData) => {
  try {
    const newBook = await api.addBook(formData);
    console.log("Book added:", newBook);
    // Refresh list or show success message
  } catch (error) {
    console.error("Failed to add:", error);
    // Show error message to user
  }
};
```

### Example 3: Update Item

```javascript
const handleUpdateBook = async (id, updates) => {
  try {
    const updated = await api.updateBook(id, updates);
    console.log("Updated:", updated);
  } catch (error) {
    console.error("Failed to update:", error);
  }
};
```

### Example 4: Delete Item

```javascript
const handleDeleteBook = async (id) => {
  try {
    await api.deleteBook(id);
    console.log("Deleted successfully");
  } catch (error) {
    console.error("Failed to delete:", error);
  }
};
```

---

## Configuration

### Development

```javascript
// src/services/api.js
const API_BASE_URL = process.env.VITE_API_URL || "http://localhost:3000";
```

### Production

Set environment variable `VITE_API_URL` in Render dashboard.

---

## Best Practices

✅ **DO:**

- Always await API calls
- Use try-catch for error handling
- Store data in state
- Show loading states
- Log errors

❌ **DON'T:**

- Call API in render (use useEffect)
- Hardcode API URLs
- Ignore errors
- Make requests in loops
- Forget to handle loading state

---

## Testing

Test API locally:

```bash
npm run server
```

Then in browser console:

```javascript
// Import would happen differently, but concept:
// api.getAllBooks().then(books => console.log(books))
```

Or make curl request:

```bash
curl http://localhost:3000/books
```

---

## Adding New API Functions

1. Edit `src/services/api.js`
2. Add new async function
3. Include error handling
4. Use in components

Example:

```javascript
export const myNewFunction = async (param) => {
  try {
    const response = await fetch(`${API_BASE_URL}/endpoint`, { method: "GET" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
```

---

**This service keeps all API logic in one place - easy to maintain and update!**
