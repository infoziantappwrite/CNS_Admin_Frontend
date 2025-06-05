// pages/Home.jsx
import React from 'react';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto mt-5 px-4">
      <h1 className="mb-4 text-3xl font-bold">Welcome to the Service Dashboard</h1>
      <p className="text-lg mb-6">
        This is your home page. Use the navigation above to login, view your profile, and manage services.
      </p>

      <div className="bg-white shadow-md rounded-md p-6">
        <h5 className="text-xl font-semibold mb-2">Our Services</h5>
        <p className="mb-4">
          We offer a variety of home services including housekeeping, pest control, plumbing, electrical repairs, and more.
        </p>
        <a
          href="#services"
          className="inline-block bg-teal-800 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
        >
          Explore Services
        </a>
      </div>
    </div>
  );
};

export default Home;
