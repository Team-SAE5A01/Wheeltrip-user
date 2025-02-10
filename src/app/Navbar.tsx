'use client';

import React, { useState } from 'react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-4">
      <div className="mx-auto flex justify-between items-center">
        <a href="/">
          <img src="/logo.png" alt="Logo" className="h-8" />
        </a>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
          >
            <img
              src="/icon-profile.png" // Replace with your icon path
              alt="Profile"
              className="rounded-full"
            />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
              <a
                href="/auth/login"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Connexion
              </a>
              <a
                href="/auth/register"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Inscription
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
