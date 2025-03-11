'use client';
import Navbar from '../Navbar';
import { useEffect, useState } from 'react';
import '../auth/login/loginPage.css'; // Assurez-vous que le chemin est correct selon l'endroit où vous placez le fichier CSS

const ProfilePage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div>
      <Navbar/>
      <div className="login-container">
        <div className="login-form-container">
          <h1 className="text-center text-blue-600">Profil de l'utilisateur</h1>
          <div><strong>ID:</strong> {profile.id}</div>
          <div><strong>Email:</strong> {profile.email}</div>
          <div><strong>Nom:</strong> {profile.name}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
