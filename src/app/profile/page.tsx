'use client';
import Navbar from '../Navbar';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import './profile.css'; // Assurez-vous que le chemin est correct

const ProfilePage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token'); // Récupère le token JWT

      if (!token) {
        setError('Utilisateur non authentifié');
        setLoading(false);
        return;
      }

      try {
        // Appel à l'API avec le token
        const response = await fetch(`/api/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Envoi du token JWT
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du profil');
        }

        const data = await response.json();
        setProfile(data);
      } catch (error: any) {
        setError('Échec de la récupération des données du profil');
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>Aucun profil trouvé.</div>;

  const handleSave = () => {
    setIsEditing(false);
    alert('Profil mis à jour!');
    // Call the API to update profile data here, if necessary
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-form-container">
        <div className="flex flex-col items-center space-y-6">
          {/* Avatar avec description accessible */}
          <div
            className="profile-avatar"
            aria-label={`Photo de profil de ${profile.prenom} ${profile.nom}`}
            role="img"
          >
            <span>{profile.prenom[0]}{profile.nom[0]}</span> {/* Initiales */}
          </div>

          {/* Formulaire de modification */}
          <div className="w-full space-y-4">
            <div className="text-center space-y-2">
              <input
                type="text"
                value={profile.prenom}
                onChange={(e) => setProfile({ ...profile, prenom: e.target.value })}
                className="input-field"
                disabled={!isEditing}
              />
              <input
                type="text"
                value={profile.nom}
                onChange={(e) => setProfile({ ...profile, nom: e.target.value })}
                className="input-field"
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <label className="label">Date de naissance :</label>
              <input
                type="date"
                value={profile.date_naissance}
                onChange={(e) => setProfile({ ...profile, date_naissance: e.target.value })}
                className="input-field date-field"
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <label className="label">Adresse e-mail :</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="input-field"
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <label className="label">PMR :</label>
              <select
                value={profile.isPMR ? "Oui" : "Non"}
                onChange={(e) => setProfile({ ...profile, isPMR: e.target.value === "Oui" })}
                className="input-field select-field"
                disabled={!isEditing}
              >
                <option>Oui</option>
                <option>Non</option>
              </select>
            </div>

            {profile.isPMR && (
              <div className="space-y-2">
                <label className="label">Type de PMR :</label>
                <input
                  type="text"
                  value={profile.pmrType}
                  onChange={(e) => setProfile({ ...profile, pmrType: e.target.value })}
                  className="input-field"
                  disabled={!isEditing}
                />
              </div>
            )}
          </div>

          {/* Boutons Modifier / Sauvegarder */}
          {isEditing ? (
            <button
              className="button button-save"
              onClick={handleSave}
            >
              Sauvegarder
            </button>
          ) : (
            <button
              className="button button-edit"
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
