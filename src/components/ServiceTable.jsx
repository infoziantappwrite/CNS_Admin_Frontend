import React from 'react';

const ServiceTable = ({ services, onView, onDelete }) => {
  return (
    <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-3 px-4 border-b border-gray-300 text-left">Full Name</th>
          <th className="py-3 px-4 border-b border-gray-300 text-left">Phone</th>
          <th className="py-3 px-4 border-b border-gray-300 text-left">Service Type</th>
          <th className="py-3 px-4 border-b border-gray-300 text-left">Status</th>
          <th className="py-3 px-4 border-b border-gray-300 text-left">Service Date</th>
          <th className="py-3 px-4 border-b border-gray-300 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {services.map(service => (
          <tr key={service._id} className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b border-gray-300">{service.fullName}</td>
            <td className="py-2 px-4 border-b border-gray-300">{service.phone}</td>
            <td className="py-2 px-4 border-b border-gray-300">{service.serviceType}</td>
            <td className="py-2 px-4 border-b border-gray-300">{service.serviceStatus}</td>
            <td className="py-2 px-4 border-b border-gray-300">
              {new Date(service.serviceDate).toLocaleDateString()}
            </td>
            <td className="py-2 px-4 border-b border-gray-300 space-x-2">
              <button
                onClick={() => onView(service)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
              >
                View
              </button>
              <button
                onClick={() => onDelete(service._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ServiceTable;
