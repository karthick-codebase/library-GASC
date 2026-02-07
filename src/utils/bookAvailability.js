/**
 * Book Availability Utility Functions
 * Determines if a book is available based on borrowed and returned records
 */

/**
 * Get all borrowed records for a specific book
 * @param {string} accNo - Accession number of the book
 * @param {Array} borrowedBooks - Array of borrowed book records
 * @returns {Array} - Array of borrowed records for the book
 */
export const getBookBorrowedRecords = (accNo, borrowedBooks) => {
  return borrowedBooks.filter((record) => record.accNo === accNo);
};

/**
 * Check if a book is currently available
 * A book is available if:
 * - It has no borrowed records, OR
 * - All borrowed records have a status of "Returned"
 * 
 * @param {string} accNo - Accession number of the book
 * @param {Array} borrowedBooks - Array of borrowed book records
 * @returns {boolean} - true if book is available, false otherwise
 */
export const isBookAvailable = (accNo, borrowedBooks) => {
  const records = getBookBorrowedRecords(accNo, borrowedBooks);
  
  if (records.length === 0) {
    return true; // No records = available
  }

  // Check if all records are "Returned"
  return records.every((record) => record.status === "Returned");
};

/**
 * Get current borrow status of a book
 * @param {string} accNo - Accession number of the book
 * @param {Array} borrowedBooks - Array of borrowed book records
 * @returns {object} - Status info { isAvailable, status, currentBorrow }
 */
export const getBookStatus = (accNo, borrowedBooks) => {
  const records = getBookBorrowedRecords(accNo, borrowedBooks);
  
  if (records.length === 0) {
    return {
      isAvailable: true,
      status: "Available",
      currentBorrow: null,
    };
  }

  // Find the most recent borrowed record that is not returned
  const activeBorrow = records.find((r) => r.status !== "Returned");

  if (activeBorrow) {
    return {
      isAvailable: false,
      status: activeBorrow.status, // Could be "Borrowed", "Damaged", "Lost", etc.
      currentBorrow: activeBorrow,
    };
  }

  return {
    isAvailable: true,
    status: "Available",
    currentBorrow: null,
  };
};

/**
 * Get all books with their availability status
 * @param {Array} books - Array of book objects
 * @param {Array} borrowedBooks - Array of borrowed book records
 * @returns {Array} - Books array with availability info
 */
export const getBooksWithAvailability = (books, borrowedBooks) => {
  return books.map((book) => {
    const bookStatus = getBookStatus(book.accNo, borrowedBooks);
    return {
      ...book,
      isAvailable: bookStatus.isAvailable,
      availability: bookStatus,
    };
  });
};

/**
 * Get total copies borrowed vs returned for a book
 * @param {string} accNo - Accession number of the book
 * @param {Array} borrowedBooks - Array of borrowed book records
 * @returns {object} - { total, borrowed, returned, damaged, lost }
 */
export const getBookCopyStats = (accNo, borrowedBooks) => {
  const records = getBookBorrowedRecords(accNo, borrowedBooks);

  return {
    total: records.length,
    borrowed: records.filter((r) => r.status === "Borrowed").length,
    returned: records.filter((r) => r.status === "Returned").length,
    damaged: records.filter((r) => r.status === "Damaged").length,
    lost: records.filter((r) => r.status === "Lost").length,
    partiallyDamaged: records.filter((r) => r.status === "Partially Damaged").length,
  };
};
