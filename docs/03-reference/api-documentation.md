# 📚 API Reference

Complete API documentation.

---

## API Base URL

**Development**: `http://localhost:3000`  
**Production**: `https://library-gasc-backend.onrender.com`

All calls use centralized service: `src/services/api.js`

---

## Books Endpoints

### GET /books

Get all books.

```javascript
const books = await api.getAllBooks();
```

**Response**:

```json
[
  {
    "id": "1",
    "accNo": "A001",
    "title": "Book Title",
    "author": "Author Name",
    "genre": "Fiction",
    "price": "299",
    "publisher": "Publisher",
    "supplier": "Supplier",
    "callNo": "FIC-001"
  }
]
```

---

### GET /books/:id

Get book by accession number.

```javascript
const book = await api.getBookByAccNo("A001");
```

---

### POST /books

Add new book.

```javascript
await api.addBook({
  accNo: "A002",
  title: "New Book",
  author: "Author",
  genre: "Fiction",
  price: "299",
  publisher: "Publisher",
  supplier: "Supplier",
  callNo: "FIC-002",
});
```

---

### PUT /books/:id

Update book.

```javascript
await api.updateBook(1, {
  title: "Updated Title",
  price: "399",
});
```

---

### DELETE /books/:id

Delete book.

```javascript
await api.deleteBook(1);
```

---

## Borrowed Books Endpoints

### GET /borrowedBooks

Get all borrowed records.

```javascript
const records = await api.getAllBorrowedBooks();
```

**Response**:

```json
[
  {
    "id": "1",
    "registerNo": "2024001",
    "studentName": "Student Name",
    "accNo": "A001",
    "bookTitle": "Book Title",
    "issueDate": "2024-01-15",
    "returnDate": "2024-01-22",
    "status": "Returned",
    "remarks": "Good condition"
  }
]
```

---

### GET /borrowedBooks?registerNo=2024001

Get records by student register number.

```javascript
const records = await api.getBorrowedBooksByRegisterNo("2024001");
```

---

### GET /borrowedBooks?accNo=A001

Get records by book accession number.

```javascript
const records = await api.getBorrowedBooksByAccNo("A001");
```

---

### POST /borrowedBooks

Add borrow record.

```javascript
await api.addBorrowRecord({
  registerNo: "2024001",
  studentName: "Student Name",
  accNo: "A001",
  bookTitle: "Book Title",
  issueDate: "2024-01-15",
  status: "Borrowed",
  remarks: "",
});
```

---

### PUT /borrowedBooks/:id

Update borrow record.

```javascript
await api.updateBorrowRecord(1, {
  returnDate: "2024-01-22",
  status: "Returned",
  remarks: "Good condition",
});
```

---

### DELETE /borrowedBooks/:id

Delete borrow record.

```javascript
await api.deleteBorrowRecord(1);
```

---

## Status Values

### Book Status

- `Available` - Can be borrowed
- `Borrowed` - Currently with student
- `Damaged` - Marked as damaged
- `Lost` - Marked as lost
- `Partially Damaged` - Minor damage

---

## Error Handling

All API calls include error handling:

```javascript
try {
  const books = await api.getAllBooks();
  // Success - use books
} catch (error) {
  console.error("Error:", error.message);
  // Handle error
}
```

Common errors:

- `Network error` - Backend not running
- `404 Not Found` - Endpoint doesn't exist
- `500 Server error` - Database issue

---

## Using API Service

### Import

```javascript
import api from "../services/api.js";
```

### Example: Get Books

```javascript
const books = await api.getAllBooks();
```

### Example: Add Book

```javascript
const newBook = await api.addBook({
  accNo: "A100",
  title: "New Book",
  author: "Author",
  genre: "Fiction",
  price: "299",
  publisher: "Pub",
  supplier: "Supplier",
  callNo: "F-100",
});
```

### Example: Borrow Book

```javascript
const record = await api.addBorrowRecord({
  registerNo: "2024001",
  studentName: "John Doe",
  accNo: "A001",
  bookTitle: "Book Title",
  issueDate: new Date().toISOString().split("T")[0],
  status: "Borrowed",
});
```

---

## Database Structure

```
src/db.json
├── books: [Array of book objects]
│   └── 10+ sample books
└── borrowedBooks: [Array of borrow records]
    └── 5+ sample records
```

---

## Rate Limiting

No rate limiting on free tier.

Render free tier limitations:

- Spins down after 15 min inactivity
- First request after sleep slower
- 100 concurrent requests max

---

## Response Times

- Development: <50ms
- Production free tier: 100-500ms (varies)
- Production paid tier: <100ms

---

**Next**: See deployment guides for usage examples!
