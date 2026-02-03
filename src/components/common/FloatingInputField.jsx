import { useState } from "react";
import FloatingInput from "./FloatingInput.jsx";
import AlertMessage from "./AlertMessage.jsx";
import { addBook } from "../../services/api";

export default function BookFormFloating() {
  const [formData, setFormData] = useState({
    accNo: "",
    title: "",
    author: "",
    genre: "",
    price: "",
    publisher: "",
    supplier: "",
    callNo: "",
  });

  const [alert, setAlert] = useState({ type: "", message: "" });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.accNo || !formData.title || !formData.author) {
      setAlert({
        type: "error",
        message: "Acc No, Title, and Author are required.",
      });
      return;
    }

    try {
      await addBook(formData);

      setAlert({ type: "success", message: "Book added successfully." });

      setFormData({
        accNo: "",
        title: "",
        author: "",
        genre: "",
        price: "",
        publisher: "",
        supplier: "",
        callNo: "",
      });
    } catch {
      setAlert({
        type: "error",
        message: "Failed to connect to the server.",
      });
    }
  };

  return (
    <div className="flex justify-center px-4 py-4">
      <div className="rounded-md p-1 bg-gradient-to-r from-red-500 via-purple-500 to-yellow-500 w-full max-w-4xl">
        <div className="w-full bg-white rounded-xl p-6 shadow-lg box-border">
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-800">
            Book Information Form
          </h2>

          {alert.message && (
            <div
              className={`mb-6 rounded-lg px-4 py-3 text-white ${
                alert.type === "success" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {alert.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="w-full max-w-xl space-y-4">
              <FloatingInput
                label="Acc No"
                name="accNo"
                value={formData.accNo}
                onChange={handleChange}
                required
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

              {/* ✅ Department Dropdown */}
              <FloatingInput
                label="Department"
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
                label="Call No"
                name="callNo"
                value={formData.callNo}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full max-w-md mt-6 rounded-lg bg-blue-600 py-3 text-white font-semibold transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
