/**
 * Centralized API Service
 * All API calls for the library application are made through this file.
 * This ensures consistent error handling, loading states, and easy maintenance.
 */

const API_BASE_URL = "https://lms-backend-data.onrender.com";

/**
 * BOOKS API
 */

// Get all books
export const getAllBooks = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/books`);
    if (!res.ok) throw new Error("Failed to fetch books");
    return await res.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

// Get books by Acc No
export const getBookByAccNo = async (accNo) => {
  try {
    const res = await fetch(`${API_BASE_URL}/books?accNo=${accNo}`);
    if (!res.ok) throw new Error("Failed to fetch book");
    return await res.json();
  } catch (error) {
    console.error("Error fetching book by Acc No:", error);
    throw error;
  }
};

// Add a new book
export const addBook = async (bookData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookData),
    });
    if (!res.ok) throw new Error("Failed to add book");
    return await res.json();
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};

// Update book by ID
export const updateBook = async (bookId, bookData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/books/${bookId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookData),
    });
    if (!res.ok) throw new Error("Failed to update book");
    return await res.json();
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

// Delete book by ID
export const deleteBook = async (bookId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/books/${bookId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete book");
    return await res.json();
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};

/**
 * BORROWED BOOKS API
 */

// Get all borrowed books
export const getAllBorrowedBooks = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/borrowedBooks`);
    if (!res.ok) throw new Error("Failed to fetch borrowed books");
    return await res.json();
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
    throw error;
  }
};

// Get borrowed books by Register No
export const getBorrowedBooksByRegisterNo = async (registerNo) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/borrowedBooks?registerNo=${registerNo}`
    );
    if (!res.ok) throw new Error("Failed to fetch borrowed books");
    return await res.json();
  } catch (error) {
    console.error("Error fetching borrowed books by register no:", error);
    throw error;
  }
};

// Get borrowed books by Acc No
export const getBorrowedBooksByAccNo = async (accNo) => {
  try {
    const res = await fetch(`${API_BASE_URL}/borrowedBooks?accNo=${accNo}`);
    if (!res.ok) throw new Error("Failed to fetch borrowed books");
    return await res.json();
  } catch (error) {
    console.error("Error fetching borrowed books by acc no:", error);
    throw error;
  }
};

// Add borrowed book record
export const addBorrowRecord = async (borrowData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/borrowedBooks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(borrowData),
    });
    if (!res.ok) throw new Error("Failed to add borrow record");
    return await res.json();
  } catch (error) {
    console.error("Error adding borrow record:", error);
    throw error;
  }
};

// Update borrowed book record by ID
export const updateBorrowRecord = async (recordId, borrowData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/borrowedBooks/${recordId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(borrowData),
    });
    if (!res.ok) throw new Error("Failed to update borrow record");
    return await res.json();
  } catch (error) {
    console.error("Error updating borrow record:", error);
    throw error;
  }
};

// Delete borrowed book record by ID
export const deleteBorrowRecord = async (recordId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/borrowedBooks/${recordId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete borrow record");
    return await res.json();
  } catch (error) {
    console.error("Error deleting borrow record:", error);
    throw error;
  }
};
