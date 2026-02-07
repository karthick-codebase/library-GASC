# Library Management System

A modern, full-featured web application for managing a school/college library. Built with React, Tailwind CSS, and JSON Server, this system provides an intuitive interface for managing books, student borrowing records, and library inventory.

## Features

✨ **Book Management**

- Add, view, update, and delete books from the library catalog
- Manage book details including accession number, author, genre, publisher, supplier, and call number
- Search and filter books by title, author, accession number, or genre
- Display book availability status in real-time

📚 **Borrow & Return Management**

- Borrow books for students with validation of book availability
- Process book returns with status tracking (Returned, Damaged, Lost, Partially Damaged)
- Prevent borrowing of unavailable books
- Track remarks for damaged or lost books

📊 **Dashboard & Statistics**

- Real-time dashboard with key metrics:
  - Total books and genres
  - Total library value
  - Total unique authors
  - Borrowed, returned, damaged, and lost books statistics
  - Genre breakdown chart
- Responsive statistics cards for quick insights

🔍 **Student History**

- View complete borrow history for all students
- Filter records by student name, register number, book title, or accession number
- Status-based filtering (Borrowed, Returned, Damaged, Lost, Partially Damaged)
- Summary statistics with clickable status badges
- Sortable and searchable records table

📱 **Responsive Design**

- Mobile-first responsive layout
- Desktop-optimized sidebar navigation
- Mobile hamburger menu for better UX
- Gradient-themed forms with smooth animations
- Professional color-coded status badges

## Tech Stack

- **Frontend**: React 19+ with React Router v7
- **Styling**: Tailwind CSS 4+
- **Build Tool**: Vite
- **State Management**: React Hooks (useState, useEffect)
- **Backend API**: JSON Server (for mock database)
- **Linting**: ESLint

## Project Structure

```
src/
├── pages/              # Page components (main views)
│   ├── DashboardPage.jsx
│   ├── HomePage.jsx
│   ├── ViewBooksPage.jsx
│   ├── AddBookPage.jsx
│   ├── DeleteBookPage.jsx
│   ├── UpdateBookPage.jsx
│   ├── BorrowBookPage.jsx
│   ├── ReturnBookPage.jsx
│   └── StudentHistoryPage.jsx
├── components/
│   ├── common/         # Reusable UI components
│   │   ├── AlertMessage.jsx
│   │   ├── BookAvailabilityBadge.jsx
│   │   └── FloatingInput.jsx
│   └── layout/         # Layout components
│       └── Sidebar.jsx
├── utils/              # Utility functions
│   └── bookAvailability.js
├── App.jsx             # Main app component with routing
├── main.jsx            # Entry point
├── index.css           # Global styles
└── db.json             # JSON Server database
```

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**

```bash
git clone <repository-url>
cd my-project
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

4. **Start JSON Server (in a separate terminal)**

```bash
npx json-server --watch src/db.json --port 3000
```

JSON Server will run on `http://localhost:3000`

## Available Scripts

```bash
# Start development server with Vite
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Start JSON Server (backend)
npm run server

# Run ESLint to check code quality
npm run lint

# Fix ESLint issues
npm run lint:fix

# Start production server
npm start
```

## 🚀 Deployment

This project is configured for easy deployment on **Render.com**

### Quick Start

1. Push code to GitHub
2. Connect repository to Render
3. Deploy frontend and backend services
4. Test the live application

### 📚 Deployment Guides

- **[DEPLOYMENT_QUICK_START.md](./DEPLOYMENT_QUICK_START.md)** - Quick 5-step deployment guide ⚡
- **[GITHUB_RENDER_SETUP.md](./GITHUB_RENDER_SETUP.md)** - Detailed setup with troubleshooting
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete deployment reference

### Key Configuration Files

- `render.yaml` - Render deployment configuration
- `.env.example` - Environment variables template
- `package.json` - Includes deployment scripts

### Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
VITE_API_URL=http://localhost:3000
VITE_API_PORT=3000
```

For production on Render, set:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## Usage

### Adding Books

1. Navigate to "Add Book" from the sidebar
2. Fill in the book details (Accession Number, Title, Author are required)
3. Click "Add Book" to save

### Borrowing Books

1. Go to "Borrow Book" page
2. Enter student registration number and name
3. Enter the book's accession number
4. System automatically checks availability
5. Set the issue date and confirm borrowing

### Returning Books

1. Navigate to "Return Book" page
2. Search by student register number or book accession number
3. Select the borrowed record
4. Enter return date and select return status
5. Add remarks if needed (e.g., damage description)
6. Process the return

### Viewing Library Statistics

- The dashboard displays real-time statistics including:
  - Total books in library
  - Total genres available
  - Total library value
  - Current borrow status overview
  - Genre-wise book breakdown

## Database Structure

### Books Collection (`books`)

```json
{
  "id": "1",
  "accNo": "A001",
  "title": "Book Title",
  "author": "Author Name",
  "genre": "Genre",
  "price": "300",
  "publisher": "Publisher Name",
  "supplier": "Supplier Name",
  "callNo": "CALL-001"
}
```

### Borrowed Books Collection (`borrowedBooks`)

```json
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
```

## Key Features Explained

### Book Availability System

The application tracks book availability in real-time:

- **Available**: No active borrows or all borrows returned
- **Borrowed**: Currently with a student
- **Damaged**: Marked as damaged during return
- **Lost**: Marked as lost by student
- **Partially Damaged**: Minor damage noted

### Smart Search & Filtering

- Search across multiple fields simultaneously
- Genre-based filtering
- Status-based filtering for borrow records
- Dynamic column visibility in book view

### Validation & Error Handling

- Required field validation on forms
- Real-time availability checks before borrowing
- Server error handling with user-friendly messages
- Date validation for issue and return dates

## Configuration

### JSON Server Database

The application uses `src/db.json` as the mock database. You can:

- Edit the JSON directly to add/modify records
- Use the application UI to make changes
- Reset the database by restoring the original `db.json`

### Customization

- **Colors**: Update Tailwind CSS classes in component files
- **Routes**: Modify routing in `App.jsx`
- **Navigation Items**: Edit `src/components/layout/Sidebar.jsx`
- **Genres**: Update genre options in respective form pages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Lazy loading with React Router
- Optimized re-renders using React hooks
- Efficient filtering and searching logic
- CSS minification with Tailwind
- HTTP request batching for simultaneous API calls

## Future Enhancements

- [ ] User authentication and role-based access
- [ ] Advanced reporting and analytics
- [ ] Email notifications for overdue books
- [ ] Fine calculation system
- [ ] Database migration to PostgreSQL/MongoDB
- [ ] Book reservation system
- [ ] Barcode scanning support
- [ ] Audit logs for all operations

## Troubleshooting

### JSON Server not connecting

- Ensure JSON Server is running on port 3000
- Check that `src/db.json` exists and is valid JSON
- Verify the API URLs in components match your server

### Styles not applying

- Clear browser cache (Ctrl+Shift+Del)
- Rebuild Tailwind CSS: `npm run build`
- Check Tailwind configuration in `tailwind.config.js`

### Books not appearing

- Verify JSON Server is running
- Check browser console for API errors
- Ensure `src/db.json` has book records

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Create a Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For issues, questions, or suggestions:

- Create an issue on GitHub
- Contact the development team
- Check existing documentation

## Author

Created with ❤️ for library management

---

**Last Updated**: February 2, 2025
**Version**: 1.0.0
