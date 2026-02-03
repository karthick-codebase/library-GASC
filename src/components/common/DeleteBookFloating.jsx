import { useState } from "react";
import FloatingInput from "./FloatingInput.jsx";
import AlertMessage from "./AlertMessage.jsx";
import { getBookByAccNo, deleteBook } from "../../services/api";

export default function DeleteBookFloating() {
  const [accNo, setAccNo] = useState("");
  const [book, setBook] = useState(null);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  // STEP 1: Search for book by Acc No
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!accNo.trim()) {
      setAlert({
        type: "error",
        message: "Acc No is required.",
      });
      return;
    }

    setLoading(true);
    setAlert({ type: "", message: "" });
    setBook(null);

    try {
      const books = await getBookByAccNo(accNo);

      if (!books.length) {
        setAlert({
          type: "warning",
          message: "Book not found with this Acc No.",
        });
        return;
      }

      setBook(books[0]);
      setAlert({
        type: "success",
        message: "Book found. You can now delete it.",
      });
    } catch {
      setAlert({
        type: "error",
        message: "Failed to fetch book data.",
      });
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Delete the book
  const handleDelete = async (e) => {
    e.preventDefault();

    setLoading(true);
    setAlert({ type: "", message: "" });

    try {
      await deleteBook(book.id);

      setAlert({
        type: "success",
        message: "Book deleted successfully.",
      });

      setAccNo("");
      setBook(null);
    } catch {
      setAlert({
        type: "error",
        message: "Server error. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center px-4 py-4">
      <div className="rounded-md p-1 bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 w-full max-w-xl">
        <div className="bg-white rounded-xl p-6 shadow-lg box-border">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">
            Delete Book
          </h2>

          {alert.message && (
            <AlertMessage type={alert.type} message={alert.message} />
          )}

          {/* SEARCH FORM */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col items-center mb-8"
          >
            <div className="w-full max-w-xl space-y-4">
              <FloatingInput
                label="Acc No"
                name="accNo"
                value={accNo}
                onChange={(e) => setAccNo(e.target.value)}
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
              {loading ? "Searching..." : "Search Book"}
            </button>
          </form>

          {/* DELETE FORM */}
          {book && (
            <form
              onSubmit={handleDelete}
              className="flex flex-col items-center"
            >
              <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200 w-full max-w-md">
                <p className="text-sm text-gray-600">Book to be deleted:</p>
                <p className="text-lg font-semibold text-gray-800 mt-2">
                  {book.title}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Author: {book.author}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  max-w-md
                  rounded-lg
                  bg-red-600
                  py-3
                  text-white
                  font-semibold
                  transition
                  hover:bg-red-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-red-500
                  disabled:opacity-60
                "
              >
                {loading ? "Deleting..." : "Delete Book"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
