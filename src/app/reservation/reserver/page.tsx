'use client';
import { useState } from 'react';
import Navbar from '../../Navbar';

const ReservationPage = () => {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (departure === '' || destination === '') {
      setError('Veuillez remplir tous les champs');
    } else {
      setError('');
      // Logique de réservation ici
      console.log(`Réservation effectuée de ${departure} à ${destination}`);
    }
  };

  return (
    <div>
    <Navbar />
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Réservation</h2>
        <p className="text-center text-gray-600 mb-8">Veuillez sélectionner votre départ et votre destination</p>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="departure" className="block text-gray-700 font-medium">Départ</label>
            <input
              type="text"
              id="departure"
              placeholder='Entrer le départ'
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="destination" className="block text-gray-700 font-medium">Destination</label>
            <input
              type="text"
              id="destination"
              placeholder='Entrer la destination'
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Réserver
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ReservationPage;
