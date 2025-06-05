// components/Header.jsx
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo/logo.png';

export default function Header() {
  return (
    <header className="bg-[#013243] text-white shadow-md px-8 py-4 rounded-b-3xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="CNS Logo" className="w-25 h-10 " />
          
        </div>

        {/* Navigation */}
        <nav className="flex space-x-6 items-center font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400 transition"
            }
          >
            Home
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
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400 transition"
            }
          >
            Dashboard
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
