"use client"; // Assure que ce composant est bien exécuté côté client

import React from "react";
import Link from "next/link";

const ProfilePage: React.FC = () => {
  const firstName = "John";
  const lastName = "Doe";
  const birthDate = "01/01/1990";
  const isPMR = true; // true si la personne est à mobilité réduite
  const pmrType = "Fauteuil roulant"; // Type de PMR si applicable
  const email = "johndoe@example.com";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col items-center space-y-6">
          
          {/* Avatar avec description accessible */}
          <div
            className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-white text-3xl font-bold"
            aria-label={`Photo de profil de ${firstName} ${lastName}`}
            role="img"
          >
            <span>{firstName[0]}{lastName[0]}</span> {/* Initiales */}
          </div>

          {/* Informations du profil */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900" tabIndex={0}>
              {firstName} {lastName}
            </h2>
            <p className="text-lg text-gray-700" tabIndex={0}>
              Date de naissance : {birthDate}
            </p>
            <p className="text-lg text-gray-700" tabIndex={0}>
              Adresse e-mail : <a href={`mailto:${email}`} className="text-blue-600 underline">{email}</a>
            </p>
            <p className="text-lg text-gray-700" tabIndex={0}>
              PMR : {isPMR ? "Oui" : "Non"}
            </p>
            {isPMR && (
              <p className="text-lg text-gray-700" tabIndex={0}>
                Type de PMR : {pmrType}
              </p>
            )}
          </div>
          
          {/* Bouton Modifier */}
          <Link href="/profile/edit">
            <button 
              
              className="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 text-white py-2 px-4 rounded-lg text-lg font-semibold transition-all"
              aria-label="Modifier le profil"
              aria-live="polite"
            >
              Modifier le profil
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;