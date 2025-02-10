"use client"; // Exécution côté client

import React, { useState } from "react";

const ProfilePage: React.FC = () => {
  // États pour stocker les données du profil
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [birthDate, setBirthDate] = useState("1990-01-01");
  const [email, setEmail] = useState("johndoe@example.com");
  const [isPMR, setIsPMR] = useState(true);
  const [pmrType, setPmrType] = useState("Fauteuil roulant");

  // État pour savoir si on est en mode édition
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    alert("Profil mis à jour !");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col items-center space-y-6">
          
          {/* Avatar avec initiales */}
          <div
            className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-white text-3xl font-bold"
            aria-label={`Photo de profil de ${firstName} ${lastName}`}
            role="img"
          >
            <span>{firstName[0]}{lastName[0]}</span>
          </div>

          {/* Formulaire de modification */}
          <div className="w-full space-y-4">
            <div className="text-center space-y-2">
              <input 
                type="text" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                className="text-xl font-bold text-gray-900 text-center border-b-2 focus:outline-none"
                disabled={!isEditing}
              />
              <input 
                type="text" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                className="text-xl font-bold text-gray-900 text-center border-b-2 focus:outline-none"
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg text-gray-700">Date de naissance :</label>
              <input 
                type="date" 
                value={birthDate} 
                onChange={(e) => setBirthDate(e.target.value)} 
                className="w-full p-2 border rounded-lg"
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg text-gray-700">Adresse e-mail :</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full p-2 border rounded-lg"
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg text-gray-700">PMR :</label>
              <select 
                value={isPMR ? "Oui" : "Non"} 
                onChange={(e) => setIsPMR(e.target.value === "Oui")} 
                className="w-full p-2 border rounded-lg"
                disabled={!isEditing}
              >
                <option>Oui</option>
                <option>Non</option>
              </select>
            </div>

            {isPMR && (
              <div className="space-y-2">
                <label className="block text-lg text-gray-700">Type de PMR :</label>
                <input 
                  type="text" 
                  value={pmrType} 
                  onChange={(e) => setPmrType(e.target.value)} 
                  className="w-full p-2 border rounded-lg"
                  disabled={!isEditing}
                />
              </div>
            )}
          </div>

          {/* Boutons Modifier / Sauvegarder */}
          {isEditing ? (
            <button
              className="bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 text-white py-2 px-4 rounded-lg text-lg font-semibold transition-all"
              onClick={handleSave}
            >
              Sauvegarder
            </button>
          ) : (
            <button
              className="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 text-white py-2 px-4 rounded-lg text-lg font-semibold transition-all"
              onClick={() => setIsEditing(true)}
            >
              Modifier le profil
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
