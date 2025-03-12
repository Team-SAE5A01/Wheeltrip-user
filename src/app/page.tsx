'use client';
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./auth/login/loginPage.css";

// Importing new icons from react-icons
import { FaBus, FaLifeRing, FaSuitcase } from 'react-icons/fa';

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="relative min-h-screen text-white" style={{ background: "linear-gradient(to bottom, #3b82f6, #1e40af, #000000)" }}>
      <Navbar />
      
      {/* Section avec l'image de fond et texte explicatif */}
      <div 
        className="relative bg-cover bg-center text-white py-20 px-8 text-center"
        style={{ backgroundImage: "url('/PMR.jpg')", backgroundBlendMode: "overlay", backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      >
        <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">Pourquoi Wheeltrip ?</h1>
        <p className="text-2xl mb-8 font-light">Wheeltrip est une plateforme de réservation dédiée aux personnes à mobilité réduite (PMR), offrant une solution de transport multimodal accessible et personnalisée. Notre mission est de rendre les voyages plus faciles et plus sûrs pour tous.</p>
      </div>

      {/* Section des services avec padding en dessous */}
      <div className="mt-16 px-8 flex flex-wrap justify-center gap-8 pb-16">
        <div className="bg-white text-blue-900 p-6 rounded-2xl shadow-xl flex flex-col items-center w-full sm:w-72 md:w-80 lg:w-96 xl:w-1/4 transform transition-all duration-700 ease-in-out hover:scale-105">
          <FaBus className="h-12 w-12 text-blue-900 mb-4" />
          <h2 className="text-xl font-bold">Réserver vos trajets</h2>
          <p className="text-center text-gray-700">Réservez vos trajets en toute simplicité.</p>
        </div>
        <div className="bg-white text-blue-900 p-6 rounded-2xl shadow-xl flex flex-col items-center w-full sm:w-72 md:w-80 lg:w-96 xl:w-1/4 transform transition-all duration-700 ease-in-out hover:scale-105">
          <FaLifeRing className="h-12 w-12 text-blue-900 mb-4" />
          <h2 className="text-xl font-bold">Assistance personnalisée</h2>
          <p className="text-center text-gray-700">Préparer une assistance adaptée aux différents types de PMR.</p>
        </div>
        <div className="bg-white text-blue-900 p-6 rounded-2xl shadow-xl flex flex-col items-center w-full sm:w-72 md:w-80 lg:w-96 xl:w-1/4 transform transition-all duration-700 ease-in-out hover:scale-105">
          <FaSuitcase className="h-12 w-12 text-blue-900 mb-4" />
          <h2 className="text-xl font-bold">Suivi du trajet et des bagages</h2>
          <p className="text-center text-gray-700">Visualiser votre statut et celui de vos bagages.</p>
        </div>
      </div>

      {/* Nouvelle section sous l'introduction avec image de fond */}
      <div 
        className="relative bg-cover bg-center text-white py-20 px-8 text-center"
        style={{ backgroundImage: "url('/PMR2.jpg')", backgroundBlendMode: "overlay", backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      >
        <h2 className="text-4xl font-extrabold mb-6 drop-shadow-lg">Pourquoi Wheeltrip ?</h2>
        <p className="text-xl mb-8 font-light">Proposer une solution pour donner une assistance pour les changements de transports, en facilitant les déplacements pour les personnes à mobilité réduite grâce à une plateforme de réservation de transports multimodaux accessible et personnalisée.</p>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center py-6 mt-16">
        <p className="text-sm">&copy; 2025 Wheeltrip. Tous droits réservés.</p>
        <div className="mt-4">
          <a href="/privacy-policy" className="text-white hover:text-gray-300 mx-4">Politique de confidentialité</a>
          <a href="/terms-of-service" className="text-white hover:text-gray-300 mx-4">Conditions d'utilisation</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
