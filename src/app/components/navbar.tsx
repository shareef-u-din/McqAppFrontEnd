"use client";

import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";
import { FaSun, FaMoon, FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";

export default function ClientNavBar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar navbar-expand-lg sticky-top mb-4">
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold fs-4">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            MCQ App
          </span>
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center text-center">
            {user ? (
              <>
                <li className="nav-item">
                  <Link href="/questions" className="nav-link">
                    Questions
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/admin" className="nav-link">
                    Admin
                  </Link>
                </li>
                <li className="nav-item">
                  <button 
                    onClick={logout} 
                    className="nav-link btn btn-link text-decoration-none d-flex align-items-center gap-2 justify-content-center justify-content-lg-start"
                    aria-label="Logout"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link href="/login" className="nav-link d-flex align-items-center gap-2 justify-content-center justify-content-lg-start">
                    <FaSignInAlt /> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/register" className="nav-link d-flex align-items-center gap-2 justify-content-center justify-content-lg-start">
                    <FaUserPlus /> Register
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
              <button
                onClick={toggleTheme}
                className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2 mx-auto mx-lg-0"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <>
                    <FaSun size={16} />
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <FaMoon size={16} />
                    <span>Dark</span>
                  </>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
