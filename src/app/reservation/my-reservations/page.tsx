'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../../Navbar";
import jwt from 'jsonwebtoken'; // Pour décoder le token JWT

const MyReservationsPage = () => {
  const [reservations, setReservations] = useState<any[]>([]); // État pour stocker les trajets
  const [loading, setLoading] = useState(true); // État pour indiquer que les données sont en cours de chargement
  const [error, setError] = useState<string | null>(null); // État pour gérer les erreurs
  const [userId, setUserId] = useState<string | null>(null); // État pour stocker l'ID de l'utilisateur
  const [newReservation, setNewReservation] = useState<any | null>(null); // État pour stocker la nouvelle réservation

  // Fonction pour récupérer les trajets via l'API
  const fetchReservations = async (userId: string) => {
    const apiUrl = `http://15.188.63.187:4500/api/trajets/user/${userId}`; // Utilisation de l'ID utilisateur dynamique
    try {
      const response = await axios.get(apiUrl);
      setReservations(response.data); // Mettre à jour l'état avec les trajets récupérés
      setLoading(false); // Fin du chargement
    } catch (error) {
      setError('Erreur lors de la récupération des trajets');
      setLoading(false);
    }
  };

  // Charger la nouvelle réservation depuis localStorage
  const loadNewReservation = () => {
    const savedReservation = JSON.parse(localStorage.getItem('reservations') || '[]');
    if (savedReservation.length > 0) {
      setNewReservation(savedReservation[savedReservation.length - 1]); // Récupérer la dernière réservation
    }
  };

  // Décoder le token pour récupérer l'ID utilisateur
  useEffect(() => {
    const token = localStorage.getItem("access_token"); // Récupère le token depuis localStorage
    if (token) {
      const decodedToken: any = jwt.decode(token); // Décode le token JWT
      if (decodedToken && decodedToken.id) {
        setUserId(decodedToken.id); // Met à jour l'état avec l'ID de l'utilisateur
      } else {
        setError('Token invalide');
        setLoading(false);
      }
    } else {
      setError('Token non trouvé');
      setLoading(false);
    }
  }, []);

  // Charger les réservations lorsque l'ID utilisateur est disponible
  useEffect(() => {
    if (userId) {
      fetchReservations(userId);
    }
  }, [userId]);

  // Charger la nouvelle réservation depuis localStorage
  useEffect(() => {
    loadNewReservation();
  }, []);

  // Si en cours de chargement
  if (loading) {
    return <div>Chargement des trajets...</div>;
  }

  // Si erreur
  if (error) {
    return <div>{error}</div>;
  }

  // Si aucune réservation
  if (reservations.length === 0 && !newReservation) {
    return <div>Aucune réservation trouvée.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Mes Réservations</h1>
      <table className="min-w-full table-auto bg-white border-collapse shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Type</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Destination</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Statut</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((trip: any) => (
            <tr key={trip.trip_id} className="border-t">
              <td className="px-6 py-4 text-sm text-gray-700">
                {trip.steps.map((step: any) => step.mode).join(', ')} {/* Affiche les modes de transport */}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {trip.origin} - {trip.destination}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {new Date(trip.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">{trip.status}</td>
            </tr>
          ))}

          {/* Ajouter la nouvelle réservation ici */}
          {newReservation && (
            <tr className="border-t">
              <td className="px-6 py-4 text-sm text-gray-700">
                {newReservation.type}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {newReservation.destination}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {newReservation.date}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">{newReservation.status}</td>
            </tr>
          )}
        </tbody>
      </table>
    
      <div className="flex justify-center mt-6">
        <button
          onClick={() => window.location.href = '/reservation/reserver'}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          + Réserver un trajet
        </button>
      </div>
    </div>
  );
};

export default MyReservationsPage;
