"use client";
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './auth/login/loginPage.css'; // Assure-toi que le chemin est correct

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token); // Vérifie si le token existe dans le localStorage
  }, []);

  return (
    <div>
      <Navbar />
      <div className="custom-class"> {/* Utilise la classe personnalisée pour le fond dégradé */}
        <div className="login-form-container"> {/* Applique les styles du conteneur */}
          <div className="text-center max-w-2xl mx-auto p-8">
            <h1 className="text-5xl font-extrabold mb-4">Bienvenue sur Wheeltrip</h1>
            <p className="text-xl mb-6">Votre plateforme de réservation de voyages en train et en avion.</p>
            <div className="space-x-4">
              {/* Affichage des boutons en fonction de l'état d'authentification */}
              {!isAuthenticated ? (
                <>
                  <a
                    href="/auth/login"
                    className="submit-btn" // Utilise la classe submit-btn pour le bouton de connexion
                  >
                    Connexion
                  </a>
                  <a
                    href="/auth/register"
                    className="submit-btn" // Même pour le bouton d'inscription
                  >
                    Inscription
                  </a>
                </>
              ) : (
                <div className="space-x-4"> 
                  {/* Si l'utilisateur est authentifié, afficher les deux boutons */}
                  <a
                    href="/profile"
                    className="submit-btn"
                  >
                    Profil
                  </a>
                  <a
                    href="/reservation/my-reservations"
                    className="submit-btn"
                  >
                    Mes trajets
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
