import { useEffect, useState } from "react";
import AlertMessage from "../components/common/AlertMessage";
import { getAllBorrowedBooks } from "../services/api";

export default function StudentHistoryPage() {
  const [borrowRecords, setBorrowRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Fetch all borrowed books
  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = async () => {
    setLoading(true);
    try {
      const data = await getAllBorrowedBooks();

      if (!data.length) {
        setAlert({
          type: "warning",
          message: "No borrowed book records found.",
        });
      }

      setBorrowRecords(data);
      setFilteredRecords(data);
    } catch {
      setAlert({
        type: "error",
        message: "Failed to fetch borrowed books.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Sort and Filter Logic
  useEffect(() => {
    const statusOrder = {
      Borrowed: 0,
      Returned: 1,
      "Partially Damaged": 2,
      Damaged: 3,
      Lost: 4,
      Pending: 5,
    };

    let result = borrowRecords.filter((record) => {
      // Apply search filter
      if (search.trim()) {
        const term = search.toLowerCase();
        const matchesSearch =
          record.studentName.toLowerCase().includes(term) ||
          record.registerNo.toLowerCase().includes(term) ||
          record.bookTitle.toLowerCase().includes(term) ||
          record.accNo.toLowerCase().includes(term);
        if (!matchesSearch) return false;
      }

      // Apply status filter
      if (statusFilter !== "all" && record.status !== statusFilter) {
        return false;
      }

      return true;
    });

    // Sort by status order
    result.sort((a, b) => {
      const orderA = statusOrder[a.status] || 5;
      const orderB = statusOrder[b.status] || 5;
      return orderA - orderB;
    });

    setFilteredRecords(result);
    setCurrentPage(1); // Reset to page 1 when filtering
  }, [search, statusFilter, borrowRecords]);

  // Format Date to DD-MM-YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "Not Returned";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  // Get Status Badge Color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Returned":
        return "bg-green-100 text-green-800";
      case "Damaged":
        return "bg-yellow-100 text-yellow-800";
      case "Lost":
        return "bg-red-100 text-red-800";
      case "Partially Damaged":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

  return (
    <div className="flex justify-center px-0 md:px-4 py-0 md:py-6 h-screen md:h-auto">
      <div className="w-full md:max-w-7xl md:books-card">
        <h2 className="mb-6 text-center text-3xl font-bold books-title">
          Student Borrow History
        </h2>

        {alert.message && (
          <AlertMessage type={alert.type} message={alert.message} />
        )}

        {/* Search & Filter Section */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
          <input
            type="text"
            placeholder="Search by Student Name, Register No, Book Title, or Acc No"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input-books w-full md:max-w-md px-4 py-3 focus:outline-none"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="genre-select-books w-full md:max-w-xs px-4 py-3 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="Borrowed">Borrowed</option>
            <option value="Returned">Returned</option>
            <option value="Damaged">Damaged</option>
            <option value="Partially Damaged">Partially Damaged</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        {/* Summary Stats */}
        {borrowRecords.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div
              onClick={() => setStatusFilter("all")}
              className={`p-4 rounded-lg border cursor-pointer transition ${
                statusFilter === "all"
                  ? "bg-blue-100 border-blue-400"
                  : "bg-blue-50 border-blue-200 hover:border-blue-300"
              }`}
            >
              <p className="text-xs text-blue-600 font-semibold">TOTAL</p>
              <p className="text-2xl font-bold text-blue-700">
                {borrowRecords.length}
              </p>
            </div>
            <div
              onClick={() => setStatusFilter("Borrowed")}
              className={`p-4 rounded-lg border cursor-pointer transition ${
                statusFilter === "Borrowed"
                  ? "bg-blue-100 border-blue-400"
                  : "bg-blue-50 border-blue-200 hover:border-blue-300"
              }`}
            >
              <p className="text-xs text-blue-600 font-semibold">BORROWED</p>
              <p className="text-2xl font-bold text-blue-700">
                {borrowRecords.filter((r) => r.status === "Borrowed").length}
              </p>
            </div>
            <div
              onClick={() => setStatusFilter("Returned")}
              className={`p-4 rounded-lg border cursor-pointer transition ${
                statusFilter === "Returned"
                  ? "bg-green-100 border-green-400"
                  : "bg-green-50 border-green-200 hover:border-green-300"
              }`}
            >
              <p className="text-xs text-green-600 font-semibold">RETURNED</p>
              <p className="text-2xl font-bold text-green-700">
                {borrowRecords.filter((r) => r.status === "Returned").length}
              </p>
            </div>
            <div
              onClick={() => setStatusFilter("Lost")}
              className={`p-4 rounded-lg border cursor-pointer transition ${
                statusFilter === "Lost"
                  ? "bg-red-100 border-red-400"
                  : "bg-red-50 border-red-200 hover:border-red-300"
              }`}
            >
              <p className="text-xs text-red-600 font-semibold">LOST</p>
              <p className="text-2xl font-bold text-red-700">
                {borrowRecords.filter((r) => r.status === "Lost").length}
              </p>
            </div>
            <div
              onClick={() => setStatusFilter("Damaged")}
              className={`p-4 rounded-lg border cursor-pointer transition ${
                statusFilter === "Damaged"
                  ? "bg-yellow-100 border-yellow-400"
                  : "bg-yellow-50 border-yellow-200 hover:border-yellow-300"
              }`}
            >
              <p className="text-xs text-yellow-600 font-semibold">DAMAGED</p>
              <p className="text-2xl font-bold text-yellow-700">
                {
                  borrowRecords.filter(
                    (r) =>
                      r.status === "Damaged" ||
                      r.status === "Partially Damaged",
                  ).length
                }
              </p>
            </div>
          </div>
        )}

        {/* Records Table */}
        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="min-w-full border-collapse text-sm md:text-base">
            <thead className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
              <tr>
                <th className="px-2 md:px-4 py-3 text-left text-xs md:text-sm font-bold">
                  Student Name
                </th>
                <th className="px-2 md:px-4 py-3 text-left text-xs md:text-sm font-bold">
                  Reg No
                </th>
                <th className="px-2 md:px-4 py-3 text-left text-xs md:text-sm font-bold">
                  Book Title
                </th>
                <th className="px-2 md:px-4 py-3 text-left text-xs md:text-sm font-bold">
                  Acc No
                </th>
                <th className="px-2 md:px-4 py-3 text-left text-xs md:text-sm font-bold">
                  Issue Date
                </th>
                <th className="px-2 md:px-4 py-3 text-left text-xs md:text-sm font-bold">
                  Return Date
                </th>
                <th className="px-2 md:px-4 py-3 text-left text-xs md:text-sm font-bold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="7" className="py-6 text-center text-gray-500">
                    Loading records...
                  </td>
                </tr>
              )}
              {!loading && paginatedRecords.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-6 text-center text-gray-500">
                    No records found.
                  </td>
                </tr>
              )}
              {paginatedRecords.map((record) => (
                <tr key={record.id} className="history-row">
                  <td className="px-2 md:px-4 py-3 font-semibold text-gray-800 text-xs md:text-sm">
                    {record.studentName}
                  </td>
                  <td className="px-2 md:px-4 py-3 text-gray-700 text-xs md:text-sm">
                    {record.registerNo}
                  </td>
                  <td className="px-2 md:px-4 py-3 text-gray-700 text-xs md:text-sm">
                    {record.bookTitle}
                  </td>
                  <td className="px-2 md:px-4 py-3 text-gray-700 text-xs md:text-sm">
                    {record.accNo}
                  </td>
                  <td className="px-2 md:px-4 py-3 text-gray-700 text-xs md:text-sm">
                    {formatDate(record.issueDate)}
                  </td>
                  <td className="px-2 md:px-4 py-3 text-gray-700 text-xs md:text-sm">
                    {formatDate(record.returnDate)}
                  </td>
                  <td className="px-2 md:px-4 py-3">
                    <span
                      className={`inline-block px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                        record.status,
                      )}`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {!loading && filteredRecords.length > 0 && (
          <div className="mt-8">
            <p className="text-sm text-gray-600 mb-4 text-center">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredRecords.length)} of{" "}
              {filteredRecords.length} records
            </p>

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
