import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const [email, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Ensure we're only accessing localStorage on the client
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/auth/login'); // Redirect to login if no token is found
      return;
    }

    // Get email from localStorage and update state
    const name = localStorage.getItem('email');
    if (name) {
      setUserName(name);  // If email exists in localStorage, set it in the state
    } else {
      console.error('No email found in localStorage');
      router.push('/auth/login'); // Redirect to login page if email is not found
    }
  }, [router]);

  if (!email) return <div>Loading...</div>;  // Show loading if email is not found

  return (
    <div>
      <h1>Welcome to your Dashboard, {email}!</h1>
      {/* Other dashboard features */}
    </div>
  );
};

export default Dashboard;
