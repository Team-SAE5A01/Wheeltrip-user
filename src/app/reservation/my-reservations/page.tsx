'use client';
import React from 'react';

const MyReservationsPage = () => {
  // Données statiques des réservations
  const reservations = [
    {
      id: 1,
      type: 'Train',
      destination: 'Paris - Lyon',
      date: '2025-02-15',
      status: 'Confirmée',
    },
    {
      id: 2,
      type: 'Avion',
      destination: 'Paris - New York',
      date: '2025-03-10',
      status: 'En attente',
    },
    {
      id: 3,
      type: 'Train',
      destination: 'Paris - Marseille',
      date: '2025-04-05',
      status: 'Confirmée',
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mes Réservations</h1>
      {reservations.length === 0 ? (
        <p>Aucune réservation trouvée.</p>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Destination</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="border px-4 py-2">{reservation.type}</td>
                <td className="border px-4 py-2">{reservation.destination}</td>
                <td className="border px-4 py-2">{reservation.date}</td>
                <td className="border px-4 py-2">{reservation.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyReservationsPage;