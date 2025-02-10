// pages/forgot-password.tsx
'use client';

import React, { useState } from 'react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Appeler l'API pour envoyer le lien de réinitialisation
    const response = await fetch('/lien-API////////////////////////////////////////////////', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      setMessage('Un e-mail de réinitialisation a été envoyé.');
    } else {
      setMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Mot de passe oublié
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-lg text-gray-700">
              Adresse e-mail :
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 text-white py-2 px-4 rounded-lg text-lg font-semibold transition-all"
          >
            Envoyer le lien de réinitialisation
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
