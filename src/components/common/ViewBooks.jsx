import { useEffect, useState } from "react";
import AlertMessage from "./AlertMessage.jsx";
import BookAvailabilityBadge from "./BookAvailabilityBadge.jsx";
import { getBookStatus } from "../utils/bookAvailability.js";
import { getAllBooks, getAllBorrowedBooks } from "../../services/api";

export default function ViewBooks() {
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

  // -------------------------------
  // Fetch books and borrowed records
  // -------------------------------
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

  // -------------------------------
  // Search + Filter
  // -------------------------------
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
  }, [search, genreFilter, books]);

  const genres = ["all", ...new Set(books.map((b) => b.genre).filter(Boolean))];

  return (
    <div className="flex justify-center px-4 py-6">
      <div className="w-full max-w-7xl">
        <h2 className="mb-6 text-center text-3xl font-bold text-slate-800">
          View Books
        </h2>

        {alert.message && (
          <AlertMessage type={alert.type} message={alert.message} />
        )}

        {/* Search & Filter */}
        <div className="mb-6 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <input
              type="text"
              placeholder="Search by Acc No, Title, or Author"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:max-w-md rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="w-full md:max-w-xs rounded-lg border px-4 py-2 focus:ring-2 focus:ring-purple-500"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre === "all" ? "All Genres" : genre}
                </option>
              ))}
            </select>
          </div>

          {/* Column Visibility Checkboxes */}
          <div className="flex flex-wrap gap-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <label className="flex items-center gap-2 cursor-pointer">
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
            <label className="flex items-center gap-2 cursor-pointer">
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
            <label className="flex items-center gap-2 cursor-pointer">
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
        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="min-w-full border-collapse">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Acc No</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Author</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Price</th>
                {showPublisher && (
                  <th className="px-4 py-3 text-left">Publisher</th>
                )}
                {showSupplier && (
                  <th className="px-4 py-3 text-left">Supplier</th>
                )}
                {showCallNo && <th className="px-4 py-3 text-left">Call No</th>}
                <th className="px-4 py-3 text-left">Availability</th>
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
                    No matching books found.
                  </td>
                </tr>
              )}

              {filteredBooks.map((book, index) => {
                const bookStatus = getBookStatus(book.accNo, borrowedBooks);
                return (
                  <tr
                    key={book.id}
                    className={`
                      border-b
                      ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    `}
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {book.accNo}
                    </td>

                    <td className="px-4 py-3 text-blue-600 font-semibold">
                      {book.title}
                    </td>

                    <td className="px-4 py-3 text-green-600 font-medium">
                      {book.author}
                    </td>

                    <td className="px-4 py-3 text-purple-600 font-medium">
                      {book.genre}
                    </td>

                    <td className="px-4 py-3 text-gray-700">₹ {book.price}</td>

                    {showPublisher && (
                      <td className="px-4 py-3 text-gray-700">
                        {book.publisher}
                      </td>
                    )}

                    {showSupplier && (
                      <td className="px-4 py-3 text-gray-700">
                        {book.supplier}
                      </td>
                    )}

                    {showCallNo && (
                      <td className="px-4 py-3 text-gray-700">{book.callNo}</td>
                    )}

                    <td className="px-4 py-3">
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
      </div>
    </div>
  );
}
