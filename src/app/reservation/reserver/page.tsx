'use client';
import { useState } from 'react';
import Navbar from '../../Navbar';
import { useRouter } from 'next/navigation'; // Importation du useRouter pour la redirection

const ReservationPage = () => {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('planned');
  const [error, setError] = useState('');
  const router = useRouter(); // Initialisation du useRouter

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (departure === '' || destination === '' || date === '') {
      setError('Veuillez remplir tous les champs');
    } else {
      setError('');
      // Créer une nouvelle réservation
      const newReservation = {
        type: 'bus, train',  // Exemple de type, tu peux adapter
        destination: `${departure} - ${destination}`,
        date: new Date(date).toLocaleDateString('fr-FR'), // Format français pour la date
        status,
      };
  
      // Sauvegarder la réservation dans localStorage
      const existingReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
      existingReservations.push(newReservation);
      localStorage.setItem('reservations', JSON.stringify(existingReservations));
  
      // Logique de réservation
      console.log(`Réservation effectuée de ${departure} à ${destination} le ${newReservation.date} avec statut ${status}`);
  
      // Redirection vers la page des réservations
      router.push('/reservation/my-reservations'); // Redirige vers la page des réservations
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
                placeholder="Entrer le départ"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="destination" className="block text-gray-700 font-medium">Destination</label>
              <input
                type="text"
                id="destination"
                placeholder="Entrer la destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700 font-medium">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700 font-medium">Type</label>
              <select
                id="type"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="planned">Planned</option>
              </select>
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
