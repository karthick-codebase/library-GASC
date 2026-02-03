import { useEffect, useState } from "react";
import AlertMessage from "./AlertMessage.jsx";
import { getAllBorrowedBooks } from "../../services/api";

export default function StudentBorrowHistory() {
  const [borrowRecords, setBorrowRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  // -------------------------
  // Fetch all borrowed books
  // -------------------------
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

  // -------------------------
  // Sort and Filter Logic
  // -------------------------
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
  }, [search, statusFilter, borrowRecords]);

  // -------------------------
  // Format Date to DD-MM-YYYY
  // -------------------------
  const formatDate = (dateString) => {
    if (!dateString) return "Not Returned";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  // -------------------------
  // Get Status Badge Color
  // -------------------------
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

  return (
    <div className="flex justify-center px-4 py-6">
      <div className="w-full max-w-7xl">
        <h2 className="mb-6 text-center text-3xl font-bold text-slate-800">
          Borrowed Books
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
            className="w-full md:max-w-md rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:max-w-xs rounded-lg border px-4 py-2 focus:ring-2 focus:ring-purple-500"
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

        {/* Borrowed Books Table */}
        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="min-w-full border-collapse">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Student Name</th>
                <th className="px-4 py-3 text-left">Register Number</th>
                <th className="px-4 py-3 text-left">Book Title</th>
                <th className="px-4 py-3 text-left">Acc No</th>
                <th className="px-4 py-3 text-left">Issue Date</th>
                <th className="px-4 py-3 text-left">Return Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Remarks</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan="8" className="py-6 text-center text-gray-500">
                    Loading borrowed books...
                  </td>
                </tr>
              )}

              {!loading && filteredRecords.length === 0 && (
                <tr>
                  <td colSpan="8" className="py-6 text-center text-gray-500">
                    No matching records found.
                  </td>
                </tr>
              )}

              {filteredRecords.map((record, index) => (
                <tr
                  key={record.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition`}
                >
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {record.studentName}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {record.registerNo}
                  </td>
                  <td className="px-4 py-3 text-blue-600 font-semibold">
                    {record.bookTitle || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{record.accNo}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {formatDate(record.issueDate)}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {formatDate(record.returnDate)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap inline-block ${getStatusBadgeColor(
                        record.status,
                      )}`}
                    >
                      {record.status || "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-xs">
                    {record.remarks || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
