// src/app/profile/page.tsx

'use client'

import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const email = localStorage.getItem('email'); // Récupère l'email depuis localStorage
      if (!email) {
        setError('Aucun email trouvé dans le stockage local');
        setLoading(false);
        return;
      }

      try {
        // Appel à l'API pour récupérer les données du profil
        const response = await fetch(`/api/profile?email=${encodeURIComponent(email)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du profil');
        }

        const data = await response.json();
        setProfile(data); // Met à jour l'état avec les données du profil
      } catch (error: any) {
        setError('Échec de la récupération des données du profil');
        console.error('Erreur:', error);
      } finally {
        setLoading(false); // Arrêter de charger une fois que la réponse est reçue
      }
    };

    fetchProfile();
  }, []);

  // Chargement
  if (loading) return <div>Chargement...</div>;

  // Erreur
  if (error) return <div>{error}</div>;

  // Si pas de données
  if (!profile) return <div>Aucun profil trouvé.</div>;

  return (
    <div>
      <h1>Profil de l'utilisateur</h1>
      <div>
        <strong>Email:</strong> {profile.email}
      </div>
      <div>
        <strong>Nom:</strong> {profile.name}
      </div>
      <div>
        <strong>Téléphone:</strong> {profile.phone}
      </div>
    </div>
  );
};

export default ProfilePage;
