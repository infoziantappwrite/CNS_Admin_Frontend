import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Servicedetails from './pages/Servicedetails';
axios.defaults.withCredentials = true; // ✅ Send cookies with all requests
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




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



// Assuming this is part of a component with useState for services and selectedService
const handleDelete = async (id) => {
 

  try {
    // Retrieve token from cookies
    const token = localStorage.getItem('token'); // Adjust cookie name if different

    if (!token) {
      alert('Please log in to delete a service request.');
      navigate('/login');
      return;
    }

    const response = await fetch(`https://cns-admin-production.up.railway.app/api/v1/serviceRequest/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies if httpOnly
    });

    if (!response.ok) {
      if (response.status === 401) {
        alert('Unauthorized: Invalid or expired token. Please log in again.');
        navigate('/login');
        return;
      }
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `Failed to delete service request: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error?.message || 'Error deleting service request');
    }

    // Update state only after successful deletion
    setServices((prev) => prev.filter((service) => service._id !== id));
    if (selectedService && selectedService._id === id) {
      setSelectedService(null);
    }

   
  } catch (err) {
    console.error('Delete error:', err);
    alert(`Error: ${err.message}`);
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
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
    
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
          <Route path='/servicedetails/:id' element={<Servicedetails/>}/>
          <Route path="/profile" element={<Profile />} />
         
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
