import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-2xl font-bold">
          Wheeltrip
        </a>
        <div className="space-x-4">
          <a href="/auth/login" className="text-white hover:text-gray-200">
            Connexion
          </a>
          <a href="/auth/register" className="text-white hover:text-gray-200">
            Inscription
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
