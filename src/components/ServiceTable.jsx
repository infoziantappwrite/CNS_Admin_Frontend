import React from 'react';

const ServiceTable = ({ services, onView, onDelete }) => {
  return (
    <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-3 px-4 border-b text-left">Full Name</th>
          <th className="py-3 px-4 border-b text-left">Phone</th>
          <th className="py-3 px-4 border-b text-left">Service Type</th>
          <th className="py-3 px-4 border-b text-left">Status</th>
          <th className="py-3 px-4 border-b text-left">Service Date</th>
          <th className="py-3 px-4 border-b text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {services.map(service => (
          <tr key={service._id} className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">{service.fullName}</td>
            <td className="py-2 px-4 border-b">{service.phone}</td>
            <td className="py-2 px-4 border-b">{service.serviceType}</td>
            <td className="py-2 px-4 border-b">{service.serviceStatus}</td>
            <td className="py-2 px-4 border-b">{new Date(service.serviceDate).toLocaleDateString()}</td>
            <td className="py-2 px-4 border-b space-x-2">
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
