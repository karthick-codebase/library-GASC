import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import ViewBooksPage from "./pages/ViewBooksPage";
import AddBookPage from "./pages/AddBookPage";
import DeleteBookPage from "./pages/DeleteBookPage";
import UpdateBookPage from "./pages/UpdateBookPage";
import BorrowBookPage from "./pages/BorrowBookPage";
import ReturnBookPage from "./pages/ReturnBookPage";
import StudentHistoryPage from "./pages/StudentHistoryPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<DashboardPage />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/addbook" element={<AddBookPage />} />
          <Route path="/deletebook" element={<DeleteBookPage />} />
          <Route path="/updatebook" element={<UpdateBookPage />} />
          <Route path="/viewbook" element={<ViewBooksPage />} />
          <Route path="/borrowbook" element={<BorrowBookPage />} />
          <Route path="/returnbook" element={<ReturnBookPage />} />
          <Route path="/studenthistory" element={<StudentHistoryPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
