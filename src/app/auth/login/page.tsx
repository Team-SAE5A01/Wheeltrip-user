'use client';
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import './loginPage.css'; // Import du CSS

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<{ email?: string; password?: string; server?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let errors: { email?: string; password?: string; server?: string } = {};

    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';

    if (Object.keys(errors).length > 0) {
      setError(errors);
      setLoading(false);
      return;
    }

    setError({});

    try {
      // Envoi de la requête avec gestion des cookies
      const response = await axios.post('/api/auth/login', { email, mot_de_passe: password }, { withCredentials: true });

      // Si la connexion est réussie, redirection vers le dashboard
      if (response.data?.success) {
        window.location.href = '/dashboard'; // Redirection
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      setError({ server: error.response?.data?.error || 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  }, [email, password, rememberMe]);

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-4">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-6">Please login to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`input-field ${error.email ? 'input-error' : ''}`}
            />
            {error.email && <p className="text-red-600 text-sm mt-1">{error.email}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`input-field ${error.password ? 'input-error' : ''}`}
            />
            {error.password && <p className="text-red-600 text-sm mt-1">{error.password}</p>}
          </div>

          <div className="flex items-center mb-6 justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox"
              />
              <label htmlFor="rememberMe" className="ml-2 text-gray-700">Remember Me</label>
            </div>

            <a href="/auth/forgot-password" className="text-blue-600 hover:underline text-sm">
              Forgot your password?
            </a>
          </div>

          {error.server && <p className="text-red-600 text-sm mb-4">{error.server}</p>}

          <button
            type="submit"
            className={`submit-btn ${loading || !email || !password ? 'bg-gray-400 cursor-not-allowed' : ''}`}
            disabled={loading || !email || !password}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <a href="/auth/register" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
