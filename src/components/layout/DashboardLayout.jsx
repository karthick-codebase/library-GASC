import { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "../index.css";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex flex-col flex-1">
        {/* Top Navbar */}
        <header className="flex items-center bg-white shadow px-4 py-3 lg:hidden">
          <button
            className="text-gray-700"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
          <h1 className="ml-4 text-xl font-semibold">Dashboard</h1>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
