import { useState } from "react";
import FloatingInput from "../components/common/FloatingInput";
import AlertMessage from "../components/common/AlertMessage";
import { getBookByAccNo, updateBook } from "../services/api";

export default function UpdateBookPage() {
  const [accNo, setAccNo] = useState("");
  const [bookId, setBookId] = useState(null);
  const [formData, setFormData] = useState(null);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const genreOptions = [
    "Tamil",
    "English",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Botany",
    "BBA",
    "B.Com",
    "Computer Science",
  ];

  // Handle input changes (edit mode)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // STEP 1: Fetch book by Acc No
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!accNo.trim()) {
      setAlert({
        type: "error",
        message: "Please enter Acc No.",
      });
      return;
    }

    setLoading(true);
    setAlert({ type: "", message: "" });
    setFormData(null);

    try {
      const data = await getBookByAccNo(accNo);

      if (!data.length) {
        setAlert({
          type: "warning",
          message: "Book not found with this Acc No.",
        });
        return;
      }

      setBookId(data[0].id);
      setFormData(data[0]);

      setAlert({
        type: "success",
        message: "Book data loaded. You can now update.",
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

  // STEP 2: Update book by ID
  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);
    setAlert({ type: "", message: "" });

    try {
      await updateBook(bookId, formData);

      setAlert({
        type: "success",
        message: "Book updated successfully.",
      });
    } catch {
      setAlert({
        type: "error",
        message: "Failed to update book.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center px-4 py-4">
      <div className="rounded-md p-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 w-full max-w-2xl">
        <div className="bg-white rounded-xl p-6 shadow-lg box-border">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">
            Update Book
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

          {/* UPDATE FORM */}
          {formData && (
            <form
              onSubmit={handleUpdate}
              className="flex flex-col items-center"
            >
              <div className="w-full max-w-xl space-y-4 mb-6">
                <FloatingInput
                  label="Accession Number"
                  name="accNo"
                  value={formData.accNo}
                  onChange={handleChange}
                  required
                  disabled={true}
                />

                <FloatingInput
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />

                <FloatingInput
                  label="Author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />

                <FloatingInput
                  label="Genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  options={genreOptions}
                />

                <FloatingInput
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                />

                <FloatingInput
                  label="Publisher"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                />

                <FloatingInput
                  label="Supplier"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                />

                <FloatingInput
                  label="Call Number"
                  name="callNo"
                  value={formData.callNo}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  max-w-md
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
                {loading ? "Updating..." : "Update Book"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
