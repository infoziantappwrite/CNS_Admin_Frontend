import React from 'react';
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
  CheckBadgeIcon
} from '@heroicons/react/24/outline';

export default function Dashboard({ services, onView, onDelete, selectedService, setSelectedService }) {
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
                <p className="flex items-center gap-2">
                  <CheckBadgeIcon className="h-5 w-5 text-[#013243]" />
                  <strong>Status:</strong> {selectedService.serviceStatus}
                </p>
                <p className="flex items-center gap-2">
                  <CalendarDaysIcon className="h-5 w-5 text-[#013243]" />
                  <strong>Date:</strong> {new Date(selectedService.serviceDate).toLocaleString()}
                </p>
                <p className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-[#013243]" />
                  <strong>Location:</strong> {selectedService.serviceLocation}
                </p>
                <p className="flex items-center gap-2">
                  <CurrencyRupeeIcon className="h-5 w-5 text-[#013243]" />
                  <strong>Estimation:</strong> ₹{selectedService.servicePriceEstimation}
                </p>
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

              <div className="mt-6 text-right">
                <button
                  onClick={() => setSelectedService(null)}
                  className="bg-[#013243] text-white px-5 py-2 rounded-md hover:bg-teal-900 transition"
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
