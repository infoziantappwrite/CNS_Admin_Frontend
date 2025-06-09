import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ServiceTable from './components/ServiceTable';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Review from './pages/Review';
axios.defaults.withCredentials = true; // ✅ Send cookies with all requests

function App() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        'https://cns-admin-production.up.railway.app/api/v1/serviceRequest'
      );


      if (response.data.success) {
        setServices(response.data.services);
      } else {
        setError('Failed to fetch services');
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
        navigate('/login');
      } else {
        setError(err.response?.data?.error || 'Something went wrong');
      }
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleView = (service) => {
    setSelectedService(service);
  };

  const handleDelete = (id) => {
    setServices((prev) => prev.filter((service) => service._id !== id));
    if (selectedService && selectedService._id === id) {
      setSelectedService(null);
    }
  };

  const handleUpdate = (updatedService) => {
    setServices((prev) =>
      prev.map((service) =>
        service._id === updatedService._id ? updatedService : service
      )
    );
  };

  return (
    <div className="max-w-8xl mx-auto p-3 font-sans">
      <Header />

      <main className="mt-2">
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
         
                <Dashboard
                  services={services}
                  onView={handleView}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                  selectedService={selectedService}
                  setSelectedService={setSelectedService}
                />
          
            }
          />
          <Route path="/profile" element={<Profile />} />
            <Route path="/review" element={<Review />} />
          <Route
            path="*"
            element={
              <h1 className="text-center text-red-500 text-2xl mt-10">
                404 - Page Not Found
              </h1>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
