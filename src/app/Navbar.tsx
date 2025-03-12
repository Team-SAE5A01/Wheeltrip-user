'use client';

import React, { useState, useEffect } from 'react';
import './auth/login/loginPage.css';  // Assurez-vous d'importer votre fichier CSS

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifier si l'access_token est présent dans localStorage
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Supprimer le token du localStorage
    localStorage.removeItem('access_token');
    // Rediriger vers la page d'accueil après déconnexion
    window.location.href = '/';
  };

  return (
    <nav className="bg-login p-4">  {/* Utilisation de la classe bg-login avec le dégradé */}
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
              src="/icon-profile.png" // Remplacez par le chemin de ton icône
              alt="Profile"
              className="rounded-full"
            />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
              {isAuthenticated ? (
                <>
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Profil
                  </a>
                  <a
                    href="/reservation/my-reservations"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Mes trajets
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-gray-800 text-left hover:bg-gray-200"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
