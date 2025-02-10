'use client';

import { apiBaseUrl } from "@/lib/appConfig";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
      <div className="text-center max-w-2xl mx-auto p-8">
        <h1 className="text-5xl font-extrabold mb-4">{apiBaseUrl}</h1>
        <p className="text-xl mb-6">This is the homepage. You can manage everything from here.</p>

        <div className="space-x-4">
          <a
            href="/auth/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Log In
          </a>
          <a
            href="/auth/register"
            className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition duration-200"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
