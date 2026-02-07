import { useEffect, useState } from "react";
import AlertMessage from "../components/common/AlertMessage";
import BookAvailabilityBadge from "../components/common/BookAvailabilityBadge";
import { getBookStatus } from "../utils/bookAvailability";
import { getAllBooks, getAllBorrowedBooks } from "../services/api";

export default function ViewBooksPage() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [showPublisher, setShowPublisher] = useState(false);
  const [showSupplier, setShowSupplier] = useState(false);
  const [showCallNo, setShowCallNo] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Fetch books and borrowed records
  useEffect(() => {
    fetchBooksAndRecords();
  }, []);

  const fetchBooksAndRecords = async () => {
    setLoading(true);
    try {
      const [booksData, borrowedData] = await Promise.all([
        getAllBooks(),
        getAllBorrowedBooks(),
      ]);

      if (!booksData.length) {
        setAlert({
          type: "warning",
          message: "No books available.",
        });
      }

      setBooks(booksData);
      setBorrowedBooks(borrowedData);
      setFilteredBooks(booksData);
    } catch {
      setAlert({
        type: "error",
        message: "Failed to load books.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Search + Filter
  useEffect(() => {
    let result = [...books];

    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.accNo.toLowerCase().includes(term) ||
          b.title.toLowerCase().includes(term) ||
          b.author.toLowerCase().includes(term),
      );
    }

    if (genreFilter !== "all") {
      result = result.filter(
        (b) => b.genre && b.genre.toLowerCase() === genreFilter.toLowerCase(),
      );
    }

    setFilteredBooks(result);
    setCurrentPage(1); // Reset to page 1 when filtering
  }, [search, genreFilter, books]);

  // Pagination logic
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

  const genres = ["all", ...new Set(books.map((b) => b.genre).filter(Boolean))];

  return (
    <div className="flex justify-center px-0 md:px-4 py-0 md:py-6 h-screen md:h-auto">
      <div className="w-full md:max-w-7xl md:books-card">
        <h2 className="books-title">📚 View Books</h2>

        {alert.message && (
          <AlertMessage type={alert.type} message={alert.message} />
        )}

        {/* Search & Filter */}
        <div className="mb-6 flex flex-col gap-4">
          <div className="filter-box flex flex-col md:flex-row gap-4 justify-between">
            <input
              type="text"
              placeholder="🔍 Search by Acc No, Title, or Author"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input-books w-full md:max-w-md px-4 py-3 focus:outline-none"
            />

            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="genre-select-books w-full md:max-w-xs px-4 py-3 focus:outline-none"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre === "all" ? "All Genres" : genre}
                </option>
              ))}
            </select>
          </div>

          {/* Column Visibility Checkboxes */}
          <div className="filter-box flex flex-wrap gap-6 rounded-lg">
            <label className="flex items-center gap-2 cursor-pointer hover:text-purple-700 transition">
              <input
                type="checkbox"
                checked={showPublisher}
                onChange={(e) => setShowPublisher(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-gray-700">
                Show Publisher
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-purple-700 transition">
              <input
                type="checkbox"
                checked={showSupplier}
                onChange={(e) => setShowSupplier(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-gray-700">
                Show Supplier
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-purple-700 transition">
              <input
                type="checkbox"
                checked={showCallNo}
                onChange={(e) => setShowCallNo(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-gray-700">
                Show Call No
              </span>
            </label>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="books-table">
          <table className="min-w-full border-collapse">
            <thead className="books-table-head">
              <tr>
                <th className="px-2 md:px-4 py-3 text-left text-xs md:text-sm">
                  Acc No
                </th>
                <th className="px-2 md:px-4 py-3 text-left text-xs md:text-sm">
                  Title
                </th>
                <th className="px-2 md:px-4 py-3 text-left text-xs md:text-sm">
                  Author
                </th>
                <th className="px-2 md:px-4 py-3 text-left text-xs md:text-sm">
                  Department
                </th>
                <th className="px-2 md:px-4 py-3 text-left text-xs md:text-sm">
                  Price
                </th>
                {showPublisher && (
                  <th className="px-2 md:px-4 py-3 text-left text-xs md:text-sm">
                    Publisher
                  </th>
                )}
                {showSupplier && (
                  <th className="px-2 md:px-4 py-3 text-left text-xs md:text-sm">
                    Supplier
                  </th>
                )}
                {showCallNo && (
                  <th className="px-2 md:px-4 py-3 text-left text-xs md:text-sm">
                    Call No
                  </th>
                )}
                <th className="px-2 md:px-4 py-3 text-left text-xs md:text-sm">
                  Availability
                </th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={
                      6 +
                      (showPublisher ? 1 : 0) +
                      (showSupplier ? 1 : 0) +
                      (showCallNo ? 1 : 0)
                    }
                    className="py-6 text-center text-gray-500"
                  >
                    Loading books...
                  </td>
                </tr>
              )}

              {!loading && filteredBooks.length === 0 && (
                <tr>
                  <td
                    colSpan={
                      6 +
                      (showPublisher ? 1 : 0) +
                      (showSupplier ? 1 : 0) +
                      (showCallNo ? 1 : 0)
                    }
                    className="py-6 text-center text-gray-500"
                  >
                    No books found matching your criteria.
                  </td>
                </tr>
              )}

              {paginatedBooks.map((book, idx) => {
                const bookStatus = getBookStatus(book.accNo, borrowedBooks);
                return (
                  <tr
                    key={book.id}
                    className="books-row"
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    <td className="px-2 md:px-4 py-3 font-semibold text-gray-700 text-xs md:text-sm">
                      {book.accNo}
                    </td>
                    <td className="px-2 md:px-4 py-3 text-gray-700 text-xs md:text-sm">
                      {book.title}
                    </td>
                    <td className="px-2 md:px-4 py-3 text-gray-700 text-xs md:text-sm">
                      {book.author}
                    </td>
                    <td className="px-2 md:px-4 py-3 text-gray-700 text-xs md:text-sm">
                      {book.genre}
                    </td>
                    <td className="px-2 md:px-4 py-3 text-gray-700 text-xs md:text-sm">
                      ₹{book.price}
                    </td>
                    {showPublisher && (
                      <td className="px-2 md:px-4 py-3 text-gray-700 text-xs md:text-sm">
                        {book.publisher}
                      </td>
                    )}
                    {showSupplier && (
                      <td className="px-2 md:px-4 py-3 text-gray-700 text-xs md:text-sm">
                        {book.supplier}
                      </td>
                    )}
                    {showCallNo && (
                      <td className="px-2 md:px-4 py-3 text-gray-700 text-xs md:text-sm">
                        {book.callNo}
                      </td>
                    )}
                    <td className="px-2 md:px-4 py-3">
                      <BookAvailabilityBadge
                        isAvailable={bookStatus.isAvailable}
                        status={bookStatus.status}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {!loading && filteredBooks.length > 0 && (
          <div className="mt-8">
            <p className="text-sm text-gray-600 mb-4 text-center">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredBooks.length)} of{" "}
              {filteredBooks.length} books
            </p>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-3 flex-wrap">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="pagination-btn px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`pagination-btn px-4 py-2 ${
                      currentPage === page
                        ? "pagination-btn-active"
                        : "pagination-btn-inactive"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="pagination-btn px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
