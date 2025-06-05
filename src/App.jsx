import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ServiceTable from './components/ServiceTable';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';

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
    setServices(prevServices => prevServices.filter(service => service._id !== id));
    if (selectedService && selectedService._id === id) {
      setSelectedService(null);
    }
  };

  return (
    <div className="max-w-8xl mx-auto p-3 font-sans">
      <Header />

      <main className="mt-2">
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
                selectedService={selectedService}
                setSelectedService={setSelectedService}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<h1 className="text-center text-red-500 text-2xl mt-10">404 - Page Not Found</h1>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
