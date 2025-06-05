import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ServiceTable from './components/ServiceTable';
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [services, setServices] = useState([
    {
      _id: "6840c3978378f80b3eebaaf6",
      fullName: "Sundar Karthik",
      email: "sundar.karthik@example.com",
      phone: "9876543210",
      serviceDate: "2025-06-10T09:00:00.000Z",
      serviceType: "Housekeeping Services",
      serviceStatus: "Pending",
      serviceDescription: "Regular cleaning and dusting of the house including kitchen and bathrooms.",
      serviceLocation: "123, Main Street, Chennai",
      servicePriceEstimation: 1500,
      serviceRating: 5,
      serviceReview: "What ra dei waht is the problem i dono this is a demo review basically",
    }
  ]);

  const [selectedService, setSelectedService] = useState(null);

  const handleView = (service) => {
    setSelectedService(service);
  };

  const handleDelete = (id) => {
    setServices(services.filter(s => s._id !== id));
    if (selectedService && selectedService._id === id) {
      setSelectedService(null);
    }
  };

  function Profile() {
    return <h1 className="text-center mt-10 text-3xl font-bold">User Profile Page</h1>;
  }

  function Dashboard() {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-4">Service Dashboard</h2>
        <ServiceTable services={services} onView={handleView} onDelete={handleDelete} />
        {selectedService && (
          <div className="mt-8 p-6 border rounded-md bg-gray-50">
            <h3 className="text-2xl font-semibold mb-4">Service Details</h3>
            <p><strong>Full Name:</strong> {selectedService.fullName}</p>
            <p><strong>Email:</strong> {selectedService.email}</p>
            <p><strong>Phone:</strong> {selectedService.phone}</p>
            <p><strong>Service Type:</strong> {selectedService.serviceType}</p>
            <p><strong>Status:</strong> {selectedService.serviceStatus}</p>
            <p><strong>Service Date:</strong> {new Date(selectedService.serviceDate).toLocaleString()}</p>
            <p><strong>Description:</strong> {selectedService.serviceDescription}</p>
            <p><strong>Location:</strong> {selectedService.serviceLocation}</p>
            <p><strong>Price Estimation:</strong> ₹{selectedService.servicePriceEstimation}</p>
            <p><strong>Rating:</strong> {selectedService.serviceRating} / 5</p>
            <p><strong>Review:</strong> {selectedService.serviceReview}</p>
            <button
              onClick={() => setSelectedService(null)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <Header />

      <main className="mt-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
