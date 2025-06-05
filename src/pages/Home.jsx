import React from 'react';
import homeImage from '../assets/images/bg/home-bg.jpg';

const Home = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center rounded-3xl mb-2 overflow-hidden shadow-xl"
      style={{ backgroundImage: `url(${homeImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#013243]/80 backdrop-blur-none" />

      {/* Admin Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl text-white">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
          Welcome to CNS Admin Dashboard
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 mb-4">
          Your central hub for managing facility operations with precision.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 text-left mt-8">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-yellow-500 mb-2">Service Control</h2>
            <p className="text-gray-100 text-sm">
              Add, modify, or monitor services such as plumbing, cleaning, electricals, and more.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-yellow-500 mb-2">User Profiles</h2>
            <p className="text-gray-100 text-sm">
              Manage user access, roles, permissions, and view activity logs in real-time.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-yellow-500 mb-2">Reports & Insights</h2>
            <p className="text-gray-100 text-sm">
              Analyze service performance and gain operational insights through dynamic dashboards.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-yellow-500 mb-2">System Settings</h2>
            <p className="text-gray-100 text-sm">
              Configure platform settings, integrations, and notification preferences with ease.
            </p>
          </div>
        </div>

        <a
          href="#dashboard"
          className="mt-10 inline-block bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full mb-8 shadow-md hover:bg-yellow-300 transition duration-300"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Home;
