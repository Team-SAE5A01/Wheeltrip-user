"use client";
import React, { useEffect, useState } from 'react';

const DashboardPage: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') { // Vérifier si on est côté client
      const token = localStorage.getItem('access_token');

      if (token) {
        setAccessToken(token);
      } else {
        window.location.href = '/auth/login';
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      window.location.href = '/';
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to your Dashboard</h1>
      {accessToken ? (
        <div>
          <p>Your Access Token:</p>
          <div style={{ backgroundColor: '#f4f4f4', padding: '10px', marginTop: '10px' }}>
            <strong>{accessToken}</strong>
          </div>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#ff5733',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              cursor: 'pointer',
              marginTop: '20px',
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DashboardPage;
