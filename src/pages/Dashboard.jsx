// pages/Dashboard.jsx
import React from 'react';
import ServiceTable from '../components/ServiceTable';

export default function Dashboard({
  services,
  onView,
  onDelete,
  selectedService,
  setSelectedService,
}) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Service Dashboard</h2>
      <ServiceTable services={services} onView={onView} onDelete={onDelete} />
      
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
