'use client';
import { useState } from 'react';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    password: '',
    showPassword: false,
    isPMR: false,
    pmrType: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, birthDate, email, password } = formData;
    if (!firstName || !lastName || !birthDate || !email || !password) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setError('');
    // Traitez l'inscription ici (par exemple, appel API)
    console.log('Inscription avec :', formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Créez votre compte</h2>
        <p className="text-center text-gray-600 mb-8">Rejoignez Wheeltrip</p>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 font-medium">Prénom</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 font-medium">Nom</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="birthDate" className="block text-gray-700 font-medium">Date de naissance</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium">Mot de passe</label>
            <div className="relative">
              <input
                type={formData.showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setFormData((prevData) => ({ ...prevData, showPassword: !prevData.showPassword }))
                }
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600"
              >
                {formData.showPassword ? 'Masquer' : 'Afficher'}
              </button>
            </div>
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="isPMR"
              name="isPMR"
              checked={formData.isPMR}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="isPMR" className="text-gray-700 font-medium">
              Personne à mobilité réduite
            </label>
          </div>

          {formData.isPMR && (
            <div className="mb-4">
              <label htmlFor="pmrType" className="block text-gray-700 font-medium">Type de PMR</label>
              <input
                type="text"
                id="pmrType"
                name="pmrType"
                value={formData.pmrType}
                onChange={handleChange}
                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            S'inscrire
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Vous avez déjà un compte ?{' '}
            <a href="/auth/login" className="text-blue-600 hover:underline">
              Connectez-vous
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
