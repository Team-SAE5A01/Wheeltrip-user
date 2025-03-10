'use client';
import React, { useState, useEffect, useCallback } from 'react';
import './loginPage.css'; // Importer le fichier CSS

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const passwordCriteria = [
    { text: 'At least 8 characters', check: password.length >= 8 },
    { text: 'At least one uppercase letter', check: /[A-Z]/.test(password) },
    { text: 'At least one lowercase letter', check: /[a-z]/.test(password) },
    { text: 'At least one number', check: /[0-9]/.test(password) },
  ];

  const isPasswordValid = passwordCriteria.every((criterion) => criterion.check);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    let errors: { email?: string; password?: string } = {};

    if (!email) {
      errors.email = 'Email is required';
    }

    if (!isPasswordValid) {
      errors.password = 'Password does not meet all requirements';
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      setLoading(false);
      return;
    }

    setError({});
    console.log('Logging in with:', email, password);

    if (rememberMe) {
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('email');
    }

    setTimeout(() => {
      setLoading(false);
      alert('Login successful!');
    }, 1500);
  }, [email, password, rememberMe, isPasswordValid]);

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-4">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-6">Please login to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`input-field ${error.email ? 'input-error' : ''}`}
              aria-label="Email address"
            />
            {error.email && <p className="text-red-600 text-sm mt-1">{error.email}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`input-field ${error.password ? 'input-error' : ''}`}
              aria-label="Password"
            />
            <div className="criteria-list">
              {passwordCriteria.map((criterion, index) => (
                <p key={index} className={criterion.check ? 'criteria-check' : 'criteria-error'}>
                  {criterion.check ? '✓' : 'X'} {criterion.text}
                </p>
              ))}
            </div>
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
              <label htmlFor="rememberMe" className="ml-2 text-gray-700">
                Remember Me
              </label>
            </div>

            <a href="/auth/forgot-password" className="text-blue-600 hover:underline text-sm">
              Forgot your password?
            </a>
          </div>

          <button
            type="submit"
            className={`submit-btn ${loading || !isPasswordValid || !email ? 'bg-gray-400 cursor-not-allowed' : ''}`}
            disabled={loading || !isPasswordValid}
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
