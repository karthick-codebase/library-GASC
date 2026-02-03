import { useEffect, useState } from "react";
import FloatingInput from "./FloatingInput.jsx";
import AlertMessage from "./AlertMessage.jsx";
import BookAvailabilityBadge from "./BookAvailabilityBadge.jsx";
import { getBookStatus } from "../utils/bookAvailability.js";
import {
  getAllBorrowedBooks,
  getBookByAccNo,
  addBorrowRecord,
} from "../../services/api";

export default function BookBorrowForm() {
  const [formData, setFormData] = useState({
    registerNo: "",
    studentName: "",
    accNo: "",
    bookTitle: "",
    issueDate: "",
    status: "Borrowed",
  });

  const [alert, setAlert] = useState({ type: "", message: "" });
  const [loadingBook, setLoadingBook] = useState(false);
  const [bookStatus, setBookStatus] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  // Fetch borrowed books on component mount
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const data = await getAllBorrowedBooks();
        setBorrowedBooks(data);
      } catch {
        console.error("Failed to fetch borrowed books");
      }
    };

    fetchBorrowedBooks();
  }, []);

  // -----------------------------
  // Handle Input Change
  // -----------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------
  // Validate Acc No ON BLUR - Fetch Book Title & Check Availability
  // -----------------------------
  const handleAccNoBlur = async () => {
    if (!formData.accNo.trim()) {
      setAlert({
        type: "error",
        message: "Acc No is required.",
      });
      setBookStatus(null);
      return;
    }

    setLoadingBook(true);
    setAlert({ type: "", message: "" });

    try {
      const data = await getBookByAccNo(formData.accNo);

      if (data.length > 0) {
        setFormData((prev) => ({
          ...prev,
          bookTitle: data[0].title,
        }));

        // Check book availability
        const availability = getBookStatus(formData.accNo, borrowedBooks);
        setBookStatus(availability);

        if (!availability.isAvailable) {
          setAlert({
            type: "warning",
            message: `⚠️ Book is currently ${availability.status.toLowerCase()}. Cannot borrow at this moment.`,
          });
        } else {
          setAlert({ type: "", message: "" });
        }
      } else {
        setAlert({
          type: "error",
          message: "Book not found for the given Acc No.",
        });
        setFormData((prev) => ({
          ...prev,
          bookTitle: "",
        }));
        setBookStatus(null);
      }
    } catch {
      setAlert({
        type: "error",
        message: "Failed to fetch book details.",
      });
    } finally {
      setLoadingBook(false);
    }
  };

  // -----------------------------
  // Submit - Check Availability Before Borrowing
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.registerNo ||
      !formData.studentName ||
      !formData.accNo ||
      !formData.issueDate
    ) {
      setAlert({
        type: "warning",
        message: "All fields are required.",
      });
      return;
    }

    // Check if book is still available
    const currentStatus = getBookStatus(formData.accNo, borrowedBooks);
    if (!currentStatus.isAvailable) {
      setAlert({
        type: "error",
        message: `Cannot borrow: Book is currently ${currentStatus.status.toLowerCase()}.`,
      });
      return;
    }

    try {
      await addBorrowRecord(formData);

      // Refresh borrowed books
      const refreshData = await getAllBorrowedBooks();
      setBorrowedBooks(refreshData);

      setAlert({
        type: "success",
        message: "✓ Book borrowed successfully.",
      });

      setFormData({
        registerNo: "",
        studentName: "",
        accNo: "",
        bookTitle: "",
        issueDate: "",
        status: "Borrowed",
      });
      setBookStatus(null);
    } catch {
      setAlert({
        type: "error",
        message: "Failed to borrow book.",
      });
    }
  };

  return (
    <div className="flex justify-center px-4 py-6">
      <div className="w-full max-w-4xl rounded-md p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">
            Book Borrow Form
          </h2>

          {alert.message && (
            <div className="mb-6">
              <AlertMessage type={alert.type} message={alert.message} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="w-full max-w-xl space-y-4">
              <FloatingInput
                label="Register Number"
                name="registerNo"
                value={formData.registerNo}
                onChange={handleChange}
                required
              />

              <FloatingInput
                label="Student Name"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                required
              />

              <FloatingInput
                label="Acc No"
                name="accNo"
                value={formData.accNo}
                onChange={handleChange}
                onBlur={handleAccNoBlur}
                required
              />

              <FloatingInput
                label="Book Title"
                name="bookTitle"
                value={
                  loadingBook ? "Fetching book title..." : formData.bookTitle
                }
                onChange={() => {}}
                className="pointer-events-none bg-gray-50"
              />

              {bookStatus && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">
                    📖 Book Availability:
                  </p>
                  <BookAvailabilityBadge
                    isAvailable={bookStatus.isAvailable}
                    status={bookStatus.status}
                  />
                </div>
              )}

              <FloatingInput
                label="Issue Date"
                name="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={!bookStatus?.isAvailable && bookStatus !== null}
              className="
                mt-6
                w-full
                max-w-md
                rounded-lg
                bg-blue-600
                py-3
                font-semibold
                text-white
                transition
                hover:bg-blue-700
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                disabled:bg-gray-400
                disabled:cursor-not-allowed
              "
            >
              Borrow Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
