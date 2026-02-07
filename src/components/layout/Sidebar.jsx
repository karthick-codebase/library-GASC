import { NavLink } from "react-router-dom";
import "../../index.css";

const navItems = [
  { name: "Home", path: "/" },
  { name: "View Books", path: "/viewbook" },
  { name: "Add Book", path: "/addbook" },
  { name: "Delete Book", path: "/deletebook" },
  { name: "Update Book", path: "/updatebook" },
  { name: "Borrow Book", path: "/borrowbook" },
  { name: "Return Book", path: "/returnbook" },
  { name: "Borrow History", path: "/studenthistory" },
];

export default function Sidebar({ open, setOpen }) {
  return (
    <aside
      className={`
        h-screen
        fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform 
        lg:translate-x-0 lg:static transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex justify-between items-center px-4 py-4 border-b">
        <h2 className="text-xl font-bold">Library System</h2>
        <button className="lg:hidden text-gray-600" onClick={() => setOpen(false)}>
          ✕
        </button>
      </div>

      <nav className="mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `
              block px-6 py-3 text-gray-700 font-medium transition
              ${isActive ? "bg-blue-600 text-white" : "hover:bg-blue-100"}
              `
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
