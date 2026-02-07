import { useState } from "react";
import FloatingInput from "../components/common/FloatingInput";
import AlertMessage from "../components/common/AlertMessage";
import BookAvailabilityBadge from "../components/common/BookAvailabilityBadge";
import {
  getBorrowedBooksByRegisterNo,
  getBorrowedBooksByAccNo,
  updateBorrowRecord,
} from "../services/api";

export default function ReturnBookPage() {
  const [searchInput, setSearchInput] = useState("");
  const [borrowRecords, setBorrowRecords] = useState([]);
  const [borrowRecord, setBorrowRecord] = useState(null);
  const [formData, setFormData] = useState({
    returnDate: "",
    status: "",
    remarks: "",
  });

  const [alert, setAlert] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const statusOptions = ["Returned", "Damaged", "Lost", "Partially Damaged"];

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Search Borrowed Book
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchInput.trim()) {
      setAlert({
        type: "error",
        message: "Register Number or Acc No is required.",
      });
      return;
    }

    setLoading(true);
    setAlert({ type: "", message: "" });
    setBorrowRecords([]);
    setBorrowRecord(null);

    try {
      // Search by registerNo first
      let data = await getBorrowedBooksByRegisterNo(searchInput);

      // If not found by registerNo, search by accNo
      if (!data.length) {
        data = await getBorrowedBooksByAccNo(searchInput);
      }

      if (!data.length) {
        setAlert({
          type: "warning",
          message: "Borrowed book record not found.",
        });
        return;
      }

      // If multiple records found, show list to select
      if (data.length > 1) {
        setBorrowRecords(data);
        setAlert({
          type: "success",
          message: `Found ${data.length} records. Please select one to proceed.`,
        });
      } else {
        // Single record found
        setBorrowRecord(data[0]);
        setAlert({
          type: "success",
          message: "✓ Book record found. You can now process the return.",
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "Failed to fetch book record.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Select from multiple records
  const handleSelectRecord = (record) => {
    setBorrowRecord(record);
    setBorrowRecords([]);
    setAlert({
      type: "success",
      message: "Record selected. You can now process the return.",
    });
  };

  // Process Return
  const handleReturn = async (e) => {
    e.preventDefault();

    if (!formData.returnDate || !formData.status) {
      setAlert({
        type: "warning",
        message: "Return Date and Status are required.",
      });
      return;
    }

    setLoading(true);
    setAlert({ type: "", message: "" });

    try {
      const updatedRecord = {
        ...borrowRecord,
        returnDate: formData.returnDate,
        status: formData.status,
        remarks: formData.remarks,
      };

      await updateBorrowRecord(borrowRecord.id, updatedRecord);

      setAlert({
        type: "success",
        message: "✓ Book return processed successfully.",
      });

      // Reset form
      setSearchInput("");
      setBorrowRecord(null);
      setFormData({ returnDate: "", status: "", remarks: "" });
    } catch {
      setAlert({
        type: "error",
        message: "Failed to process return.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center px-4 py-6">
      <div className="w-full max-w-4xl rounded-md p-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500">
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">
            Return Book
          </h2>

          {alert.message && (
            <AlertMessage type={alert.type} message={alert.message} />
          )}

          {!borrowRecord ? (
            // SEARCH FORM
            <form
              onSubmit={handleSearch}
              className="flex flex-col items-center"
            >
              <div className="w-full max-w-xl space-y-4 mb-6">
                <FloatingInput
                  label="Search by Register No or Acc No"
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  max-w-md
                  rounded-lg
                  bg-blue-600
                  py-3
                  text-white
                  font-semibold
                  transition
                  hover:bg-blue-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  disabled:opacity-60
                "
              >
                {loading ? "Searching..." : "Search Records"}
              </button>
            </form>
          ) : (
            // RETURN FORM
            <form
              onSubmit={handleReturn}
              className="flex flex-col items-center"
            >
              {/* Record Details */}
              <div className="w-full max-w-xl bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                <p className="text-sm text-gray-600 font-semibold">
                  Borrow Record Details:
                </p>
                <p className="text-lg font-semibold text-gray-800 mt-2">
                  {borrowRecord.bookTitle}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Student: {borrowRecord.studentName} ({borrowRecord.registerNo}
                  )
                </p>
                <p className="text-sm text-gray-600">
                  Issued on: {borrowRecord.issueDate}
                </p>
                <p className="text-sm text-gray-600">
                  Status: {borrowRecord.status}
                </p>
              </div>

              {/* Return Form Fields */}
              <div className="w-full max-w-xl space-y-4 mb-6">
                <FloatingInput
                  label="Return Date"
                  name="returnDate"
                  type="date"
                  value={formData.returnDate}
                  onChange={handleChange}
                  required
                />

                <FloatingInput
                  label="Return Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={statusOptions}
                  required
                />

                <FloatingInput
                  label="Remarks (Optional)"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full max-w-md space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full
                    rounded-lg
                    bg-green-600
                    py-3
                    text-white
                    font-semibold
                    transition
                    hover:bg-green-700
                    focus:outline-none
                    focus:ring-2
                    focus:ring-green-500
                    disabled:opacity-60
                  "
                >
                  {loading ? "Processing..." : "Process Return"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setBorrowRecord(null);
                    setSearchInput("");
                    setFormData({ returnDate: "", status: "", remarks: "" });
                  }}
                  className="
                    w-full
                    rounded-lg
                    bg-gray-300
                    py-3
                    text-gray-800
                    font-semibold
                    transition
                    hover:bg-gray-400
                  "
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Multiple Records Selection */}
          {borrowRecords.length > 0 && (
            <div className="w-full max-w-xl mt-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Select a record:
              </p>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {borrowRecords.map((record) => (
                  <button
                    key={record.id}
                    type="button"
                    onClick={() => handleSelectRecord(record)}
                    className="
                      w-full
                      p-3
                      text-left
                      bg-gray-50
                      border
                      border-gray-200
                      rounded-lg
                      hover:bg-blue-50
                      hover:border-blue-400
                      transition
                    "
                  >
                    <p className="font-semibold text-gray-800">
                      {record.bookTitle}
                    </p>
                    <p className="text-sm text-gray-600">
                      {record.studentName} - {record.registerNo}
                    </p>
                    <p className="text-xs text-gray-500">
                      Issued: {record.issueDate}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
