import { useState } from "react";
import FloatingInput from "./FloatingInput.jsx";
import AlertMessage from "./AlertMessage.jsx";
import BookAvailabilityBadge from "./BookAvailabilityBadge.jsx";
import {
  getBorrowedBooksByRegisterNo,
  getBorrowedBooksByAccNo,
  updateBorrowRecord,
} from "../../services/api";

export default function BookReturnForm() {
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

  // -------------------------
  // Handle Input Change
  // -------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -------------------------
  // Search Borrowed Book
  // -------------------------
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

  // -------------------------
  // Select a record from list
  // -------------------------
  const handleSelectRecord = (record) => {
    setBorrowRecord(record);
    setBorrowRecords([]);
    setAlert({
      type: "success",
      message: "Book record selected. You can now process the return.",
    });
  };

  // -------------------------
  // Submit Return Form
  // -------------------------
  const handleSubmit = async (e) => {
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
        message: "✓ Book returned successfully.",
      });

      setSearchInput("");
      setBorrowRecord(null);
      setFormData({
        returnDate: "",
        status: "",
        remarks: "",
      });
    } catch {
      setAlert({
        type: "error",
        message: "Failed to process book return.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center px-4 py-6">
      <div className="w-full max-w-4xl rounded-md p-1 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500">
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">
            Book Return Form
          </h2>

          {alert.message && (
            <div className="mb-6">
              <AlertMessage type={alert.type} message={alert.message} />
            </div>
          )}

          {/* SEARCH FORM */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col items-center mb-8"
          >
            <div className="w-full max-w-xl space-y-4">
              <FloatingInput
                label="Register Number or Acc No"
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
                mt-6
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
              {loading ? "Searching..." : "Search Borrowed Book"}
            </button>
          </form>

          {/* SELECT FROM MULTIPLE RECORDS */}
          {borrowRecords.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Select a Record to Return
              </h3>
              <div className="space-y-3">
                {borrowRecords.map((record) => (
                  <button
                    key={record.id}
                    type="button"
                    onClick={() => handleSelectRecord(record)}
                    className="w-full text-left p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                  >
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p>
                        <span className="font-semibold">Student:</span>{" "}
                        {record.studentName}
                      </p>
                      <p>
                        <span className="font-semibold">Register:</span>{" "}
                        {record.registerNo}
                      </p>
                      <p>
                        <span className="font-semibold">Book:</span>{" "}
                        {record.bookTitle}
                      </p>
                      <p>
                        <span className="font-semibold">Issue Date:</span>{" "}
                        {record.issueDate}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* RETURN FORM */}
          {borrowRecord && (
            <form onSubmit={handleSubmit}>
              {/* Display Borrow Details */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Borrowed Book Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-600">Student Name</p>
                    <p className="font-semibold text-gray-800">
                      {borrowRecord.studentName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Register Number</p>
                    <p className="font-semibold text-gray-800">
                      {borrowRecord.registerNo}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Book Title</p>
                    <p className="font-semibold text-gray-800">
                      {borrowRecord.bookTitle}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Issue Date</p>
                    <p className="font-semibold text-gray-800">
                      {borrowRecord.issueDate}
                    </p>
                  </div>
                </div>

                {/* Current Status Display */}
                <div className="pt-4 border-t border-gray-300">
                  <p className="text-gray-600 text-sm mb-2">Current Status:</p>
                  <BookAvailabilityBadge
                    isAvailable={borrowRecord.status === "Returned"}
                    status={borrowRecord.status}
                  />
                </div>
              </div>

              {/* Return Form Fields */}
              <div className="w-full space-y-4 mb-6">
                <FloatingInput
                  label="Return Date"
                  name="returnDate"
                  type="date"
                  value={formData.returnDate}
                  onChange={handleChange}
                  required
                />

                <FloatingInput
                  label="Status"
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
                {loading ? "Processing..." : "Return Book"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
