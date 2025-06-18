import React, { useState } from "react";
import Logo from "../atoms/Logo";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full -top-7 h-16 bg-gradient-to-r from-purple-700 to-pink-500 shadow-md z-50">
      <div className="max-w-7xl mx-auto h-full flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="flex items-center">
          <select className="bg-transparent border-none text-white mr-4">
            <option>Valerio v1.2</option>
          </select>
          <nav className="hidden md:flex space-x-6">
            <a
              href="#home"
              className="text-white hover:text-purple-100 transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#features"
              className="text-white hover:text-purple-100 transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-white hover:text-purple-100 transition-colors duration-200"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="text-white hover:text-purple-100 transition-colors duration-200"
            >
              Contact
            </a>
          </nav>
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-purple-600 to-pink-400">
          <nav className="flex flex-col items-center py-4 space-y-4">
            <a
              href="#home"
              className="text-white hover:text-purple-100 transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              Home
            </a>
            <a
              href="#features"
              className="text-white hover:text-purple-100 transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-white hover:text-purple-100 transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="text-white hover:text-purple-100 transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
