// components/Header.jsx
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-[#013243] text-white shadow-md px-6 py-4 rounded-b-3xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="CNS Logo" className="w-10 h-10 rounded-full" />
          <span className="text-xl font-bold">CNS</span>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-6 items-center font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400 transition"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400 transition"
            }
          >
            Login
          </NavLink>
          
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400 transition"
            }
          >
            Profile
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
