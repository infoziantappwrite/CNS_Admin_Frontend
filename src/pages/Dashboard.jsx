import React, { useState } from 'react';
import ServiceTable from '../components/ServiceTable';
import {
  XMarkIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarDaysIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  StarIcon,
  ClipboardDocumentListIcon,
  WrenchScrewdriverIcon,
  CheckBadgeIcon,
  ClockIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';

export default function Dashboard({ services, onView, onDelete,  onUpdate, selectedService, setSelectedService }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState('');
  const [editedEstimation, setEditedEstimation] = useState('');

  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    Completed: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800'
  };

  const handleEditClick = () => {
    setEditedStatus(selectedService.serviceStatus);
    setEditedEstimation(selectedService.servicePriceEstimation);
    setIsEditing(true);
  };

 const handleSave = () => {
  console.log('Save clicked'); // ✅ Debug log
  const updatedService = {
    ...selectedService,
    serviceStatus: editedStatus,
    servicePriceEstimation: editedEstimation
  };

  onUpdate(updatedService); 
  setSelectedService(null);
  setIsEditing(false);
};


  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen rounded-2xl bg-gradient-to-br from-[#5f737a] to-[#013243] p-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-6 text-center">Service Dashboard</h2>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 sm:p-6 text-black">
          <ServiceTable services={services} onView={onView} onDelete={onDelete} />
        </div>

        {/* MODAL */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="bg-white text-black rounded-lg shadow-2xl w-full max-w-3xl p-6 sm:p-8 relative overflow-y-auto max-h-[90vh]">
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
                aria-label="Close"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>

              <h3 className="text-2xl font-bold text-[#013243] mb-4 flex items-center gap-2">
                <ClipboardDocumentListIcon className="h-6 w-6 text-[#013243]" />
                Service Details
              </h3>

              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-gray-800">
                {/* Display fields */}
                <p className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-[#013243]" />
                  <strong>Full Name:</strong> {selectedService.fullName}
                </p>
                <p className="flex items-center gap-2">
                  <EnvelopeIcon className="h-5 w-5 text-[#013243]" />
                  <strong>Email:</strong> {selectedService.email}
                </p>
                <p className="flex items-center gap-2">
                  <PhoneIcon className="h-5 w-5 text-[#013243]" />
                  <strong>Phone:</strong> {selectedService.phone}
                </p>
                <p className="flex items-center gap-2">
                  <WrenchScrewdriverIcon className="h-5 w-5 text-[#013243]" />
                  <strong>Service Type:</strong> {selectedService.serviceType}
                </p>

               {/* Editable Status */}
<div className="flex items-center gap-2">
  <CheckBadgeIcon className="h-5 w-5 text-[#013243]" />
  <strong>Status:</strong>
  {isEditing ? (
    <select
      value={editedStatus}
      onChange={(e) => setEditedStatus(e.target.value)}
      className={`ml-2 px-3 py-1 rounded-2xl bg-gray-100 border text-sm font-medium transition-all duration-300
        ${
          editedStatus === 'Pending'
            ? 'text-yellow-700 bg-yellow-100'
            : editedStatus === 'In Progress'
            ? 'text-blue-700 bg-blue-100'
            : editedStatus === 'Completed'
            ? 'text-green-700 bg-green-100'
            : editedStatus === 'Cancelled'
            ? 'text-red-700 bg-red-100'
            : ''
        }
      `}
    >
      <option value="Pending">Pending</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  ) : (
    <span
      className={`ml-2 px-2 py-1 rounded text-sm font-semibold ${
        statusColors[selectedService.serviceStatus] || 'bg-gray-100 text-gray-800'
      }`}
    >
      {selectedService.serviceStatus}
    </span>
  )}
</div>


                {/* Editable Price */}
                <div className="flex items-center gap-2">
                  <CurrencyRupeeIcon className="h-5 w-5 text-[#013243]" />
                  <strong>Estimation:</strong>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedEstimation}
                      onChange={(e) => setEditedEstimation(e.target.value)}
                      className="ml-2 border px-2 py-1 rounded w-32"
                    />
                  ) : (
                    <span className="ml-2">₹{selectedService.servicePriceEstimation}</span>
                  )}
                </div>

                <p className="flex items-center gap-2">
                  <StarIcon className="h-5 w-5 text-yellow-500" />
                  <strong>Rating:</strong> {selectedService.serviceRating} / 5
                </p>

                <div className="md:col-span-2">
                  <p className="mb-2">
                    <strong>Description:</strong><br />
                    {selectedService.serviceDescription}
                  </p>
                  <p>
                    <strong>Review:</strong><br />
                    {selectedService.serviceReview}
                  </p>
                </div>
              </div>

              <div className="mt-6 text-right space-x-3">
                {!isEditing ? (
                  <button
                    onClick={handleEditClick}
                    className="bg-[#013243] text-white px-4 py-2 rounded hover:bg-cyan-900"
                  >
                    Edit
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-teal-900 text-white px-4 py-2 rounded hover:bg-teal-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </>
                )}
                <button
                  onClick={() => setSelectedService(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
