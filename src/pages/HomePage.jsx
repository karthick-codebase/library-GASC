import { useEffect, useState } from "react";
import { getAllBooks, getAllBorrowedBooks } from "../services/api";

export default function HomePage() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalGenres: 0,
    totalValue: 0,
    totalAuthors: 0,
    genreBreakdown: {},
    totalBorrowed: 0,
    totalReturned: 0,
    totalDamaged: 0,
    totalLost: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const books = await getAllBooks();
        const borrowRecords = await getAllBorrowedBooks();

        // Calculate statistics
        const genreBreakdown = {};
        let totalValue = 0;
        const authors = new Set();

        books.forEach((book) => {
          totalValue += parseInt(book.price || 0);
          authors.add(book.author);
          genreBreakdown[book.genre] = (genreBreakdown[book.genre] || 0) + 1;
        });

        // Calculate borrowed book statistics
        const borrowed = borrowRecords.filter(
          (r) => r.status === "Borrowed",
        ).length;
        const returned = borrowRecords.filter(
          (r) => r.status === "Returned",
        ).length;
        const damaged = borrowRecords.filter(
          (r) => r.status === "Damaged" || r.status === "Partially Damaged",
        ).length;
        const lost = borrowRecords.filter((r) => r.status === "Lost").length;

        setStats({
          totalBooks: books.length,
          totalGenres: Object.keys(genreBreakdown).length,
          totalValue,
          totalAuthors: authors.size,
          genreBreakdown,
          totalBorrowed: borrowed,
          totalReturned: returned,
          totalDamaged: damaged,
          totalLost: lost,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getGenreEmoji = (genre) => {
    if (!genre) return "📚";
    const g = genre.toLowerCase();
    if (g.includes("computer")) return "💻";
    if (g.includes("math")) return "🔢";
    if (g.includes("phys")) return "⚛️";
    if (g.includes("chem")) return "🧪";
    if (g.includes("bot")) return "🌿";
    if (g.includes("english")) return "🔤";
    if (g.includes("tamil")) return "📜";
    if (g.includes("bba")) return "💼";
    if (g.includes("b.com")) return "📊";
    return "📚";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-2 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
          📚 GASC Library Management System
        </h1>
        <p className="text-gray-600 text-lg">
          Your Gateway to Knowledge and Learning
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-r-4 border-purple-500"></div>
            <p className="mt-4 text-gray-600">Loading library statistics...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Primary Stats Section */}
          <div className="max-w-7xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              📊 Library Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Books */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg transform transition hover:scale-105 hover:shadow-2xl cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-blue-100">
                      TOTAL BOOKS
                    </p>
                    <p className="text-4xl font-bold mt-2">
                      {stats.totalBooks}
                    </p>
                  </div>
                  <span className="text-5xl">📖</span>
                </div>
                <p className="text-xs text-blue-100 mt-3">
                  Books in collection
                </p>
              </div>

              {/* Total Genres */}
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg transform transition hover:scale-105 hover:shadow-2xl cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-purple-100">
                      DEPARTMENTS
                    </p>
                    <p className="text-4xl font-bold mt-2">
                      {stats.totalGenres}
                    </p>
                  </div>
                  <span className="text-5xl">🏷️</span>
                </div>
                <p className="text-xs text-purple-100 mt-3">
                  Different categories
                </p>
              </div>

              {/* Total Authors */}
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-white shadow-lg transform transition hover:scale-105 hover:shadow-2xl cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-pink-100">
                      AUTHORS
                    </p>
                    <p className="text-4xl font-bold mt-2">
                      {stats.totalAuthors}
                    </p>
                  </div>
                  <span className="text-5xl">✍️</span>
                </div>
                <p className="text-xs text-pink-100 mt-3">Unique authors</p>
              </div>

              {/* Total Value */}
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg transform transition hover:scale-105 hover:shadow-2xl cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-emerald-100">
                      TOTAL VALUE
                    </p>
                    <p className="text-3xl font-bold mt-2">
                      ₹{stats.totalValue.toLocaleString()}
                    </p>
                  </div>
                  <span className="text-5xl">💰</span>
                </div>
                <p className="text-xs text-emerald-100 mt-3">
                  Collection worth
                </p>
              </div>
            </div>
          </div>

          {/* Department Wise Breakdown */}
          <div className="max-w-7xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              📂 Department-Wise Distribution
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(stats.genreBreakdown)
                .sort(([, a], [, b]) => b - a)
                .map(([genre, count]) => (
                  <div
                    key={genre}
                    className="bg-white rounded-xl p-4 shadow-md border-l-4 border-blue-500 hover:shadow-lg transition transform hover:translate-x-1"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-700 font-semibold">{genre}</p>
                        <p className="text-2xl font-bold text-blue-600 mt-1">
                          {count}
                        </p>
                      </div>
                      <div className="text-3xl">{getGenreEmoji(genre)}</div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {((count / stats.totalBooks) * 100).toFixed(1)}% of
                      collection
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Borrowing Statistics */}
          <div className="max-w-7xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              📤 Borrowing Statistics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Currently Borrowed */}
              <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-6 text-white shadow-lg transform transition hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-orange-100">
                      BORROWED
                    </p>
                    <p className="text-4xl font-bold mt-2">
                      {stats.totalBorrowed}
                    </p>
                  </div>
                  <span className="text-5xl">📤</span>
                </div>
              </div>

              {/* Returned Books */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg transform transition hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-green-100">
                      RETURNED
                    </p>
                    <p className="text-4xl font-bold mt-2">
                      {stats.totalReturned}
                    </p>
                  </div>
                  <span className="text-5xl">✅</span>
                </div>
              </div>

              {/* Damaged Books */}
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-6 text-white shadow-lg transform transition hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-yellow-100">
                      DAMAGED
                    </p>
                    <p className="text-4xl font-bold mt-2">
                      {stats.totalDamaged}
                    </p>
                  </div>
                  <span className="text-5xl">⚠️</span>
                </div>
              </div>

              {/* Lost Books */}
              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg transform transition hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-red-100">LOST</p>
                    <p className="text-4xl font-bold mt-2">{stats.totalLost}</p>
                  </div>
                  <span className="text-5xl">❌</span>
                </div>
              </div>
            </div>
          </div>

          {/* Library Information Section */}
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              ℹ️ About Our Library
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Features */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  ✨ Key Features
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">✓</span>
                    <span className="text-gray-700">
                      <strong>Comprehensive Collection:</strong> Over{" "}
                      {stats.totalBooks} books across {stats.totalGenres}{" "}
                      departments
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">✓</span>
                    <span className="text-gray-700">
                      <strong>Easy Borrowing:</strong> Streamlined book
                      borrowing and returning process
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">✓</span>
                    <span className="text-gray-700">
                      <strong>Track Records:</strong> Complete history of all
                      borrowed books
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3">✓</span>
                    <span className="text-gray-700">
                      <strong>Digital Management:</strong> Digital catalog and
                      book management system
                    </span>
                  </li>
                </ul>
              </div>

              {/* Quick Stats Info */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  📈 Quick Insights
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <span className="text-gray-700">Average Book Price:</span>
                    <span className="font-bold text-purple-600">
                      ₹{Math.round(stats.totalValue / stats.totalBooks)}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-700">
                      Most Popular Department:
                    </span>
                    <span className="font-bold text-purple-600">
                      {Object.entries(stats.genreBreakdown).length > 0
                        ? Object.entries(stats.genreBreakdown).sort(
                            ([, a], [, b]) => b - a,
                          )[0][0]
                        : "N/A"}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-700">Books in Circulation:</span>
                    <span className="font-bold text-purple-600">
                      {stats.totalBorrowed}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-700">Return Rate:</span>
                    <span className="font-bold text-purple-600">
                      {(
                        (stats.totalReturned /
                          (stats.totalBorrowed +
                            stats.totalReturned +
                            stats.totalDamaged +
                            stats.totalLost)) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Library Hours */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-sm font-semibold text-blue-100">
                    LIBRARY HOURS
                  </p>
                  <p className="text-2xl font-bold mt-2">9:00 AM - 5:00 PM</p>
                  <p className="text-xs text-blue-100 mt-1">Monday to Friday</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-100">CONTACT</p>
                  <p className="text-2xl font-bold mt-2">+91-XXXXX-XXXXX</p>
                  <p className="text-xs text-blue-100 mt-1">
                    library@college.edu
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-100">
                    LOCATION
                  </p>
                  <p className="text-2xl font-bold mt-2">Main block</p>
                  <p className="text-xs text-blue-100 mt-1">Ground Floor</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
